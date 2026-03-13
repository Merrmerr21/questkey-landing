import { 
  BarChart3, Target, ShieldAlert, TrendingUp, Wrench, Layers, 
  Calculator, Receipt, Landmark, Megaphone, Scale, Users, 
  Settings2, Home, Palette 
} from "lucide-react";

export const AGENT_ROSTER = [
  { category: 'underwriting', name: 'Miles', role: 'Underwriting', desc: 'Runs the numbers and compares STR/MTR/LTR strategy paths.', icon: BarChart3, color: 'from-blue-500 to-indigo-600' },
  { category: 'acquisitions', name: 'Avery', role: 'Acquisitions', desc: 'Identifies market fit and acquisition opportunity.', icon: Target, color: 'from-purple-500 to-fuchsia-600' },
  { category: 'risk', name: 'Rhea', role: 'Risk', desc: 'Flags downside risk, regulation issues, and weak assumptions.', icon: ShieldAlert, color: 'from-rose-500 to-orange-600' },
  { category: 'revenue', name: 'Kai', role: 'Revenue', desc: 'Optimizes pricing and revenue strategy.', icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
  { category: 'setup', name: 'Sloane', role: 'Setup', desc: 'Guides setup, furnishing, and guest-readiness.', icon: Wrench, color: 'from-amber-500 to-yellow-600' },
  { category: 'portfolio', name: 'Theo', role: 'Portfolio', desc: 'Helps you think in portfolios, not one-off deals.', icon: Layers, color: 'from-cyan-500 to-blue-600' },
  { category: 'accounting', name: 'Morgan', role: 'Accounting', desc: 'Tracks income, expenses, and financial reporting.', icon: Calculator, color: 'from-slate-500 to-gray-600' },
  { category: 'tax', name: 'Quinn', role: 'Tax', desc: 'Identifies tax strategy, deductions, and entity structure.', icon: Receipt, color: 'from-green-500 to-emerald-600' },
  { category: 'financing', name: 'Blake', role: 'Financing', desc: 'Analyzes loan options, rates, and leverage strategy.', icon: Landmark, color: 'from-blue-400 to-indigo-500' },
  { category: 'marketing', name: 'Sage', role: 'Marketing', desc: 'Builds your brand, listings, and guest acquisition strategy.', icon: Megaphone, color: 'from-pink-500 to-rose-600' },
  { category: 'legal', name: 'Drew', role: 'Legal', desc: 'Reviews contracts, compliance, and liability exposure.', icon: Scale, color: 'from-stone-500 to-slate-600' },
  { category: 'hr', name: 'Jordan', role: 'HR', desc: 'Manages hiring, contractors, and team operations.', icon: Users, color: 'from-orange-500 to-amber-600' },
  { category: 'operations', name: 'Casey', role: 'Operations', desc: 'Optimizes systems, processes, and efficiency.', icon: Settings2, color: 'from-violet-500 to-purple-600' },
  { category: 'property_management', name: 'Riley', role: 'Property Management', desc: 'Guides tenant relations, maintenance, and retention.', icon: Home, color: 'from-teal-500 to-cyan-600' },
  { category: 'design', name: 'Finley', role: 'Design', desc: 'Advises on interior design, staging, and visual appeal.', icon: Palette, color: 'from-fuchsia-500 to-pink-600' },
];
