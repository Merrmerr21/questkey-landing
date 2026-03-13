import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plus, Building2, MapPin, DollarSign, ArrowRight, Trash2, Home } from "lucide-react";
import { useProperties, useDeleteProperty } from "@/hooks/use-properties";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { AddPropertyModal } from "@/components/AddPropertyModal";

export default function Dashboard() {
  const { data: properties, isLoading } = useProperties();
  const { mutate: deleteProperty } = useDeleteProperty();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <div className="h-64 flex items-center justify-center text-muted-foreground">Loading properties...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">My Properties</h1>
          <p className="text-muted-foreground mt-1">Manage and analyze your property pipeline.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="lg" className="shadow-primary/20">
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </Button>
      </div>

      {!properties || properties.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-card/30 border border-dashed border-white/10 rounded-3xl p-12 text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Home className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No properties yet</h3>
          <p className="text-muted-foreground max-w-sm mb-8">Add your first property to start running AI agent analysis on returns, risks, and strategy.</p>
          <Button onClick={() => setIsModalOpen(true)} variant="outline">
            Add your first property
          </Button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((prop, i) => (
            <motion.div 
              key={prop.id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              className="group bg-card rounded-2xl border border-white/5 overflow-hidden hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-black/50 flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground capitalize">
                    {prop.propertyType ? prop.propertyType.replace('_', ' ') : 'Property'}
                  </div>
                  <button 
                    onClick={() => {
                      if(confirm('Are you sure you want to delete this property?')) deleteProperty(prop.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{prop.address}</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <MapPin className="w-4 h-4" />
                    {prop.city}, {prop.state} {prop.zipCode}
                  </div>
                  <div className="flex items-center text-sm font-medium text-emerald-400 gap-2">
                    <DollarSign className="w-4 h-4" />
                    {formatCurrency(prop.askingPrice)}
                  </div>
                </div>

                <div className="flex gap-4 text-sm text-muted-foreground border-t border-white/5 pt-4">
                  {prop.bedrooms && <div><span className="text-white font-medium">{prop.bedrooms}</span> Beds</div>}
                  {prop.bathrooms && <div><span className="text-white font-medium">{prop.bathrooms}</span> Baths</div>}
                  {prop.squareFeet && <div><span className="text-white font-medium">{prop.squareFeet}</span> Sqft</div>}
                </div>
              </div>
              
              <div className="p-4 bg-white/[0.02] border-t border-white/5">
                <Link href={`/dashboard/properties/${prop.id}`} className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  View Full Analysis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AddPropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
