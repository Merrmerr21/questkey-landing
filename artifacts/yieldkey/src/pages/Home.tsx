import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRightLeft,
  BarChart3,
  ShieldAlert,
  CheckCircle,
  Building2,
  History,
  ChevronDown,
  ChevronRight,
  Lock,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { MockDashboard } from "@/components/MockDashboard";

// ── Q-with-key-tail logo ──
// Horizontal tail (not diagonal) avoids confusion with a magnifying glass icon.
// Downward teeth clearly read as a key bit at small sizes.
function QuestKeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 26 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Q ring — offset slightly left to leave room for tail going right */}
      <circle cx="10" cy="12" r="7.5" stroke="currentColor" strokeWidth="2.2" />
      {/* Key stem — horizontal tail going rightward from 3 o'clock */}
      <line x1="17.5" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="2.2" />
      {/* Key bit — two downward teeth at end of stem */}
      <line x1="24" y1="12" x2="24" y2="16" stroke="currentColor" strokeWidth="1.8" />
      <line x1="21.5" y1="12" x2="21.5" y2="15" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

// ── Sticky mobile CTA ──
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 620);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border shadow-2xl px-5 py-3 flex items-center justify-between gap-3"
        >
          <p className="text-xs text-muted-foreground leading-snug">
            <span className="font-semibold text-foreground block">Free beta access</span>
            847 investors already in
          </p>
          <button
            onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="flex-shrink-0 bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
          >
            Get Early Access →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } }
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [expandedAgent, setExpandedAgent] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [addressSubmitted, setAddressSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddressSearch = () => {
    if (!addressInput.trim()) return;
    setAddressSubmitted(true);
    setTimeout(() => scrollTo("demo"), 300);
  };

  const agents = [
    {
      name: "Uri", role: "Underwriting", initials: "U",
      color: "from-blue-500 to-indigo-600", border: "border-blue-200", bg: "bg-blue-50/60",
      output: `Cash-on-cash: 14.2% (STR) vs 6.8% (MTR) vs 2.1% (LTR)\nSTR breakeven occupancy: 52%\nIRR at 5-yr exit: 18.4%`
    },
    {
      name: "Avery", role: "Acquisitions", initials: "A",
      color: "from-purple-500 to-fuchsia-600", border: "border-purple-200", bg: "bg-purple-50/60",
      output: `Austin 78745 is a strong Airbnb submarket.\nMedian price up 3.2% YoY, rental demand\noutpacing supply. Acquisition score: 8.1/10.`
    },
    {
      name: "Rhea", role: "Risk", initials: "R",
      color: "from-rose-500 to-orange-500", border: "border-rose-200", bg: "bg-rose-50/60",
      output: `⚠ Austin requires active STR permit.\nCurrent owner has none — factor 45–60 day\napproval. HOA may restrict stays < 30 days.`
    },
    {
      name: "Sloane", role: "Setup", initials: "S",
      color: "from-amber-400 to-yellow-500", border: "border-amber-200", bg: "bg-amber-50/60",
      output: `Furnishing budget: $12,400 for a competitive\n3BR listing. Recommend keyless entry +\nsmart thermostat for remote management.`
    },
    {
      name: "Rex", role: "Revenue", initials: "R",
      color: "from-[#FF5A5F] to-rose-400", border: "border-rose-200", bg: "bg-rose-50/60",
      output: `Projected ADR: $245/night. Peak season\n(Mar–May, Sep–Nov) occupancy 78%.\nDynamic pricing could boost revenue 12–18%.`
    },
    {
      name: "Pax", role: "Portfolio", initials: "P",
      color: "from-cyan-500 to-blue-500", border: "border-cyan-200", bg: "bg-cyan-50/60",
      output: `Adding this STR brings your STR exposure\nto 60%. Consider your next acquisition as\nan MTR to balance risk across the portfolio.`
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
    { type: "First-time rental investors", pain: "Stop relying on spreadsheets and gut feel for your first deal." },
    { type: "Airbnb hosts scaling up", pain: "Know if your next market has STR-friendly regulations before you close." },
    { type: "Long-term landlords", pain: "See if switching a property to mid-term or Airbnb would double your cash flow." },
    { type: "Out-of-state buyers", pain: "Underwrite markets you've never visited with local-level data." },
    { type: "House hackers", pain: "Model the rental income on your owner-occupied property before you buy." },
    { type: "Small portfolio investors", pain: "Think in portfolios, not one-off deals. Balance risk across strategies." }
  ];

  const navLinks = [
    { label: "How it works", id: "how-it-works" },
    { label: "AI Agents", id: "team" },
    { label: "Features", id: "features" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <StickyMobileCTA />

      {/* ── NAV ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? "bg-white/90 backdrop-blur-md border-border shadow-sm" : "bg-transparent border-transparent"}`}>
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-foreground"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
              <QuestKeyIcon className="w-4 h-4" />
            </div>
            QuestKey
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="hover:text-foreground transition-colors">
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("cta")}
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              Get Early Access
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-white border-t border-border shadow-lg"
            >
              <div className="px-5 py-3 flex flex-col gap-1">
                {navLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="w-full text-left py-3 text-sm font-medium text-foreground border-b border-border last:border-0 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo("hero-form")}
                  className="mt-2 w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Get Early Access →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── 1. HERO ── */}
      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 px-5 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,90,95,0.07),transparent)]" />
        <div className="max-w-xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>

            {/* Beta pill */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-semibold text-primary mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary animate-dot-pulse" />
              </span>
              Private Beta Now Open
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-4 text-foreground">
              Underwrite <span className="text-gradient-primary">smarter</span> rental deals
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted-foreground mb-7 leading-relaxed">
              Paste any address. In 90 seconds, see projected cash flow for Airbnb, mid-term, and long-term rentals — plus risk flags, regulation checks, and a clear buy-or-pass signal. Powered by 6 AI agents working simultaneously.
            </motion.p>

            {/* Property / market address input */}
            <motion.div variants={fadeUp} className="mb-4">
              <div className="flex items-center bg-white rounded-2xl border border-border shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all">
                <div className="pl-4 pr-2 text-muted-foreground flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => { setAddressInput(e.target.value); setAddressSubmitted(false); }}
                  onKeyDown={(e) => e.key === "Enter" && handleAddressSearch()}
                  placeholder="Enter an address or market (e.g. Austin TX, 1248 Oakwood Ave)"
                  className="flex-1 py-3.5 pr-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none bg-transparent min-w-0"
                />
                <button
                  onClick={handleAddressSearch}
                  className="m-1.5 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors flex-shrink-0 whitespace-nowrap"
                >
                  Preview →
                </button>
              </div>
              <AnimatePresence>
                {addressSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-primary font-medium mt-2"
                  >
                    Live analysis coming soon — see a sample preview below ↓
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or join the waitlist for early access</span>
              <div className="flex-1 h-px bg-border" />
            </motion.div>

            {/* Waitlist form — email + dropdown, no first name */}
            <motion.div variants={fadeUp} id="hero-form" className="bg-white border border-border shadow-md rounded-2xl p-5 sm:p-6 text-left">
              <WaitlistForm hideFirstName />
            </motion.div>

            {/* Trust line */}
            <motion.p variants={fadeUp} className="text-xs text-muted-foreground mt-4">
              Built by real estate investors, for real estate investors.
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* ── 2. PROPERTY ANALYSIS DEMO ── */}
      <section id="demo" className="py-14 lg:py-20 px-5 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-10"
          >
            <p className="text-[11px] font-bold text-primary uppercase tracking-[0.15em] mb-2">Live deal analysis</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">See it in action</h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto">
              A real analysis on a real Austin, TX property — showing what QuestKey surfaces before you make an offer.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">Analyzing data from 200+ markets across the US</p>
          </motion.div>
          <MockDashboard />
        </div>
      </section>

      {/* ── 3. AI AGENT TEAM ── */}
      <section id="team" className="py-18 lg:py-24 bg-white border-y border-border px-5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Six AI analysts. One complete picture.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Every deal gets torn apart from six angles before you see a single number.
            </p>
          </motion.div>

          {/* Mobile: accordion */}
          <div className="block md:hidden flex flex-col gap-3 mb-4">
            {agents.map((agent, i) => (
              <div key={agent.name} className={`rounded-2xl border ${agent.border} ${agent.bg} overflow-hidden`}>
                <button
                  className="w-full flex items-center gap-3 p-4 text-left"
                  onClick={() => setExpandedAgent(expandedAgent === i ? -1 : i)}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-lg text-white bg-gradient-to-br ${agent.color} flex-shrink-0`}>
                    {agent.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base text-foreground leading-tight">{agent.name}</h3>
                    <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{agent.role}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${expandedAgent === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {expandedAgent === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <div className="bg-white/80 border-l-4 border-border rounded-r-xl pl-4 pr-3 py-3">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Agent Output</p>
                          <p className="text-sm text-foreground/85 leading-[1.6] whitespace-pre-line">{agent.output}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div className="flex justify-center gap-1.5 pt-2">
              {agents.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setExpandedAgent(i)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${expandedAgent === i ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: 2×3 grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className={`group rounded-2xl border ${agent.border} ${agent.bg} p-5 hover:shadow-md transition-all duration-300 flex flex-col gap-4`}
              >
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

      {/* ── MID-PAGE CTA ── */}
      <section className="py-10 px-5 bg-[#FFF5F5] border-y border-primary/10">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
              Ready to underwrite your first deal?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">Takes 10 seconds. No credit card.</p>
            <WaitlistForm variant="minimal" hideSocialProof />
          </motion.div>
        </div>
      </section>

      {/* ── 4. FEATURES ── */}
      <section id="features" className="py-18 lg:py-24 px-5 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">What QuestKey does</h2>
            <p className="text-muted-foreground text-base max-w-xl">Everything you need to underwrite with confidence, in one seamless workflow.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-[minmax(160px,auto)]">

            {/* Feature 1 — Compare */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0, duration: 0.45 }}
              className="lg:col-span-4 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Compare STR / MTR / LTR side by side</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-4">Stop guessing. See exactly how a property performs across every rental strategy on one screen — cash flow, cap rate, occupancy, and risk, all at once.</p>
              <div className="space-y-2 max-w-xs">
                {[
                  { label: "STR", pct: 100, color: "bg-primary" },
                  { label: "MTR", pct: 58, color: "bg-gray-300" },
                  { label: "LTR", pct: 22, color: "bg-gray-200" }
                ].map(bar => (
                  <div key={bar.label} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-7 font-medium">{bar.label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className={`${bar.color} h-2 rounded-full`} style={{ width: `${bar.pct}%` }} />
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">Est. monthly cash flow comparison</p>
              </div>
            </motion.div>

            {/* Feature 2 — Regulation Risk (tall, 2 rows) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.45 }}
              className="lg:col-span-2 lg:row-span-2 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-500 mb-4 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Surface market & regulation risk</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">We scan local ordinances so you don't buy an Airbnb in a city that just banned short-term rentals.</p>
              <div className="space-y-2">
                {["STR permit required", "HOA rental restrictions", "90-day rule active", "Market saturation flag"].map(risk => (
                  <div key={risk} className="flex items-center gap-2 text-xs bg-rose-50 border border-rose-100 rounded-lg px-3 py-2 text-rose-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />{risk}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground/70 mt-3">Checked 847 local ordinances · Updated March 2026</p>
              <p className="text-[11px] text-muted-foreground/70 mt-0.5">Regulation database updated weekly</p>
            </motion.div>

            {/* Feature 3 — Cash Flow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12, duration: 0.45 }}
              className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Deep cash flow & return analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Drill into the numbers. Adjust vacancy, CapEx, management fees, and 12 other assumptions — watch returns update in real-time.</p>
            </motion.div>

            {/* Feature 4 — Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16, duration: 0.45 }}
              className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center text-green-600 mb-4 group-hover:scale-105 transition-transform">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Clear buy / pass recommendation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Unbiased, data-backed strategy recommendation for every property you analyze. No more gut-feel decisions.</p>
            </motion.div>

            {/* Feature 5 — Fallback */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.45 }}
              className="lg:col-span-3 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Fallback plan if Airbnb underperforms</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Never rely on a single strategy. Know your downside protection before you close the deal.</p>
            </motion.div>

            {/* Feature 6 — Save */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24, duration: 0.45 }}
              className="lg:col-span-3 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <History className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Save & review deals over time</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Build a database of underwritten deals to spot market trends and refine your criteria.</p>
              <p className="text-xs text-muted-foreground/70 mt-2 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Export to PDF or share with your partner or lender
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section id="how-it-works" className="py-18 lg:py-24 bg-white border-y border-border px-5 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Three steps to a better deal</h2>
            <p className="text-muted-foreground">From address to decision in minutes, not weeks.</p>
          </motion.div>

          {/* Mobile: vertical with connectors */}
          <div className="flex flex-col items-center md:hidden">
            {steps.flatMap((step, i) => {
              const stepEl = (
                <motion.div
                  key={`step-m-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.45 }}
                  className="flex flex-col items-center text-center w-full max-w-xs py-4"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/25 flex items-center justify-center mb-4">
                    <span className="font-display font-extrabold text-xl text-primary">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              );
              if (i < steps.length - 1) {
                return [stepEl, (
                  <div key={`conn-m-${i}`} className="flex flex-col items-center py-1">
                    <div className="border-l-2 border-dashed border-primary/30 h-7" />
                    <ChevronDown className="w-5 h-5 text-primary/50 -mt-1" />
                  </div>
                )];
              }
              return [stepEl];
            })}
          </div>

          {/* Desktop: horizontal with arrows */}
          <div className="hidden md:flex items-start justify-between gap-3">
            {steps.flatMap((step, i) => {
              const stepEl = (
                <motion.div
                  key={`step-d-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.45 }}
                  className="flex-1 flex flex-col items-center text-center px-2"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/25 flex items-center justify-center mb-4">
                    <span className="font-display font-extrabold text-xl text-primary">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              );
              if (i < steps.length - 1) {
                return [stepEl, (
                  <div key={`conn-d-${i}`} className="flex-shrink-0 flex items-center mt-7">
                    <ChevronRight className="w-6 h-6 text-primary/40" />
                  </div>
                )];
              }
              return [stepEl];
            })}
          </div>
        </div>
      </section>

      {/* ── 6. WHO USES QUESTKEY ── */}
      <section className="py-18 lg:py-24 px-5 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">Who uses QuestKey?</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
              Whether you're buying your first rental or scaling to ten, QuestKey meets you where you are.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {audience.map((item, i) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="bg-white border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <h3 className="font-display font-bold text-foreground text-sm mb-1.5">{item.type}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.pain}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. BOTTOM CTA ── */}
      <section id="cta" className="py-24 lg:py-32 px-5 relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(255,255,255,0.08),transparent)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Be first to try QuestKey
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-white/85 mb-10 max-w-xl mx-auto leading-relaxed">
              1,000 founding member spots. 847 claimed. Get in before they're gone.
            </motion.p>
            <motion.div variants={fadeUp} className="bg-white p-6 sm:p-8 rounded-3xl text-left shadow-2xl max-w-lg mx-auto text-foreground">
              <WaitlistForm variant="minimal" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. FOOTER ── */}
      <footer className="py-8 border-t border-border bg-white px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-foreground">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white">
              <QuestKeyIcon className="w-3 h-3" />
            </div>
            QuestKey
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-muted-foreground text-center">
            <span>QuestKey © 2026 · Built by Castle Capital</span>
            <span className="hidden sm:inline text-border">·</span>
            <a href="#" className="hover:text-foreground transition-colors underline-offset-2 hover:underline">Privacy Policy</a>
            <span className="hidden sm:inline text-border">·</span>
            <a href="mailto:team@questkey.com" className="hover:text-foreground transition-colors">team@questkey.com</a>
          </div>

          <div className="flex gap-3">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
              className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors shadow-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors shadow-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
