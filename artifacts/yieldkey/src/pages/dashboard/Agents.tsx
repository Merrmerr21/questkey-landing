import { motion } from "framer-motion";
import { AGENT_ROSTER } from "@/lib/agents";
import { cn } from "@/lib/utils";

export default function Agents() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Agent Roster</h1>
        <p className="text-muted-foreground mt-1">Your dedicated team of specialized AI analysts.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AGENT_ROSTER.map((agent, i) => (
          <motion.div 
            key={agent.category}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="group relative bg-white rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all overflow-hidden"
          >
            <div className={cn("absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-10 bg-gradient-to-br transition-opacity group-hover:opacity-20", agent.color)} />
            
            <div className="flex justify-between items-start mb-6">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm bg-gradient-to-br", agent.color)}>
                <agent.icon className="w-7 h-7" />
              </div>
              <div className="px-2.5 py-1 rounded-md bg-green-100 text-green-700 text-xs font-semibold border border-green-200">
                Available
              </div>
            </div>

            <h3 className="text-2xl font-bold font-display text-foreground mb-1">{agent.name}</h3>
            <div className="text-sm font-medium text-primary mb-4">{agent.role} Expert</div>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {agent.desc}
            </p>

            <div className="space-y-2 border-t border-border pt-4">
              <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">Capabilities</div>
              {[1,2,3].map(n => (
                <div key={n} className="flex items-center gap-2 text-sm text-foreground/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-border" />
                  <span className="flex-1 h-4 bg-muted rounded animate-pulse w-3/4" />
                </div>
              ))}
              {/* Note: the real specialties would be defined in AGENT_ROSTER, using placeholders to show layout */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
