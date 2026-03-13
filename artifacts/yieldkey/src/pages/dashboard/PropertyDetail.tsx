import { useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, AlertCircle, MapPin, Calendar, LayoutGrid, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useProperty } from "@/hooks/use-properties";
import { useAnalyses, useRunAnalysis } from "@/hooks/use-analyses";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AGENT_ROSTER } from "@/lib/agents";
import type { RunAnalysisRequestAgentCategory } from "@workspace/api-client-react/src/generated/api.schemas";

export default function PropertyDetail() {
  const [, params] = useRoute("/dashboard/properties/:id");
  const propertyId = params?.id ? parseInt(params.id, 10) : 0;

  const { data: property, isLoading: propLoading } = useProperty(propertyId);
  const { data: analyses = [], isLoading: anLoading } = useAnalyses(propertyId);
  const { mutate: runAnalysis, isPending: isRunning } = useRunAnalysis(propertyId);

  const runAll = () => {
    AGENT_ROSTER.forEach(agent => {
      const existing = analyses.find(a => a.agentCategory === agent.category);
      if (!existing || existing.status === 'error') {
        runAnalysis({ agentCategory: agent.category as RunAnalysisRequestAgentCategory });
      }
    });
  };

  if (propLoading || anLoading) {
    return <div className="h-64 flex items-center justify-center">Loading property profile...</div>;
  }

  if (!property) return <div>Property not found</div>;

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="bg-card border border-white/5 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Properties
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-white capitalize">
                {property.propertyType?.replace('_', ' ') || 'Property'}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" /> {property.city}, {property.state}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{property.address}</h1>
            <div className="text-2xl font-bold text-emerald-400">{formatCurrency(property.askingPrice)}</div>
          </div>

          <div className="flex gap-4">
            <div className="bg-background/50 rounded-xl p-4 border border-white/5 min-w-[120px]">
              <div className="flex items-center text-muted-foreground text-xs mb-1 uppercase tracking-wider"><LayoutGrid className="w-3 h-3 mr-1" /> Layout</div>
              <div className="font-medium text-white">{property.bedrooms || 0} BD / {property.bathrooms || 0} BA</div>
            </div>
            <div className="bg-background/50 rounded-xl p-4 border border-white/5 min-w-[120px]">
              <div className="flex items-center text-muted-foreground text-xs mb-1 uppercase tracking-wider"><Calendar className="w-3 h-3 mr-1" /> Built</div>
              <div className="font-medium text-white">{property.yearBuilt || 'Unknown'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Agent Analysis</h2>
          <p className="text-muted-foreground">Run specialized agents to evaluate this property.</p>
        </div>
        <Button onClick={runAll} disabled={isRunning} className="bg-white text-black hover:bg-white/90">
          <Play className="w-4 h-4 mr-2 fill-current" />
          Run All Agents
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AGENT_ROSTER.map((agent, i) => {
          const analysis = analyses.find(a => a.agentCategory === agent.category);
          const isProcessing = analysis?.status === 'pending' || analysis?.status === 'in_progress' || (isRunning && !analysis);

          return (
            <motion.div 
              key={agent.category}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl border border-white/5 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br", agent.color)}>
                      <agent.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{agent.name}</h3>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{agent.role}</div>
                    </div>
                  </div>
                  
                  {analysis?.status === 'complete' && <div className="text-emerald-400 bg-emerald-400/10 p-1.5 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>}
                  {analysis?.status === 'error' && <div className="text-rose-400 bg-rose-400/10 p-1.5 rounded-lg"><AlertCircle className="w-5 h-5" /></div>}
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">{agent.desc}</p>

                <AnimatePresence mode="wait">
                  {analysis?.status === 'complete' ? (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                      <div className="p-4 rounded-xl bg-background/50 border border-white/5 text-sm text-white/90 leading-relaxed">
                        {analysis.summary || "Analysis completed successfully. Detailed findings have been logged."}
                      </div>
                      {analysis.recommendation && (
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
                          <span className="text-xs uppercase tracking-wider block mb-1 opacity-70">Recommendation</span>
                          {analysis.recommendation}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex justify-end">
                      <Button 
                        variant={analysis?.status === 'error' ? 'destructive' : 'secondary'}
                        className="w-full"
                        disabled={isProcessing}
                        onClick={() => runAnalysis({ agentCategory: agent.category as RunAnalysisRequestAgentCategory })}
                      >
                        {isProcessing ? 'Analyzing...' : analysis?.status === 'error' ? 'Retry Analysis' : 'Run Analysis'}
                      </Button>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              
              {isProcessing && (
                <div className="h-1 w-full bg-background overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: "0%", x: "-100%" }}
                    animate={{ width: "50%", x: "200%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
