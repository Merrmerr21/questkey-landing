import { motion } from "framer-motion";
import { TrendingUp, Home, Key, AlertTriangle, ShieldCheck, Sparkles, Lightbulb } from "lucide-react";

export function MockDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } }
  };

  const cardSlide = (i: number) => ({
    hidden: { opacity: 0, x: -16 + i * 16 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 260, damping: 22, delay: i * 0.12 } }
  });

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute -inset-4 bg-gradient-to-tr from-primary/8 to-rose-100/40 rounded-[2.5rem] blur-3xl opacity-60" />

      <motion.div
        className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
      >
        {/* Browser title bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200 max-w-xs mx-auto font-mono truncate text-center">
            app.yieldkey.com/deal/1248-oakwood-austin-tx
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-5">
          {/* Header */}
          <motion.div variants={item} className="flex justify-between items-center border-b border-border pb-4">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Property Analysis</p>
              <p className="text-base font-display font-bold text-foreground mt-0.5">1248 Oakwood Ave, Austin TX</p>
            </div>
            <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/25">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span className="text-xs font-bold tracking-wide">BUY SIGNAL</span>
            </div>
          </motion.div>

          {/* Strategy Cards — stagger left to right */}
          <div className="grid grid-cols-3 gap-3">
            {/* STR */}
            <motion.div
              variants={cardSlide(0)}
              className="bg-white rounded-xl p-4 border border-primary/35 relative overflow-hidden shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                    <Key className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-semibold text-sm text-foreground">Airbnb</h4>
                </div>
                <p className="text-xs text-muted-foreground">Cash Flow</p>
                <p className="text-lg font-bold text-primary">+$1,840<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cap Rate</span>
                    <span className="font-semibold">8.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Occupancy</span>
                    <span className="font-semibold">68%</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-[11px] text-primary font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <TrendingUp className="w-3 h-3" />
                    Recommended
                  </div>
                </div>
              </div>
            </motion.div>

            {/* MTR */}
            <motion.div
              variants={cardSlide(1)}
              className="bg-gray-50 rounded-xl p-4 border border-border shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-white rounded-lg text-muted-foreground border border-border">
                  <Home className="w-4 h-4" />
                </div>
                <h4 className="font-display font-semibold text-sm text-foreground">Mid-Term</h4>
              </div>
              <p className="text-xs text-muted-foreground">Cash Flow</p>
              <p className="text-lg font-bold text-foreground">+$920<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cap Rate</span>
                  <span className="font-semibold">6.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Occupancy</span>
                  <span className="font-semibold">85%</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <ShieldCheck className="w-3 h-3" /> Solid Fallback
                </div>
              </div>
            </motion.div>

            {/* LTR */}
            <motion.div
              variants={cardSlide(2)}
              className="bg-gray-50/60 rounded-xl p-4 border border-border opacity-80 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-white rounded-lg text-muted-foreground/50 border border-border">
                  <Home className="w-4 h-4 opacity-50" />
                </div>
                <h4 className="font-display font-semibold text-sm text-muted-foreground">Long-Term</h4>
              </div>
              <p className="text-xs text-muted-foreground">Cash Flow</p>
              <p className="text-lg font-bold text-muted-foreground">-$145<span className="text-xs font-normal">/mo</span></p>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cap Rate</span>
                  <span className="font-semibold text-muted-foreground">4.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Occupancy</span>
                  <span className="font-semibold text-muted-foreground">95%</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-[11px] text-red-500/80">
                  <AlertTriangle className="w-3 h-3" /> Negative CF
                </div>
              </div>
            </motion.div>
          </div>

          {/* Regulation Risk Warning — more alarming */}
          <motion.div
            variants={item}
            className="bg-orange-50 border-l-4 border-l-orange-400 border border-orange-200/70 rounded-xl p-4 flex gap-3 items-start"
          >
            <div className="flex-shrink-0 mt-0.5 animate-shake">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-orange-700">Regulation Risk Detected</h5>
              <p className="text-xs text-orange-600/90 mt-1 leading-relaxed">Austin requires an active STR permit. Current owner has none — factor in 45–60 days for approval. Also flagged: HOA restrictions may apply to rentals under 30 days.</p>
            </div>
          </motion.div>

          {/* Neighborhood Insight card */}
          <motion.div
            variants={item}
            className="bg-blue-50 border border-blue-200/70 rounded-xl p-4 flex gap-3 items-start"
          >
            <div className="flex-shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-blue-700">Neighborhood Insight</h5>
              <p className="text-xs text-blue-600/90 mt-1 leading-relaxed">78% of nearby STR listings are Superhosts. Median ADR $285/night. Demand is outpacing supply in this submarket — strong positioning for a new listing.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
