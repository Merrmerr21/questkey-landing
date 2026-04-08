import { createClient } from "@supabase/supabase-js";

type InvestorType =
  | "first_time_investor"
  | "airbnb_host"
  | "long_term_landlord"
  | "agent_operator"
  | "just_exploring";

const VALID_INVESTOR_TYPES = new Set<string>([
  "first_time_investor",
  "airbnb_host",
  "long_term_landlord",
  "agent_operator",
  "just_exploring",
]);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function handler(event: {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string | undefined>;
}) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "method_not_allowed" }),
    };
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "invalid_json" }),
    };
  }

  const { email, firstName, investorType } = body as Record<string, unknown>;

  if (typeof email !== "string" || !isValidEmail(email)) {
    return {
      statusCode: 422,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: "validation_error",
        message: "Please provide a valid email address.",
      }),
    };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "server_error", message: "Server misconfigured." }),
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Check for duplicate
  const { data: existing } = await supabase
    .from("waitlist")
    .select("id")
    .eq("email", email.toLowerCase())
    .limit(1)
    .maybeSingle();

  if (existing) {
    return {
      statusCode: 409,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: "duplicate_email",
        message: "That email is already on the waitlist.",
      }),
    };
  }

  const { error: insertError } = await supabase.from("waitlist").insert({
    email: email.toLowerCase(),
    first_name:
      typeof firstName === "string" && firstName.trim() ? firstName.trim() : null,
    investor_type:
      typeof investorType === "string" && VALID_INVESTOR_TYPES.has(investorType)
        ? (investorType as InvestorType)
        : null,
    ip_address: event.headers["x-forwarded-for"] ?? null,
  });

  if (insertError) {
    // Duplicate key from race condition
    if (insertError.code === "23505") {
      return {
        statusCode: 409,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: "duplicate_email",
          message: "That email is already on the waitlist.",
        }),
      };
    }
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "server_error", message: "Failed to join waitlist." }),
    };
  }

  const { count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  return {
    statusCode: 201,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: true,
      message: "You're on the list! We'll be in touch soon.",
      position: count ?? 0,
    }),
  };
}
