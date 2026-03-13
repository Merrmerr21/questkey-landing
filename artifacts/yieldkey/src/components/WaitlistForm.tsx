import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useJoinWaitlist } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

// Schema matching the backend WaitlistRequest
const formSchema = z.object({
  firstName: z.string().max(100).optional(),
  email: z.string().email("Please enter a valid email address").max(255),
  investorType: z.enum([
    "first_time_investor",
    "airbnb_host",
    "long_term_landlord",
    "agent_operator",
    "just_exploring"
  ]).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface WaitlistFormProps {
  className?: string;
  variant?: "default" | "minimal";
}

export function WaitlistForm({ className, variant = "default" }: WaitlistFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { mutate, isPending } = useJoinWaitlist({
    mutation: {
      onSuccess: () => {
        setIsSuccess(true);
        setErrorMessage(null);
      },
      onError: (error: any) => {
        setIsSuccess(false);
        // Extract error message from API response if possible
        if (error?.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else if (error?.response?.status === 409) {
          setErrorMessage("That email is already on the waitlist.");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      }
    }
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      investorType: undefined,
    }
  });

  const onSubmit = (data: FormData) => {
    setErrorMessage(null);
    mutate({ data });
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("bg-green-50 border border-green-200 rounded-2xl p-8 text-center", className)}
      >
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-display font-bold text-foreground mb-2">You're on the list!</h3>
        <p className="text-muted-foreground">We'll be in touch soon with your early access invitation.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("w-full space-y-4", className)}>
      <AnimatePresence>
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl flex items-start gap-3 text-sm mb-4">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("grid gap-4", variant === "default" ? "sm:grid-cols-2" : "grid-cols-1")}>
        {/* First Name (Optional) */}
        {variant === "default" && (
          <div className="space-y-1">
            <input
              {...form.register("firstName")}
              placeholder="First name (optional)"
              className="w-full bg-white border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 shadow-sm"
              disabled={isPending}
            />
          </div>
        )}

        {/* Email (Required) */}
        <div className={cn("space-y-1", variant === "default" ? "" : "col-span-full")}>
          <input
            {...form.register("email")}
            placeholder="Email address *"
            type="email"
            className={cn(
              "w-full bg-white border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 shadow-sm",
              form.formState.errors.email ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive" : "border-border"
            )}
            disabled={isPending}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive pl-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Investor Type */}
        {variant === "default" && (
          <div className="space-y-1 sm:col-span-2">
            <div className="relative">
              <select
                {...form.register("investorType")}
                className="w-full appearance-none bg-white border border-border rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 disabled:opacity-50 shadow-sm"
                disabled={isPending}
              >
                <option value="" disabled hidden>What best describes you?</option>
                <option value="first_time_investor" className="bg-white text-foreground">First-time investor</option>
                <option value="airbnb_host" className="bg-white text-foreground">Active Airbnb host</option>
                <option value="long_term_landlord" className="bg-white text-foreground">Long-term landlord</option>
                <option value="agent_operator" className="bg-white text-foreground">Agent / Operator</option>
                <option value="just_exploring" className="bg-white text-foreground">Just exploring</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto relative group overflow-hidden rounded-xl bg-primary px-8 py-3.5 font-semibold text-white shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <span className="relative flex items-center justify-center gap-2">
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Get Early Access"
          )}
        </span>
      </button>
    </form>
  );
}
