import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Loader2, AlertCircle } from "lucide-react";
import { useRegister } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const { mutate: register, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" }
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    setErrorMsg("");
    register(data, {
      onSuccess: () => {
        window.location.href = '/dashboard';
      },
      onError: (err: any) => {
        setErrorMsg(err.message || "Failed to register");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-2xl tracking-tight text-foreground mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/20">
              <Building2 className="w-5 h-5" />
            </div>
            YieldKey
          </Link>
          <h1 className="text-3xl font-display font-bold text-foreground text-center">Create your account</h1>
          <p className="text-muted-foreground mt-2 text-center">Start analyzing properties smarter.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-border">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-3 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">First Name</Label>
                <Input {...form.register("firstName")} placeholder="John" className="bg-white border-border focus-visible:ring-primary" />
                {form.formState.errors.firstName && <p className="text-xs text-destructive">{form.formState.errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Last Name</Label>
                <Input {...form.register("lastName")} placeholder="Doe" className="bg-white border-border focus-visible:ring-primary" />
                {form.formState.errors.lastName && <p className="text-xs text-destructive">{form.formState.errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Email</Label>
              <Input {...form.register("email")} type="email" placeholder="you@example.com" className="bg-white border-border focus-visible:ring-primary" />
              {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Password</Label>
              <Input type="password" {...form.register("password")} placeholder="••••••••" className="bg-white border-border focus-visible:ring-primary" />
              {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-2 bg-primary hover:bg-primary/90 text-white" disabled={isPending}>
              {isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isPending ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
