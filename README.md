# PrepNexus 🧠

> **Ace Any Exam. Master The MCQ.**

PrepNexus is an AI-powered MCQ (Multiple Choice Question) preparation platform designed to help students ace exams and certifications. It provides a distraction-free, psychologically-designed testing environment focused on knowledge retention and exam readiness — powered by AI-generated quizzes, real-time performance analytics, and adaptive review tools.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Features

### 🤖 AI-Powered Quiz Generation
- Generate multiple-choice questions on any exam topic, subtopic, and difficulty level
- Built-in AI prompt generator that crafts structured prompts for ChatGPT or Claude
- Paste the AI-generated JSON response directly into the platform to start your quiz instantly

### ⏱️ Full-Featured Quiz Engine
- Timed quizzes with a live countdown ring timer
- Keyboard shortcuts for fast navigation:
  - `← →` — Navigate between questions
  - `1–4` — Select an answer option
  - `M` — Mark question for review
  - `C` — Clear current response
  - `Enter` — Proceed to next question / Submit
- Mark-for-review system to flag uncertain answers
- Auto-submit when the timer reaches zero

### 📊 Detailed Performance Analytics
- Post-quiz accuracy percentage with animated ring chart (powered by Recharts)
- Score, time taken, and question-count summary cards
- Full question-by-question review with:
  - Correct answers highlighted in green
  - Incorrect user selections highlighted in red
  - Visual ✓ / ✗ indicators

### 🗂️ Quiz History
- Previous quiz attempts stored locally for review at any time

### 💳 Subscription & Coin System
- Premium plan upgrade flow
- In-app coin/credit system for premium features
- Integrated with Razorpay payment gateway

### 🎨 Psychological Design System
- Color-coded UI based on cognitive color psychology:
  - **Indigo/Violet** — Primary focus
  - **Sky Blue** — Calm & confidence
  - **Emerald** — Success & progress
  - **Amber** — Caution / review
  - **Red** — Danger / time pressure
- Glass-morphism cards, ambient glow effects, and smooth transitions
- Fully responsive — mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + PostCSS |
| **State Management** | [Zustand 5](https://zustand-demo.pmnd.rs/) |
| **Charts** | [Recharts 3](https://recharts.org/) |
| **Database / Auth** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **Payments** | [Razorpay](https://razorpay.com/) |
| **Package Manager** | [Bun](https://bun.sh/) |
| **Linting** | ESLint 9 with Next.js config |
| **Fonts** | Syne (headings), DM Sans (body), JetBrains Mono (code) |

---

## Project Structure

```
prepnexus/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Landing page (hero, about, quiz form, contact)
│   ├── quiz/page.tsx          # Quiz engine
│   ├── analysis/page.tsx      # Results & analysis
│   ├── layout.tsx             # Root layout with context providers
│   └── globals.css            # Global design system (CSS variables, themes)
│
├── components/                 # Reusable React components
│   ├── LandingHeader.tsx      # Sticky navigation header
│   ├── QuizForm.tsx           # Quiz configuration & AI prompt generator
│   └── quiz/
│       ├── TimerBar.tsx       # Countdown timer with SVG ring
│       └── QuestionPalette.tsx # Question status sidebar
│
├── context/                    # React Context providers
│   ├── AuthContext.tsx        # User authentication state
│   └── SubscriptionContext.tsx # Premium & coin system
│
├── store/                      # Zustand global store
│   └── useQuizStore.ts        # Quiz config, answers, and results
│
├── types/                      # TypeScript type definitions
│   └── index.ts               # Question, QuizConfig, QuizResults, etc.
│
├── utils/
│   └── supabase/
│       ├── client.ts          # Browser-side Supabase client
│       ├── server.ts          # Server-side Supabase client
│       └── middleware.ts      # Auth middleware helpers
│
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero section, about, quiz creation form, contact |
| `/quiz` | Full-screen quiz engine with timer, palette, and keyboard navigation |
| `/analysis` | Post-quiz results, accuracy breakdown, and question-by-question review |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher  
- [Bun](https://bun.sh/) (recommended) or npm/yarn/pnpm
- A [Supabase](https://supabase.com/) project (for auth and database features)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rudraksh121a/prepnexus.git
   cd prepnexus
   ```

2. **Install dependencies:**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Start the development server:**
   ```bash
   bun dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Razorpay (for payment features)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

> **Note:** Never commit your `.env.local` file. It is already listed in `.gitignore`.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` / `npm run dev` | Start the development server at [localhost:3000](http://localhost:3000) |
| `bun run build` / `npm run build` | Create an optimized production build |
| `bun start` / `npm start` | Run the production server |
| `bun run lint` / `npm run lint` | Run ESLint to check code quality |

---

## Deployment

The recommended platform for deploying PrepNexus is **[Vercel](https://vercel.com/)** — the creators of Next.js.

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Add your environment variables in the Vercel project settings.
4. Click **Deploy** — Vercel will automatically build and deploy your app.

For other platforms (AWS, Railway, Render, etc.), run `npm run build` and serve the `.next/` output using `npm start`.

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure your code passes linting (`npm run lint`) before submitting.

---

<p align="center">Built with ❤️ to help students <strong>PrepNexus</strong> their way to success.</p>
