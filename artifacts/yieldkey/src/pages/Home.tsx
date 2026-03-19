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
  Clock,
  Calculator,
  Target,
  Wrench,
  TrendingUp,
  PieChart,
} from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { MockDashboard } from "@/components/MockDashboard";
import { MarketDashboard } from "@/components/MarketDashboard";

// ── Q-with-key-tail logo ──
// Diagonal tail pointing bottom-right (classic Q shape).
// Perpendicular crossbar + shorter second tooth at the tip = clearly a key bit.
function QuestKeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Q ring — larger */}
      <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="2.2" />
      {/* Key stem — diagonal bottom-right at 45°, starts at circle edge */}
      <line x1="15.0" y1="15.0" x2="21" y2="21" stroke="currentColor" strokeWidth="2.2" />
      {/* Key bit — T-crossbar perpendicular to stem at the tip */}
      <line x1="19.5" y1="22.5" x2="22.5" y2="19.5" stroke="currentColor" strokeWidth="2" />
      {/* Second shorter tooth partway along the stem */}
      <line x1="17.8" y1="21" x2="19.8" y2="19" stroke="currentColor" strokeWidth="1.6" />
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
      name: "Uri",
      role: "Underwriting",
      Icon: Calculator,
      color: "from-blue-500 to-indigo-600",
      confidence: 94,
      sources: "Based on: MLS comps, county tax records, AirDNA occupancy data",
      isRhea: false,
      content: (
        <span>
          Cash-on-cash return is <strong className="text-foreground">14.2%</strong> on the STR path versus{" "}
          <strong className="text-foreground">6.8%</strong> mid-term and{" "}
          <strong className="text-foreground">2.1%</strong> long-term. Breakeven occupancy is{" "}
          <span className="font-semibold text-primary">52%</span> — well below the market average of 68%. 5-year levered IRR projects to{" "}
          <span className="font-semibold text-primary">18.4%</span> assuming a conservative exit cap rate of 6.2%.
        </span>
      ),
    },
    {
      name: "Avery",
      role: "Acquisitions",
      Icon: Target,
      color: "from-purple-500 to-fuchsia-600",
      confidence: 87,
      sources: "Based on: Zillow market trends, Census data, Redfin demand index",
      isRhea: false,
      content: (
        <span>
          Austin's 78745 submarket shows <strong className="text-foreground">demand exceeding supply</strong> for STR inventory. Median price appreciation of{" "}
          <span className="font-semibold text-primary">+3.2% YoY</span> with strong absorption. Acquisition score:{" "}
          <span className="font-semibold text-primary">8.1/10</span> based on competition levels, entry pricing, and demand trajectory.
        </span>
      ),
    },
    {
      name: "Rhea",
      role: "Risk",
      Icon: ShieldAlert,
      color: "from-rose-500 to-orange-500",
      confidence: 91,
      sources: "Based on: City of Austin STR ordinance database, HOA filings, permit records",
      isRhea: true,
      content: (
        <span>
          <strong className="text-foreground">STR permit required</strong> — current owner has none. Permit approval window is{" "}
          <span className="font-semibold text-rose-600">45–60 days</span>, delaying income by 1.5–2 months. HOA filings flag potential restriction on stays under 30 days. Overall risk level:{" "}
          <span className="font-semibold text-amber-600">moderate</span>.
        </span>
      ),
    },
    {
      name: "Sloane",
      role: "Setup",
      Icon: Wrench,
      color: "from-amber-400 to-yellow-500",
      confidence: 88,
      sources: "Based on: Airbnb listing benchmarks, Amazon furnishing index, local contractor rates",
      isRhea: false,
      content: (
        <span>
          Competitive 3BR listing requires approximately{" "}
          <span className="font-semibold text-primary">$12,400 in furnishing</span>. Priority items: keyless entry, smart thermostat, mid-range staging. Local contractor rates are favorable. Estimated turnover cleaning cost:{" "}
          <strong className="text-foreground">$280/turn</strong>.
        </span>
      ),
    },
    {
      name: "Rex",
      role: "Revenue",
      Icon: TrendingUp,
      color: "from-[#FF5A5F] to-rose-400",
      confidence: 83,
      sources: "Based on: AirDNA revenue data, dynamic pricing benchmarks, seasonal demand models",
      isRhea: false,
      content: (
        <span>
          Projected ADR of <span className="font-semibold text-primary">$245/night</span> based on 42 comparable active listings. Peak season (Mar–May, Sep–Nov) occupancy reaches{" "}
          <strong className="text-foreground">78%</strong>. Dynamic pricing implementation historically boosts annual revenue by{" "}
          <span className="font-semibold text-primary">12–18%</span> in this submarket.
        </span>
      ),
    },
    {
      name: "Pax",
      role: "Portfolio",
      Icon: PieChart,
      color: "from-cyan-500 to-blue-500",
      confidence: 92,
      sources: "Based on: Portfolio allocation models, risk-adjusted return metrics, market correlation data",
      isRhea: false,
      content: (
        <span>
          Adding this STR brings total STR concentration to{" "}
          <span className="font-semibold text-amber-600">60% of portfolio</span>. Recommend next acquisition be MTR or LTR to balance exposure. Current portfolio expected Sharpe ratio:{" "}
          <strong className="text-foreground">0.94</strong> — remains in acceptable range.
        </span>
      ),
    },
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

      {/* ── 2b. MARKET INTELLIGENCE ── */}
      <section className="py-14 lg:py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-10"
          >
            <p className="text-[11px] font-bold text-primary uppercase tracking-[0.15em] mb-2">Market Intelligence</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Zoom out. See the full picture.</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-lg mx-auto leading-relaxed">
              Before you pick a property, pick the right market. QuestKey surfaces the best opportunities and flags risks at the market level.
            </p>
          </motion.div>
          <MarketDashboard />
        </div>
      </section>

      {/* ── 3. AI AGENT TEAM — DEAL ROOM ── */}
      <section id="team" className="py-18 lg:py-24 bg-[#F8F9FA] border-y border-border px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Six AI analysts. One complete picture.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Watch them work a real deal from six angles — simultaneously, reacting to each other's findings.
            </p>
          </motion.div>

          {/* Deal Room Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden"
          >
            {/* Panel header bar */}
            <div className="bg-gray-900 px-5 py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
                <span className="text-white font-semibold text-sm flex-shrink-0">Deal Room</span>
                <span className="text-gray-500 text-sm truncate hidden sm:block">· 1248 Oakwood Ave, Austin TX</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs flex-shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>Analysis completed in 47s</span>
              </div>
            </div>

            {/* Agent feed */}
            <div className="divide-y divide-border">
              {agents.map((agent, i) => (
                <div key={agent.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="px-5 py-5 flex gap-4"
                  >
                    {/* Functional icon avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white shadow-sm`}>
                      <agent.Icon className="w-5 h-5" />
                    </div>

                    {/* Message content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">{agent.name}</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {agent.role}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{agent.content}</p>

                      {/* Confidence bar */}
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-[11px] text-muted-foreground">Confidence</span>
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-1.5 bg-green-500 rounded-full"
                            style={{ width: `${agent.confidence}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-green-600">{agent.confidence}%</span>
                      </div>

                      {/* Sources */}
                      <p className="text-[11px] text-muted-foreground/55 mt-1.5">{agent.sources}</p>
                    </div>
                  </motion.div>

                  {/* Inter-agent callout: Uri reacts to Rhea's findings */}
                  {agent.isRhea && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="mx-5 mb-5 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex gap-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-bold text-blue-700">Uri — Live Update</span>
                          <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-semibold">
                            REACTED TO RHEA
                          </span>
                        </div>
                        <p className="text-xs text-blue-700/90 leading-relaxed">
                          Adjusted STR cash flow to account for 45–60 day permit delay. Net impact:{" "}
                          <strong>-$920 in months 1–2</strong>, breakeven by month 4. Revised IRR:{" "}
                          <strong>17.8%</strong> (was 18.4%). Recommendation unchanged — STR still strongly favored.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Deal Verdict card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="m-4"
              >
                <div className="bg-gray-900 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deal Verdict</span>
                    <span className="text-[10px] bg-primary/25 text-primary px-2 py-0.5 rounded font-bold">6/6 Agents</span>
                    <span className="ml-auto text-[11px] text-gray-500">Confidence: 89%</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4 flex-wrap">
                    <span className="text-2xl font-display font-black text-white">BUY</span>
                    <span className="text-base text-primary font-semibold">— STR Strategy Recommended</span>
                  </div>
                  <div className="space-y-1.5 text-sm text-gray-300 mb-4">
                    <p>✓ Strong cash flow with manageable regulatory risk</p>
                    <p>✓ Portfolio impact: moderate STR concentration increase</p>
                    <p>✓ Downside protected: MTR at +$920/mo if STR underperforms</p>
                  </div>
                  <div className="pt-4 border-t border-gray-700/60">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Recommended Actions</p>
                    <div className="space-y-1.5 text-sm text-gray-200">
                      <p>→ Apply for STR permit immediately (45–60 day wait)</p>
                      <p>→ Budget $12,400 for furnishing and setup</p>
                      <p>→ Implement dynamic pricing from day one</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Section bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="text-center mt-10"
          >
            <p className="text-xl font-display font-bold text-foreground mb-4">
              Put six AI analysts on your next deal
            </p>
            <button
              onClick={() => scrollTo("hero-form")}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              Get Early Access →
            </button>
          </motion.div>
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
