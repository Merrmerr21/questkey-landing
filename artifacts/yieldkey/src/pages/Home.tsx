import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRightLeft, 
  BarChart3, 
  ShieldAlert, 
  CheckCircle, 
  Building2, 
  History,
} from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { MockDashboard } from "@/components/MockDashboard";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const agents = [
    {
      name: "Miles", role: "Underwriting", initials: "M",
      color: "from-blue-500 to-indigo-600",
      border: "border-blue-200",
      bg: "bg-blue-50/60",
      output: `Cash-on-cash: 14.2% (STR) vs 6.8% (MTR) vs 2.1% (LTR)\nSTR breakeven occupancy: 52%\nIRR at 5-yr exit: 18.4%`
    },
    {
      name: "Avery", role: "Acquisitions", initials: "A",
      color: "from-purple-500 to-fuchsia-600",
      border: "border-purple-200",
      bg: "bg-purple-50/60",
      output: `Austin 78745 is a strong Airbnb submarket.\nMedian price up 3.2% YoY, rental demand\noutpacing supply. Acquisition score: 8.1/10.`
    },
    {
      name: "Rhea", role: "Risk", initials: "R",
      color: "from-rose-500 to-orange-500",
      border: "border-rose-200",
      bg: "bg-rose-50/60",
      output: `⚠ Austin requires active STR permit.\nCurrent owner has none — factor 45–60 day\napproval. HOA may restrict stays < 30 days.`
    },
    {
      name: "Sloane", role: "Setup", initials: "S",
      color: "from-amber-400 to-yellow-500",
      border: "border-amber-200",
      bg: "bg-amber-50/60",
      output: `Furnishing budget: $12,400 for a competitive\n3BR listing. Recommend keyless entry +\nsmart thermostat for remote management.`
    },
    {
      name: "Kai", role: "Revenue", initials: "K",
      color: "from-[#FF5A5F] to-rose-400",
      border: "border-rose-200",
      bg: "bg-rose-50/60",
      output: `Projected ADR: $245/night. Peak season\n(Mar–May, Sep–Nov) occupancy 78%.\nDynamic pricing could boost revenue 12–18%.`
    },
    {
      name: "Theo", role: "Portfolio", initials: "T",
      color: "from-cyan-500 to-blue-500",
      border: "border-cyan-200",
      bg: "bg-cyan-50/60",
      output: `Adding this STR brings your STR exposure\nto 60%. Consider your next acquisition as\nan MTR to balance risk across the portfolio.`
    }
  ];

  const features = [
    {
      icon: <ArrowRightLeft className="w-5 h-5" />,
      title: "Compare STR / MTR / LTR side by side",
      desc: "Stop guessing. See exactly how a property performs across every rental strategy on one screen.",
      large: true,
      pattern: "bars"
    },
    {
      icon: <ShieldAlert className="w-5 h-5" />,
      title: "Surface market & regulation risk",
      desc: "We scan local ordinances so you don't buy an Airbnb in a city that just banned them.",
      tall: true,
      pattern: "map"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Deep cash flow & return analysis",
      desc: "Drill into the numbers. Tweak assumptions and watch returns update in real-time.",
      pattern: "grid"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Clear buy / pass recommendation",
      desc: "Unbiased, data-backed strategy recommendation for every property you analyze.",
      pattern: "check"
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: "Fallback plan if Airbnb underperforms",
      desc: "Know your downside protection before you close. Never rely on a single strategy.",
      pattern: "fallback"
    },
    {
      icon: <History className="w-5 h-5" />,
      title: "Save & review deals over time",
      desc: "Build a database of underwritten deals to spot trends and sharpen your criteria.",
      pattern: "history"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Enter a property",
      desc: "Just paste an address or Zillow link. We pull comps, market data, and regulatory status automatically."
    },
    {
      step: "02",
      title: "Compare strategies",
      desc: "See projected cash flow, cap rate, occupancy, and risk for Airbnb, mid-term, and long-term — all on one screen."
    },
    {
      step: "03",
      title: "Invest with clarity",
      desc: "Get a clear buy/pass signal with your best-fit strategy and a fallback plan if conditions change."
    }
  ];

  const audience = [
    "First-time rental investors",
    "Airbnb hosts scaling up",
    "Long-term landlords",
    "Out-of-state buyers",
    "House hackers",
    "Small portfolio investors",
    "Real estate agents",
    "Buy-and-hold operators"
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      
      {/* ── NAV ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? "bg-white/85 backdrop-blur-md border-border py-4 shadow-sm" : "bg-transparent border-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-foreground"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
              <KeyIcon className="w-4 h-4" />
            </div>
            YieldKey
          </button>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollTo("how-it-works")} className="hover:text-foreground transition-colors">How it works</button>
            <button onClick={() => scrollTo("features")} className="hover:text-foreground transition-colors">Features</button>
            <button onClick={() => scrollTo("team")} className="hover:text-foreground transition-colors">AI Team</button>
          </div>

          <button
            onClick={() => scrollTo("cta")}
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            Get Early Access
          </button>
        </div>
      </nav>

      {/* ── 1. HERO ── */}
      <section className="relative pt-24 pb-14 lg:pt-32 lg:pb-20 px-5 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,90,95,0.07),transparent)]" />
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>

            {/* Beta pill */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-semibold text-primary mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary animate-glow-pulse"></span>
              </span>
              Private Beta Now Open
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-4 text-foreground">
              Underwrite <span className="text-gradient-primary">smarter</span> rental deals
            </motion.h1>

            {/* Subheadline — punchy & specific */}
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto">
              Enter any address. Compare Airbnb, mid-term, and long-term cash flow — with risk flags, regulatory checks, and a clear recommendation. Powered by 6 AI agents.
            </motion.p>

            {/* Signup form card */}
            <motion.div variants={fadeUp} className="bg-white border border-border shadow-md rounded-2xl p-5 sm:p-6 max-w-lg mx-auto text-left">
              <WaitlistForm />
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── 2. PROPERTY ANALYSIS DEMO ── */}
      <section className="py-16 lg:py-24 px-5 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-[11px] font-bold text-primary uppercase tracking-[0.15em] mb-2">Live deal analysis</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">See it in action</h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto">A real analysis on a real Austin, TX property — showing what YieldKey surfaces before you make an offer.</p>
          </motion.div>
          <MockDashboard />
        </div>
      </section>

      {/* ── 3. AI AGENT TEAM — DEAL ROOM ── */}
      <section id="team" className="py-20 lg:py-28 bg-white border-y border-border px-5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Six AI analysts. One complete picture.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Every deal gets torn apart from six angles before you see a single number.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`group rounded-2xl border ${agent.border} ${agent.bg} p-5 hover:shadow-md transition-all duration-300 flex flex-col gap-4`}
              >
                {/* Agent header */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-xl text-white bg-gradient-to-br ${agent.color} shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {agent.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground leading-tight">{agent.name}</h3>
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-white/80 border border-white text-muted-foreground">
                      {agent.role}
                    </span>
                  </div>
                </div>

                {/* Sample output */}
                <div className="bg-white/70 border border-white/80 rounded-xl p-3.5 flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Agent Output</p>
                  <pre className="text-xs text-foreground/80 font-mono leading-relaxed whitespace-pre-wrap break-words">
                    {agent.output}
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURES — BENTO GRID ── */}
      <section id="features" className="py-20 lg:py-28 px-5 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">What YieldKey does</h2>
            <p className="text-muted-foreground text-base max-w-xl">Everything you need to underwrite with confidence, in one seamless workflow.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-[minmax(160px,auto)]">
            {/* Feature 1 — large (spans 4 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.5 }}
              className="lg:col-span-4 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 opacity-[0.04] pointer-events-none">
                <svg width="220" height="120" viewBox="0 0 220 120"><rect x="10" y="60" width="24" height="60" fill="currentColor"/><rect x="44" y="30" width="24" height="90" fill="currentColor"/><rect x="78" y="10" width="24" height="110" fill="currentColor"/><rect x="112" y="40" width="24" height="80" fill="currentColor"/><rect x="146" y="20" width="24" height="100" fill="currentColor"/><rect x="180" y="50" width="24" height="70" fill="currentColor"/></svg>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Compare STR / MTR / LTR side by side</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">Stop guessing. See exactly how a property performs across every rental strategy on one screen — cash flow, cap rate, occupancy, and risk, all at once.</p>
            </motion.div>

            {/* Feature 2 — tall (spans 2 cols, 2 rows) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="lg:col-span-2 lg:row-span-2 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="absolute right-4 bottom-4 opacity-[0.04] pointer-events-none">
                <svg width="100" height="140" viewBox="0 0 100 140"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8"/><line x1="50" y1="90" x2="50" y2="140" stroke="currentColor" strokeWidth="8"/><circle cx="50" cy="50" r="14" fill="currentColor"/></svg>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-500 mb-4 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Surface market & regulation risk</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">We scan local ordinances so you don't buy an Airbnb in a city that just banned short-term rentals.</p>
              <div className="mt-6 space-y-2">
                {["STR permit required", "HOA rental restrictions", "90-day rule active", "Market saturation flag"].map((risk, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs bg-rose-50 border border-rose-100 rounded-lg px-3 py-2 text-rose-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    {risk}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 22px,currentColor 22px,currentColor 23px)' }} />
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Deep cash flow & return analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Drill into the numbers. Tweak assumptions and watch returns update in real-time.</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center text-green-600 mb-4 group-hover:scale-105 transition-transform">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Clear buy / pass recommendation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Unbiased, data-backed strategy recommendation for every property you analyze.</p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-3 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 opacity-[0.04] pointer-events-none">
                <svg width="140" height="80" viewBox="0 0 140 80"><path d="M10 70 L50 20 L90 50 L130 10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/></svg>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Fallback plan if Airbnb underperforms</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Never rely on a single strategy. Know your downside protection before you close.</p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24, duration: 0.5 }}
              className="lg:col-span-3 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <History className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Save & review deals over time</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Build a personal database of underwritten deals to spot market trends and refine your criteria.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-white border-y border-border px-5 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Three steps to a better deal</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From address to decision in minutes, not weeks.</p>
          </motion.div>

          <div className="relative">
            {/* Connecting line — desktop */}
            <div className="hidden lg:flex absolute top-8 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] items-center pointer-events-none">
              <div className="flex-1 h-px bg-border relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r-2 border-t-2 border-border rotate-45" />
              </div>
              <div className="flex-1 h-px bg-border ml-[33%] relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r-2 border-t-2 border-border rotate-45" />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10 lg:gap-6 relative z-10">
              {steps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex flex-col items-center text-center lg:items-center lg:text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-5 relative z-10">
                    <span className="font-display font-extrabold text-xl text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. WHO USES YIELDKEY ── */}
      <section className="py-20 lg:py-24 px-5 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">Who uses YieldKey?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm leading-relaxed">
              Whether you're buying your first rental or scaling to ten, YieldKey meets you where you are.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {audience.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="px-5 py-2.5 rounded-full border border-border bg-white text-sm font-medium text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 cursor-default shadow-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. BOTTOM CTA ── */}
      <section id="cta" className="py-24 lg:py-32 px-5 relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(255,255,255,0.08),transparent)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold text-white mb-5">
              Be first to try YieldKey
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-white/85 mb-10 max-w-xl mx-auto">
              Join 800+ investors already on the waitlist. Beta spots are limited.
            </motion.p>
            <motion.div variants={fadeUp} className="bg-white p-6 sm:p-8 rounded-3xl text-left shadow-2xl max-w-lg mx-auto text-foreground">
              <WaitlistForm variant="minimal" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. FOOTER ── */}
      <footer className="py-10 border-t border-border bg-white px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-foreground">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white">
              <KeyIcon className="w-3 h-3" />
            </div>
            YieldKey
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            YieldKey © 2026 · Built by Castle Capital
          </p>
          
          <div className="flex gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary cursor-pointer transition-colors shadow-sm"
              aria-label="X / Twitter"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary cursor-pointer transition-colors shadow-sm"
              aria-label="LinkedIn"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      {...props}
    >
      <circle cx="7.5" cy="15.5" r="5.5"/>
      <path d="m21 2-9.6 9.6"/>
      <path d="m15.5 7.5 3 3L22 7l-3-3"/>
    </svg>
  );
}
