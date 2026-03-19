import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TrendingUp, Home, Key, AlertTriangle, ShieldCheck, Sparkles, Lightbulb } from "lucide-react";

const FULL_ADDRESS = "1248 Oakwood Ave, Austin TX";

export function MockDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const [displayedAddress, setDisplayedAddress] = useState("");
  const [showBadge, setShowBadge] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      if (i <= FULL_ADDRESS.length) {
        setDisplayedAddress(FULL_ADDRESS.slice(0, i));
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowBadge(true), 200);
        setTimeout(() => setShowCards(true), 550);
        setTimeout(() => setShowAlerts(true), 1050);
      }
    }, 45);
    return () => clearInterval(typeInterval);
  }, [isInView]);

  const cardVariants = (i: number) => ({
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1, y: 0,
      transition: { delay: i * 0.14, type: "spring" as const, stiffness: 300, damping: 24 }
    }
  });

  const alertVariants = (i: number) => ({
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1, y: 0,
      transition: { delay: i * 0.18, duration: 0.4 }
    }
  });

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
      <div className="absolute -inset-4 bg-gradient-to-tr from-primary/8 to-rose-100/40 rounded-[2.5rem] blur-3xl opacity-60" />

      <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
        {/* Browser title bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          {/* URL bar: hidden on mobile, shown on sm+ */}
          <div className="hidden sm:block flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200 max-w-xs mx-auto font-mono truncate text-center">
            app.questkey.com/deal/1248-oakwood-austin-tx
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          {/* Header with typing animation */}
          <div className="flex justify-between items-center border-b border-border pb-4 min-h-[52px]">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Property Analysis</p>
              <p className="text-base font-display font-bold text-foreground mt-0.5 min-h-[24px]">
                {displayedAddress}
                {displayedAddress.length < FULL_ADDRESS.length && isInView && (
                  <span className="animate-pulse text-primary">|</span>
                )}
              </p>
            </div>
            <AnimatePresence>
              {showBadge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/25 animate-badge-pulse flex-shrink-0 ml-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span className="text-xs font-bold tracking-wide">BUY SIGNAL</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Strategy Cards — stack on mobile, row on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* STR */}
            <AnimatePresence>
              {showCards && (
                <motion.div
                  key="str"
                  variants={cardVariants(0)}
                  initial="hidden"
                  animate="show"
                  className="bg-white rounded-xl p-4 border border-primary/35 relative overflow-hidden shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                        <Key className="w-4 h-4" />
                      </div>
                      <h4 className="font-display font-semibold text-sm text-foreground">Airbnb (STR)</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Est. Cash Flow</p>
                    <p className="text-xl font-bold text-primary">+$1,840<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
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
                        Recommended Path
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MTR */}
            <AnimatePresence>
              {showCards && (
                <motion.div
                  key="mtr"
                  variants={cardVariants(1)}
                  initial="hidden"
                  animate="show"
                  className="bg-gray-50 rounded-xl p-4 border border-border shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-white rounded-lg text-muted-foreground border border-border">
                      <Home className="w-4 h-4" />
                    </div>
                    <h4 className="font-display font-semibold text-sm text-foreground">Mid-Term</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">Est. Cash Flow</p>
                  <p className="text-xl font-bold text-foreground">+$920<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
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
              )}
            </AnimatePresence>

            {/* LTR */}
            <AnimatePresence>
              {showCards && (
                <motion.div
                  key="ltr"
                  variants={cardVariants(2)}
                  initial="hidden"
                  animate="show"
                  className="bg-gray-50/60 rounded-xl p-4 border border-border opacity-80 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-white rounded-lg text-muted-foreground/50 border border-border">
                      <Home className="w-4 h-4 opacity-50" />
                    </div>
                    <h4 className="font-display font-semibold text-sm text-muted-foreground">Long-Term</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">Est. Cash Flow</p>
                  <p className="text-xl font-bold text-muted-foreground">-$145<span className="text-xs font-normal">/mo</span></p>
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
              )}
            </AnimatePresence>
          </div>

          {/* Alert cards */}
          <AnimatePresence>
            {showAlerts && (
              <>
                {/* Regulation Risk */}
                <motion.div
                  key="reg"
                  variants={alertVariants(0)}
                  initial="hidden"
                  animate="show"
                  className="bg-orange-50 border-l-4 border-l-orange-400 border border-orange-200/70 rounded-xl p-4 flex gap-3 items-start"
                >
                  <div className="flex-shrink-0 mt-0.5 animate-shake">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-orange-700">Regulation Risk Detected</h5>
                    <p className="text-xs text-orange-600/90 mt-1 leading-relaxed">Austin requires an active STR permit. Current owner has none — factor in 45–60 days for approval. Also flagged: HOA may restrict stays under 30 days.</p>
                  </div>
                </motion.div>

                {/* Neighborhood Insight */}
                <motion.div
                  key="neighborhood"
                  variants={alertVariants(1)}
                  initial="hidden"
                  animate="show"
                  className="bg-blue-50 border border-blue-200/70 rounded-xl p-4 flex gap-3 items-start"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Lightbulb className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-blue-700">Neighborhood Insight</h5>
                    <p className="text-xs text-blue-600/90 mt-1 leading-relaxed">78% of nearby STR listings are Superhosts. Median ADR $285/night. Demand outpacing supply in this submarket.</p>
                  </div>
                </motion.div>

                {/* 5-Year Projection */}
                <motion.div
                  key="projection"
                  variants={alertVariants(2)}
                  initial="hidden"
                  animate="show"
                  className="bg-teal-50 border-l-4 border-l-teal-500 border border-teal-200/70 rounded-xl p-4 flex gap-3 items-start"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-teal-700">5-Year Projection</h5>
                    <p className="text-xs text-teal-600/90 mt-1 leading-relaxed">At current trajectory, this property hits $427K equity at year 5 with STR vs $298K with LTR. STR outperforms by <span className="font-semibold">$129K</span> — even after accounting for higher vacancy risk.</p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
