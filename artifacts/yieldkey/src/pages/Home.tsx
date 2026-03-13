import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Building2, 
  BarChart3, 
  ShieldAlert, 
  CheckCircle, 
  ArrowRightLeft, 
  History,
  ChevronRight
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden selection:bg-primary/30 selection:text-primary-foreground">
      
      {/* 1. NAV */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-white cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center text-background">
              <KeyIcon className="w-4 h-4" />
            </div>
            YieldKey
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">How it works</button>
            <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollTo('team')} className="hover:text-white transition-colors">AI Team</button>
          </div>

          <button onClick={() => scrollTo('cta')} className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all hover:scale-105 active:scale-95">
            Get Early Access
          </button>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute inset-0 z-0 pointer-events-none">
           <img 
            src={`${import.meta.env.BASE_URL}images/hero-glow.png`} 
            alt="" 
            className="w-full h-full object-cover opacity-60"
          />
          {/* Fallback gradient if image fails/loads slow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-emerald-400 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Private Beta Now Open
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-6 text-white">
              Underwrite <span className="text-gradient-primary">smarter</span> rental deals
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Compare Airbnb, mid-term, and long-term strategies on any property — before you buy.
            </motion.p>

            <motion.div variants={fadeUp} className="glass-panel rounded-2xl p-6 md:p-8 relative">
              <WaitlistForm />
              <p className="text-xs text-muted-foreground mt-6 text-center">
                Join early users shaping the smarter way to analyze rental properties. Free beta access + founding member pricing.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
             <MockDashboard />
          </motion.div>
        </div>
      </section>

      {/* 3. AI TEAM */}
      <section id="team" className="py-24 bg-card/30 border-y border-white/5 relative px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Meet your investment team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Six specialized AI agents working together to tear down every deal from every angle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Miles", role: "Underwriting", desc: "Runs the numbers and compares strategy paths.", initials: "M", color: "from-blue-500 to-indigo-600" },
              { name: "Avery", role: "Acquisitions", desc: "Helps identify markets and acquisition fit.", initials: "A", color: "from-purple-500 to-fuchsia-600" },
              { name: "Rhea", role: "Risk", desc: "Flags downside risk, regulation, and weak assumptions.", initials: "R", color: "from-rose-500 to-orange-600" },
              { name: "Sloane", role: "Setup", desc: "Guides setup, furnishing, and guest-readiness.", initials: "S", color: "from-amber-500 to-yellow-600" },
              { name: "Kai", role: "Revenue", desc: "Optimizes pricing and revenue strategy.", initials: "K", color: "from-emerald-500 to-teal-600" },
              { name: "Theo", role: "Portfolio", desc: "Helps you think in portfolios, not one-off deals.", initials: "T", color: "from-cyan-500 to-blue-600" }
            ].map((agent, i) => (
              <motion.div 
                key={agent.name}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
                className="group p-6 rounded-2xl bg-background/50 border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.02]"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-xl text-white bg-gradient-to-br ${agent.color} shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {agent.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-white">{agent.name}</h3>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/70">{agent.role}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{agent.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURES */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">What YieldKey does</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">Everything you need to underwrite with confidence, built into one seamless workflow.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <ArrowRightLeft />, title: "Compare STR / MTR / LTR side by side", desc: "Stop guessing. See exactly how a property performs across different rental strategies." },
              { icon: <BarChart3 />, title: "View cash flow, return, & assumptions", desc: "Deep dive into the math. Tweak assumptions and watch returns update in real-time." },
              { icon: <ShieldAlert />, title: "Surface market & regulation risk", desc: "We scan local ordinances so you don't buy an Airbnb in a town that just banned them." },
              { icon: <CheckCircle />, title: "Recommend best-fit strategy", desc: "Get an unbiased, data-backed recommendation on the optimal use for every asset." },
              { icon: <Building2 />, title: "Show fallback plan if Airbnb underperforms", desc: "Never rely on a single point of failure. Always know your downside protection." },
              { icon: <History />, title: "Save and review deals over time", desc: "Build a database of underwritten deals to spot market trends and refine your criteria." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
                className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10 hover:before:bg-primary before:transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-card/30 border-y border-white/5 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Three steps to a better deal</h2>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[45px] left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
              {[
                { step: "01", title: "Enter a property", desc: "Address, asking price, market, and basic assumptions." },
                { step: "02", title: "Compare strategies", desc: "YieldKey models STR, MTR, and LTR scenarios side by side." },
                { step: "03", title: "Invest with clarity", desc: "Know your best path before you make an offer." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.2 } } }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 rounded-full bg-background border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all duration-500 relative z-10">
                    <span className="font-display font-bold text-3xl text-white/30 group-hover:text-primary transition-colors">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. BUILT FOR */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-white mb-10">Built for serious investors</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["First-time rental investors", "Airbnb hosts", "Long-term landlords", "Out-of-state buyers", "House hackers", "Small portfolio investors"].map((tag, i) => (
              <motion.span 
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECONDARY CTA */}
      <section id="cta" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Be first to try YieldKey
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground mb-12">
              Join early users shaping the smarter way to analyze rental properties.
            </motion.p>
            <motion.div variants={fadeUp} className="glass-panel p-8 rounded-3xl text-left shadow-2xl max-w-xl mx-auto border-primary/20">
              <WaitlistForm variant="minimal" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-12 border-t border-white/10 bg-background px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-display font-bold text-xl text-white">
            <div className="w-6 h-6 rounded border border-white/20 flex items-center justify-center text-white/50">
              <KeyIcon className="w-3 h-3" />
            </div>
            YieldKey
          </div>
          
          <p className="text-sm text-muted-foreground">Smarter decisions for rental investors.</p>
          
          <div className="flex gap-4">
            {/* Social Placeholders */}
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 text-center md:text-left text-xs text-muted-foreground/60">
          © 2025 YieldKey. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Simple key icon since we might not have a perfect one from lucide directly that fits the logo aesthetic
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
  )
}
