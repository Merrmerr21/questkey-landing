import React, { useState } from "react";
import { X, Building2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useCreateProperty } from "@/hooks/use-properties";
import type { CreatePropertyRequestPropertyType } from "@workspace/api-client-react/src/generated/api.schemas";
import { motion, AnimatePresence } from "framer-motion";

const propertySchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().optional(),
  askingPrice: z.coerce.number().min(1, "Asking price is required"),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  squareFeet: z.coerce.number().optional(),
  yearBuilt: z.coerce.number().optional(),
  propertyType: z.enum(['single_family', 'multi_family', 'condo', 'townhouse', 'commercial']).optional(),
  notes: z.string().optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export function AddPropertyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { mutate: createProperty, isPending } = useCreateProperty();
  
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      address: "", city: "", state: "", zipCode: "",
      askingPrice: 0, bedrooms: 0, bathrooms: 0, squareFeet: 0, yearBuilt: new Date().getFullYear(),
      propertyType: "single_family", notes: ""
    }
  });

  const onSubmit = (data: PropertyFormData) => {
    createProperty(data as any, {
      onSuccess: () => {
        form.reset();
        onClose();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
          onClick={onClose} 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-6 border-b border-border bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold font-display text-foreground">Add New Property</h2>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar bg-white">
            <form id="property-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Location Details</h3>
                <div className="space-y-2">
                  <Label className="text-foreground">Street Address *</Label>
                  <Input {...form.register("address")} placeholder="123 Main St" className="bg-white border-border" />
                  {form.formState.errors.address && <p className="text-xs text-destructive">{form.formState.errors.address.message}</p>}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label className="text-foreground">City *</Label>
                    <Input {...form.register("city")} placeholder="Austin" className="bg-white border-border" />
                    {form.formState.errors.city && <p className="text-xs text-destructive">{form.formState.errors.city.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">State *</Label>
                    <Input {...form.register("state")} placeholder="TX" className="bg-white border-border" />
                    {form.formState.errors.state && <p className="text-xs text-destructive">{form.formState.errors.state.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">ZIP</Label>
                    <Input {...form.register("zipCode")} placeholder="78701" className="bg-white border-border" />
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-border" />

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Property Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Asking Price ($) *</Label>
                    <Input type="number" {...form.register("askingPrice")} placeholder="500000" className="bg-white border-border" />
                    {form.formState.errors.askingPrice && <p className="text-xs text-destructive">{form.formState.errors.askingPrice.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Property Type</Label>
                    <select 
                      {...form.register("propertyType")}
                      className="flex h-11 w-full rounded-xl border border-border bg-white px-4 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      <option value="single_family">Single Family</option>
                      <option value="multi_family">Multi Family</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Bedrooms</Label>
                    <Input type="number" {...form.register("bedrooms")} placeholder="3" className="bg-white border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Bathrooms</Label>
                    <Input type="number" step="0.5" {...form.register("bathrooms")} placeholder="2" className="bg-white border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Square Feet</Label>
                    <Input type="number" {...form.register("squareFeet")} placeholder="1500" className="bg-white border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Year Built</Label>
                    <Input type="number" {...form.register("yearBuilt")} placeholder="2000" className="bg-white border-border" />
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-border" />

              <div className="space-y-2">
                <Label className="text-foreground">Notes (Optional)</Label>
                <textarea 
                  {...form.register("notes")}
                  rows={3}
                  placeholder="Any specific context for the AI agents..."
                  className="flex w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 resize-none"
                />
              </div>

            </form>
          </div>

          <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} type="button" className="bg-white hover:bg-muted text-foreground">Cancel</Button>
            <Button type="submit" form="property-form" disabled={isPending} className="bg-primary hover:bg-primary/90 text-white">
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isPending ? "Creating..." : "Save Property"}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
