import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";

const FULL_MARKET = "Austin, TX";

export function MarketDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const [displayedMarket, setDisplayedMarket] = useState("");
  const [showBadge, setShowBadge] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showRisk, setShowRisk] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      if (i <= FULL_MARKET.length) {
        setDisplayedMarket(FULL_MARKET.slice(0, i));
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowBadge(true), 200);
        setTimeout(() => setShowCards(true), 500);
        setTimeout(() => setShowStats(true), 950);
        setTimeout(() => setShowRisk(true), 1250);
      }
    }, 50);
    return () => clearInterval(typeInterval);
  }, [isInView]);

  const cardVariants = (i: number) => ({
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.14, type: "spring" as const, stiffness: 300, damping: 24 },
    },
  });

  const recommendations = [
    {
      type: "3BR Single Family",
      strategy: "STR",
      cashFlow: "+$2,150",
      capRate: "8.9%",
      note: "High Airbnb demand near downtown",
      highlight: true,
    },
    {
      type: "2BR Condo",
      strategy: "MTR",
      cashFlow: "+$1,240",
      capRate: "6.2%",
      note: "Strong tenant pool near university",
      highlight: false,
    },
    {
      type: "Duplex",
      strategy: "STR / LTR",
      cashFlow: "+$1,890",
      capRate: "7.8%",
      note: "House-hack friendly, steady appreciation",
      highlight: false,
    },
  ];

  const stats = [
    { label: "Median Home Price", value: "$425K" },
    { label: "Average ADR", value: "$245/night" },
    { label: "STR Occupancy", value: "68%" },
    { label: "YoY Price Growth", value: "+3.2%" },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
      <div className="absolute -inset-4 bg-gradient-to-tr from-green-100/50 to-teal-100/30 rounded-[2.5rem] blur-3xl opacity-55" />

      <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
        {/* Browser bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="hidden sm:block flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200 max-w-xs mx-auto font-mono truncate text-center">
            app.questkey.com/market/austin-tx
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col gap-4">

          {/* Header with typing animation */}
          <div className="flex justify-between items-center border-b border-border pb-4 min-h-[52px]">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Market Overview</p>
              <p className="text-base font-display font-bold text-foreground mt-0.5 min-h-[24px]">
                {displayedMarket}
                {displayedMarket.length < FULL_MARKET.length && isInView && (
                  <span className="animate-pulse text-green-600">|</span>
                )}
              </p>
            </div>
            <AnimatePresence>
              {showBadge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full border border-green-200 flex-shrink-0 ml-2"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold tracking-wide">STRONG MARKET</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Property recommendation cards — stack on mobile, row on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommendations.map((rec, i) => (
              <AnimatePresence key={rec.type}>
                {showCards && (
                  <motion.div
                    variants={cardVariants(i)}
                    initial="hidden"
                    animate="show"
                    className={`rounded-xl p-4 border relative overflow-hidden ${
                      rec.highlight
                        ? "bg-white border-green-300 shadow-sm"
                        : "bg-gray-50 border-border"
                    }`}
                  >
                    {rec.highlight && (
                      <div className="absolute inset-0 bg-gradient-to-b from-green-50/60 to-transparent pointer-events-none" />
                    )}
                    <div className="relative">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rec.strategy.startsWith("STR")
                          ? "bg-primary/10 text-primary"
                          : rec.strategy === "MTR"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {rec.strategy}
                      </span>
                      <h4 className="font-display font-semibold text-sm text-foreground mt-2">{rec.type}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Est. Cash Flow</p>
                      <p className={`text-xl font-bold ${rec.highlight ? "text-green-600" : "text-foreground"}`}>
                        {rec.cashFlow}
                        <span className="text-xs text-muted-foreground font-normal">/mo</span>
                      </p>
                      <div className="mt-2 flex justify-between text-xs">
                        <span className="text-muted-foreground">Cap Rate</span>
                        <span className="font-semibold">{rec.capRate}</span>
                      </div>
                      <p className="mt-2 pt-2 border-t border-border text-[11px] text-muted-foreground leading-relaxed">
                        {rec.note}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Market stats summary row */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 rounded-xl p-4 border border-border"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-base font-bold text-foreground">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Market risk card */}
          <AnimatePresence>
            {showRisk && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-amber-50 border-l-4 border-l-amber-500 border border-amber-200/70 rounded-xl p-4 flex gap-3 items-start"
              >
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-amber-700">Market Note</h5>
                  <p className="text-xs text-amber-700/90 mt-1 leading-relaxed">
                    Austin STR permit wait times have increased to 45–60 days. 12% of active listings received violation notices in Q4 2025. Factor regulatory overhead into your acquisition timeline.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
