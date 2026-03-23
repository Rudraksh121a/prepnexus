"use client";

import React, { createContext, useContext, useState } from "react";

interface SubscriptionContextType {
  isPremium: boolean;
  coins: number;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => void;
  upgradeToPremium: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined,
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState(() => {
    try {
      const storedData = localStorage.getItem("subscription_data");
      if (storedData) {
        const data = JSON.parse(storedData);
        return {
          isPremium: data.isPremium || false,
          coins: data.coins || 100,
        };
      }
    } catch (error) {
      console.error("Failed to load subscription data:", error);
    }
    return { isPremium: false, coins: 100 };
  });
  const { isPremium, coins } = state;

  const addCoins = (amount: number) => {
    setState((prev) => {
      const updated = { ...prev, coins: prev.coins + amount };
      localStorage.setItem("subscription_data", JSON.stringify(updated));
      return updated;
    });
  };

  const deductCoins = (amount: number) => {
    setState((prev) => {
      const updated = { ...prev, coins: Math.max(0, prev.coins - amount) };
      localStorage.setItem("subscription_data", JSON.stringify(updated));
      return updated;
    });
  };

  const upgradeToPremium = async () => {
    setState((prev) => {
      const updated = { ...prev, isPremium: true };
      localStorage.setItem("subscription_data", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SubscriptionContext.Provider
      value={{ isPremium, coins, addCoins, deductCoins, upgradeToPremium }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider",
    );
  }
  return context;
}
