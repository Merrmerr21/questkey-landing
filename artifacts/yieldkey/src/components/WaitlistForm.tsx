import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, Lock, Users } from "lucide-react";
import { useJoinWaitlist } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

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
  hideFirstName?: boolean;
  hideSocialProof?: boolean;
}

export function WaitlistForm({
  className,
  variant = "default",
  hideFirstName = false,
  hideSocialProof = false,
}: WaitlistFormProps) {
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
    defaultValues: { firstName: "", email: "", investorType: undefined }
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
        <p className="text-muted-foreground text-sm">We'll be in touch soon with your early access invitation.</p>
      </motion.div>
    );
  }

  const showFirstName = variant === "default" && !hideFirstName;
  const showDropdown = variant === "default";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("w-full space-y-3", className)}>
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl flex items-start gap-3 text-sm mb-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("grid gap-3", showFirstName ? "sm:grid-cols-2" : "grid-cols-1")}>
        {showFirstName && (
          <div>
            <input
              {...form.register("firstName")}
              placeholder="First name (optional)"
              className="w-full bg-white border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
              disabled={isPending}
            />
          </div>
        )}

        <div className={cn(!showFirstName ? "col-span-full" : "")}>
          <input
            {...form.register("email")}
            placeholder="Email address *"
            type="email"
            className={cn(
              "w-full bg-white border rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm",
              form.formState.errors.email
                ? "border-destructive/50 focus:ring-destructive/50 focus:border-destructive"
                : "border-border"
            )}
            disabled={isPending}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive pl-1 mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        {showDropdown && (
          <div className={cn(showFirstName ? "sm:col-span-2" : "col-span-full")}>
            <div className="relative">
              <select
                {...form.register("investorType")}
                className="w-full appearance-none bg-white border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50 shadow-sm"
                disabled={isPending}
              >
                <option value="" disabled hidden>What best describes you?</option>
                <option value="first_time_investor">First-time investor</option>
                <option value="airbnb_host">Active Airbnb host</option>
                <option value="long_term_landlord">Long-term landlord</option>
                <option value="agent_operator">Agent / Operator</option>
                <option value="just_exploring">Just exploring</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="w-full relative group overflow-hidden rounded-xl bg-primary px-8 py-3.5 font-semibold text-white shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative flex items-center justify-center gap-2 text-sm">
            {isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</>
            ) : (
              "Get Early Access →"
            )}
          </span>
        </button>

        {!hideSocialProof && (
          <div className="flex flex-col items-center gap-1.5">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              Free beta access · No credit card required
            </p>
            {variant === "default" ? (
              <>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="w-3 h-3 text-primary" />
                  <span>Join <span className="font-semibold text-foreground">847 investors</span> already on the waitlist</span>
                </p>
                <p className="text-[11px] text-muted-foreground/70 italic">
                  First 1,000 users lock in founding member pricing
                </p>
              </>
            ) : (
              <p className="text-[11px] text-muted-foreground/70 text-center leading-relaxed">
                We'll never spam you. Expect one email when your beta access is ready.
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
