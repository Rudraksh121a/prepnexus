import Link from "next/link";
import LandingHeader from "@/components/LandingHeader";
import QuizForm from "@/components/QuizForm";

export default function Home() {
  return (
    <main className="min-h-screen gradient-bg flex flex-col relative selection-brand text-primary">
      {/* Aesthetic background ambient flares */}
      <div
        className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--primary-600)] rounded-full blur-[120px] opacity-20 pointer-events-none animate-pulse z-0"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[var(--calm-600)] rounded-full blur-[100px] opacity-20 pointer-events-none animate-pulse z-0"
        style={{ animationDuration: "6s", animationDelay: "2s" }}
      ></div>

      {/* Navigation */}
      <LandingHeader />

      {/* Home Section */}
      <section
        id="home"
        className="pt-40 pb-32 flex flex-col items-center justify-center z-10 max-w-6xl mx-auto w-full px-6 text-center min-h-screen"
      >
        <div className="inline-block px-5 py-2 rounded-full border border-primary/40 bg-gradient-to-r from-[var(--primary-soft)] to-[var(--primary-soft)]/50 text-primary type-label text-[11px] md:text-xs tracking-widest mb-10 shadow-[0_0_20px_rgba(59,130,246,0.15)] animate-fade-in-up backdrop-blur-sm">
          ✨ ULTIMATE MCQ PREP PLATFORM
        </div>

        <h1
          className="type-hero text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.15] mb-8 text-center animate-fade-in-up font-black"
          style={{ animationDelay: "100ms" }}
        >
          Ace Any Exam.
          <br />
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-400)] via-[var(--calm-400)] to-[var(--primary-400)] bg-[length:200%_auto] animate-gradient mt-3">
            Master The MCQ.
          </span>
        </h1>

        <p
          className="type-question text-center text-secondary text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-14 leading-relaxed animate-fade-in-up font-medium"
          style={{ animationDelay: "200ms" }}
        >
          Prepare for any certification or test with AI-generated multiple
          choice questions. Receive instant feedback, detailed performance
          graphs, and personalized study analytics to ensure you pass with
          confidence.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto animate-fade-in-up justify-center"
          style={{ animationDelay: "300ms" }}
        >
          <Link
            href="#create-quiz"
            className="type-btn px-10 py-4 rounded-xl bg-gradient-to-r from-[var(--primary-600)] to-[var(--calm-600)] shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.4)] hover:brightness-110 active:scale-[0.98] transition-all text-base font-bold flex items-center justify-center gap-2 group"
          >
            Create Your Quiz
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-28 z-10 relative w-full px-6 bg-gradient-to-b from-background to-background/50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-5 py-2 rounded-full border border-subtle bg-gradient-to-r from-surface to-surface/50 text-secondary type-label text-[11px] md:text-xs tracking-widest mb-8 backdrop-blur-sm">
              🎯 ABOUT PREPNEXUS
            </div>
            <h2 className="type-hero text-5xl md:text-6xl mb-8 font-black leading-[1.2]">
              Built for the Modern Learner
            </h2>
            <p className="type-question text-center text-secondary max-w-3xl mx-auto text-lg leading-relaxed font-medium">
              PrepNexus bridges the gap between raw study material and dynamic
              testing. By utilizing cutting-edge AI and an elite psychological
              design system, we provide a testing environment that maximizes
              retention and exam readiness.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-elevated to-elevated/50 border border-subtle hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(99,102,241,0.1)] transition-all duration-300 flex flex-col items-center text-center backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary-soft)] to-[var(--primary-soft)]/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="type-hero text-2xl mb-4 font-bold">
                AI Quiz Generation
              </h3>
              <p className="type-option text-base text-secondary leading-relaxed font-medium">
                Instantly create rigorous, varied multiple-choice questions
                tailored to any topic or focus area you need.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-elevated to-elevated/50 border border-subtle hover:border-[var(--calm)]/50 hover:shadow-[0_20px_40px_rgba(167,139,250,0.1)] transition-all duration-300 flex flex-col items-center text-center backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--calm-soft)] to-[var(--calm-soft)]/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="type-hero text-2xl mb-4 font-bold">
                Deep Analytics
              </h3>
              <p className="type-option text-base text-secondary leading-relaxed font-medium">
                Track your accuracy, time-spent, and topic mastery through
                beautiful, easy-to-read metric dashboards.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-elevated to-elevated/50 border border-subtle hover:border-success/50 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col items-center text-center backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--success-soft)] to-[var(--success-soft)]/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="type-hero text-2xl mb-4 font-bold">
                Distraction-Free
              </h3>
              <p className="type-option text-base text-secondary leading-relaxed font-medium">
                A custom-built design system ensuring zero distractions, keeping
                you in the coveted &ldquo;flow state&rdquo; during test prep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Creation Section */}
      <section
        id="create-quiz"
        className="py-28 z-10 relative w-full bg-gradient-to-b from-surface via-background to-background px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <div className="inline-block px-5 py-2 rounded-full border border-subtle bg-gradient-to-r from-elevated to-elevated/50 text-secondary type-label text-[11px] md:text-xs tracking-widest mb-8 backdrop-blur-sm">
              🚀 START YOUR PREP JOURNEY
            </div>
            <h2 className="type-hero text-5xl md:text-6xl mb-8 font-black leading-[1.2]">
              Create Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-400)] via-[var(--calm-400)] to-[var(--primary-400)]">
                Perfect Quiz
              </span>
            </h2>
            <p className="type-question text-center text-secondary max-w-3xl mx-auto text-lg leading-relaxed font-medium">
              Configure your quiz settings and let AI generate targeted
              questions based on exactly what you need to study.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <QuizForm />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-28 z-10 relative w-full bg-gradient-to-t from-elevated/50 to-background/50 border-t border-subtle px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-5 py-2 rounded-full border border-subtle bg-gradient-to-r from-surface to-surface/50 text-secondary type-label text-[11px] md:text-xs tracking-widest mb-8 backdrop-blur-sm">
            💬 GET IN TOUCH
          </div>
          <h2 className="type-hero text-5xl md:text-6xl mb-8 font-black leading-[1.2]">
            Have Questions?
          </h2>
          <p className="type-question text-secondary mb-12 max-w-2xl mx-auto text-lg font-medium">
            Whether you are encountering an issue, want to request a feature, or
            just want to say hi, our team is always ready to assist you.
          </p>

          <a
            href="mailto:contact@prepnexus.ai"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--primary-soft)] to-[var(--primary-soft)]/50 border-2 border-primary/40 hover:border-primary/80 hover:shadow-[0_15px_35px_rgba(99,102,241,0.2)] transition-all group font-semibold"
          >
            <span className="text-2xl group-hover:scale-125 transition-transform">
              ✉️
            </span>
            <span className="type-hero tracking-wide text-lg md:text-xl group-hover:text-[var(--primary-400)] transition-colors">
              contact@prepnexus.ai
            </span>
          </a>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="w-full py-12 border-t border-subtle/50 bg-background/80 backdrop-blur-sm z-10 relative text-center">
        <p className="type-option text-sm text-muted font-medium">
          &copy; {new Date().getFullYear()} PrepNexus. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
