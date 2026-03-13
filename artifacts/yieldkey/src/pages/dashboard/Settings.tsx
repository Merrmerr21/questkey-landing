import { useUser } from "@/hooks/use-auth";
import { User, CreditCard, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { data: user } = useUser();

  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and subscription.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          
          {/* Profile Section */}
          <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-white">Account Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">First Name</div>
                  <div className="text-white font-medium bg-background/50 px-4 py-2.5 rounded-xl border border-white/5">{user.firstName || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Last Name</div>
                  <div className="text-white font-medium bg-background/50 px-4 py-2.5 rounded-xl border border-white/5">{user.lastName || 'Not provided'}</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Email Address</div>
                <div className="text-white/60 font-medium bg-background/30 px-4 py-2.5 rounded-xl border border-white/5 flex justify-between items-center">
                  {user.email}
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/50">Primary</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground pt-2">
                Member since {formatDate(user.createdAt)}
              </div>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-white">Subscription</h2>
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                {user.subscriptionTier} Plan
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-white/5 mb-6">
                <div>
                  <div className="text-white font-medium mb-1">Current Plan: <span className="capitalize">{user.subscriptionTier}</span></div>
                  <div className="text-sm text-muted-foreground">Access to limited agents and basic property analysis.</div>
                </div>
                <Button>Upgrade Plan</Button>
              </div>

              <h3 className="text-sm font-medium text-white mb-4">Available Plans</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-white/10 bg-background/50 relative overflow-hidden">
                  <div className="font-bold text-white mb-1">Starter</div>
                  <div className="text-2xl font-bold text-white mb-4">$49<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-emerald-400" /> Up to 5 Properties</li>
                    <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-emerald-400" /> Core RE Agents (6)</li>
                    <li className="flex gap-2 items-center text-white/30"><Check className="w-4 h-4" /> Advanced Financial Agents</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl border border-primary/30 bg-primary/5 relative overflow-hidden shadow-[0_0_30px_-10px_rgba(16,185,129,0.1)]">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                  <div className="font-bold text-primary mb-1">Pro</div>
                  <div className="text-2xl font-bold text-white mb-4">$149<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                  <ul className="space-y-2 text-sm text-muted-foreground text-white/80">
                    <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Properties</li>
                    <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-emerald-400" /> All 15 AI Agents</li>
                    <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-emerald-400" /> Export to Master Sheet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="space-y-6">
           <div className="bg-card rounded-2xl border border-white/5 p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white mb-2">Security & Data</h3>
            <p className="text-sm text-muted-foreground mb-4">Your property data and analysis results are encrypted and stored securely.</p>
            <Button variant="outline" className="w-full">Change Password</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
