import { motion } from "framer-motion";
import { TrendingUp, Home, Key, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";

export function MockDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Decorative background glows */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-[2.5rem] blur-2xl opacity-50" />
      
      <motion.div 
        className="relative glass-panel rounded-3xl p-6 shadow-2xl flex flex-col gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Property Analysis</h3>
            <p className="text-lg font-display text-foreground mt-1">1248 Oakwood Ave, Austin TX</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">BUY SIGNAL</span>
          </div>
        </div>

        {/* Strategy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* STR */}
          <motion.div variants={item} className="bg-card/50 rounded-2xl p-5 border border-primary/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <Key className="w-5 h-5" />
              </div>
              <h4 className="font-display font-semibold">Airbnb (STR)</h4>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Est. Cash Flow</p>
                <p className="text-xl font-bold text-emerald-400">+$1,840<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cap Rate</span>
                <span className="font-medium">8.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Occupancy</span>
                <span className="font-medium">68%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <TrendingUp className="w-3 h-3" /> Recommended Path
              </div>
            </div>
          </motion.div>

          {/* MTR */}
          <motion.div variants={item} className="bg-card/30 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-white/70">
                <Home className="w-5 h-5" />
              </div>
              <h4 className="font-display font-semibold text-white/90">Mid-Term</h4>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Est. Cash Flow</p>
                <p className="text-xl font-bold text-white/90">+$920<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cap Rate</span>
                <span className="font-medium text-white/80">6.4%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Occupancy</span>
                <span className="font-medium text-white/80">85%</span>
              </div>
            </div>
             <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-3 h-3" /> Solid Fallback
              </div>
            </div>
          </motion.div>

          {/* LTR */}
          <motion.div variants={item} className="bg-card/30 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors opacity-75">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-white/50">
                <Home className="w-5 h-5 opacity-50" />
              </div>
              <h4 className="font-display font-semibold text-white/70">Long-Term</h4>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Est. Cash Flow</p>
                <p className="text-xl font-bold text-white/70">-$145<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cap Rate</span>
                <span className="font-medium text-white/60">4.1%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Occupancy</span>
                <span className="font-medium text-white/60">95%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-rose-400/80">
                <AlertTriangle className="w-3 h-3" /> Negative Cash Flow
              </div>
            </div>
          </motion.div>
        </div>

        {/* Risk Warning Component */}
        <motion.div variants={item} className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex gap-4 items-start">
          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-semibold text-rose-400">Regulation Risk Detected</h5>
            <p className="text-sm text-rose-400/80 mt-1">Austin requires an active STR license. Current owner does not have one active. Factor in 45-60 days for permit approval.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
