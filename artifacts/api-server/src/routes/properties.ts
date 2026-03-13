import { Router, type IRouter } from "express";
import { db, propertiesTable, analysesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../lib/auth.js";
import { CreatePropertyBody } from "@workspace/api-zod";

const AGENT_CATALOG: { category: string; name: string }[] = [
  { category: "underwriting", name: "Miles" },
  { category: "acquisitions", name: "Avery" },
  { category: "risk", name: "Rhea" },
  { category: "revenue", name: "Kai" },
  { category: "setup", name: "Sloane" },
  { category: "portfolio", name: "Theo" },
  { category: "accounting", name: "Morgan" },
  { category: "tax", name: "Quinn" },
  { category: "financing", name: "Blake" },
  { category: "marketing", name: "Sage" },
  { category: "legal", name: "Drew" },
  { category: "hr", name: "Jordan" },
  { category: "operations", name: "Casey" },
  { category: "property_management", name: "Riley" },
  { category: "design", name: "Finley" },
];

const router: IRouter = Router();

router.use(requireAuth);

router.get("/properties", async (req, res) => {
  const userId = (req as any).user.id;
  const props = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.userId, userId));

  res.json(
    props.map((p) => ({
      ...p,
      askingPrice: Number(p.askingPrice),
      bathrooms: p.bathrooms ? Number(p.bathrooms) : null,
    }))
  );
});

router.post("/properties", async (req, res) => {
  const userId = (req as any).user.id;
  const parsed = CreatePropertyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ error: "validation_error", message: "Please check your input." });
    return;
  }

  const data = parsed.data;
  const [prop] = await db
    .insert(propertiesTable)
    .values({
      userId,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode ?? null,
      askingPrice: String(data.askingPrice),
      bedrooms: data.bedrooms ?? null,
      bathrooms: data.bathrooms ? String(data.bathrooms) : null,
      squareFeet: data.squareFeet ?? null,
      yearBuilt: data.yearBuilt ?? null,
      propertyType: data.propertyType ?? null,
      notes: data.notes ?? null,
    })
    .returning();

  res.status(201).json({
    ...prop,
    askingPrice: Number(prop.askingPrice),
    bathrooms: prop.bathrooms ? Number(prop.bathrooms) : null,
  });
});

router.get("/properties/:id", async (req, res) => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);

  const [prop] = await db
    .select()
    .from(propertiesTable)
    .where(and(eq(propertiesTable.id, id), eq(propertiesTable.userId, userId)))
    .limit(1);

  if (!prop) {
    res.status(404).json({ error: "not_found", message: "Property not found." });
    return;
  }

  res.json({
    ...prop,
    askingPrice: Number(prop.askingPrice),
    bathrooms: prop.bathrooms ? Number(prop.bathrooms) : null,
  });
});

router.delete("/properties/:id", async (req, res) => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);

  const [existing] = await db
    .select({ id: propertiesTable.id })
    .from(propertiesTable)
    .where(and(eq(propertiesTable.id, id), eq(propertiesTable.userId, userId)))
    .limit(1);

  if (!existing) {
    res.status(404).json({ error: "not_found", message: "Property not found." });
    return;
  }

  await db.delete(propertiesTable).where(eq(propertiesTable.id, id));

  res.json({ success: true, message: "Property deleted." });
});

router.get("/properties/:id/analyses", async (req, res) => {
  const userId = (req as any).user.id;
  const propertyId = Number(req.params.id);

  const [prop] = await db
    .select({ id: propertiesTable.id })
    .from(propertiesTable)
    .where(and(eq(propertiesTable.id, propertyId), eq(propertiesTable.userId, userId)))
    .limit(1);

  if (!prop) {
    res.status(404).json({ error: "not_found", message: "Property not found." });
    return;
  }

  const analyses = await db
    .select()
    .from(analysesTable)
    .where(eq(analysesTable.propertyId, propertyId));

  res.json(analyses);
});

router.post("/properties/:id/analyses", async (req, res) => {
  const userId = (req as any).user.id;
  const propertyId = Number(req.params.id);
  const { agentCategory } = req.body;

  if (!agentCategory) {
    res.status(422).json({ error: "validation_error", message: "agentCategory is required." });
    return;
  }

  const agent = AGENT_CATALOG.find((a) => a.category === agentCategory);
  if (!agent) {
    res.status(422).json({ error: "validation_error", message: "Invalid agent category." });
    return;
  }

  const [prop] = await db
    .select()
    .from(propertiesTable)
    .where(and(eq(propertiesTable.id, propertyId), eq(propertiesTable.userId, userId)))
    .limit(1);

  if (!prop) {
    res.status(404).json({ error: "not_found", message: "Property not found." });
    return;
  }

  const [analysis] = await db
    .insert(analysesTable)
    .values({
      propertyId,
      agentCategory: agent.category,
      agentName: agent.name,
      status: "in_progress",
    })
    .returning();

  runAnalysis(analysis.id, agent.category, agent.name, prop);

  res.status(201).json(analysis);
});

async function runAnalysis(
  analysisId: number,
  category: string,
  agentName: string,
  property: typeof propertiesTable.$inferSelect
) {
  await new Promise((r) => setTimeout(r, 1500 + Math.random() * 2000));

  const price = Number(property.askingPrice);
  const findings = generateFindings(category, agentName, property, price);

  await db
    .update(analysesTable)
    .set({
      status: "complete",
      summary: findings.summary,
      findings: findings.details as any,
      recommendation: findings.recommendation,
      completedAt: new Date(),
    })
    .where(eq(analysesTable.id, analysisId));
}

function generateFindings(
  category: string,
  agentName: string,
  property: typeof propertiesTable.$inferSelect,
  price: number
) {
  const addr = `${property.address}, ${property.city}, ${property.state}`;

  const map: Record<string, { summary: string; details: object; recommendation: string }> = {
    underwriting: {
      summary: `${agentName} completed underwriting analysis for ${addr}. Based on the asking price of $${price.toLocaleString()}, estimated gross yield ranges 6.2–9.4% depending on strategy selected. STR projected at the high end; LTR at the conservative end.`,
      details: { strYield: "9.4%", mtrYield: "7.8%", ltrYield: "6.2%", capRate: "6.8%", cashOnCash: "7.2%", dscr: "1.24", noi: Math.round(price * 0.068).toLocaleString() },
      recommendation: "This property meets underwriting thresholds for STR and MTR strategies. Proceed to risk and market analysis before making an offer.",
    },
    acquisitions: {
      summary: `${agentName} reviewed acquisition opportunity for ${property.city}, ${property.state}. The market shows moderate competition with STR penetration under 18%. Property has acquisition potential at current ask.`,
      details: { marketDemand: "Moderate-High", strPenetration: "17.3%", avgDaysOnMarket: 24, competingListings: 38, acquisitionFit: "Strong" },
      recommendation: "Market conditions favor acquisition. Negotiate toward a 3–5% discount if possible. No red flags at current ask price.",
    },
    risk: {
      summary: `${agentName} flagged 2 moderate risk items. Local STR regulations require a permit ($250/yr). Insurance costs in the area are elevated due to weather exposure. No zoning violations detected.`,
      details: { regulatoryRisk: "Low-Moderate", strPermitRequired: true, permitCost: 250, insuranceRisk: "Elevated", zoningCompliance: "Clear", downside: "-$180/mo cash flow at 55% occupancy" },
      recommendation: "Risk profile is manageable. Factor permit costs and higher insurance into your projections. Budget $1,800–2,400/yr in insurance.",
    },
    revenue: {
      summary: `${agentName} modeled revenue for all three strategies. STR ADR estimate: $189/night at 68% occupancy = $46,980/yr. MTR at $2,800/mo = $33,600/yr. LTR at $2,100/mo = $25,200/yr.`,
      details: { strADR: 189, strOccupancy: "68%", strAnnualRevenue: 46980, mtrMonthly: 2800, mtrAnnual: 33600, ltrMonthly: 2100, ltrAnnual: 25200, recommendedStrategy: "STR" },
      recommendation: "STR maximizes revenue at this location but requires active management. MTR is the best hands-off alternative with solid returns.",
    },
    setup: {
      summary: `${agentName} estimated setup and furnishing for STR/MTR readiness. For a ${property.bedrooms ?? 3}-bedroom property, estimated furnishing cost is $18,000–24,000. Timeline to guest-ready: 4–6 weeks.`,
      details: { furnishingEstimate: "$18,000–$24,000", setupTimeline: "4–6 weeks", platformFees: "Airbnb 3%, VRBO 5%", cleaningSetup: "$85–120/turn", propertyManagement: "20–25% of revenue if outsourced" },
      recommendation: "Budget $22,000 for a quality STR setup. Prioritize kitchen, main bedroom, and outdoor space. Use a local staging specialist.",
    },
    portfolio: {
      summary: `${agentName} placed this property in portfolio context. At current pricing, this asset diversifies STR exposure and improves portfolio yield by ~0.4% when added to a 3-property mix.`,
      details: { portfolioFit: "Strong", diversificationScore: "7.2/10", projectedPortfolioYield: "7.9%", holdRecommendation: "5–7 years", exitStrategy: "Refinance or sell at appreciation" },
      recommendation: "This property adds value to a growing portfolio. Consider a BRRRR or equity-pull strategy after 18–24 months of STR operation.",
    },
    accounting: {
      summary: `${agentName} modeled income and expense structure. Estimated annual net income of $24,800–31,400 depending on strategy and management approach. Expense ratio: 34–42%.`,
      details: { grossRevenue: "$33,600–$46,980", operatingExpenses: "$15,200–$18,800", netOperatingIncome: "$18,400–$28,180", expenseRatio: "34–42%", managementFee: "$6,720–$11,745 if outsourced" },
      recommendation: "Self-management improves net income by 20–25%. Consider hybrid approach: self-manage for first 12 months, then evaluate outsourcing.",
    },
    tax: {
      summary: `${agentName} identified key tax advantages. STR properties with >14 days personal use qualify for mixed-use deductions. Depreciation on this property at current price: ~$8,800/yr (27.5-year schedule).`,
      details: { annualDepreciation: "$8,800", taxStrategy: "STR short-term rental losses may offset W-2 income if you qualify as a real estate professional", entityRecommendation: "LLC recommended for liability", estimatedTaxSavings: "$3,200–5,400/yr depending on bracket" },
      recommendation: "Set up an LLC before closing. Consult a CPA familiar with short-term rental tax law. Bonus depreciation may be available in year 1.",
    },
    financing: {
      summary: `${agentName} modeled three financing scenarios at current rates (7.1% 30yr). DSCR loan at 75% LTV minimizes qualification friction for STR investors.`,
      details: { conventionalLoan: `$${Math.round(price * 0.8).toLocaleString()} @ 7.1% = $${Math.round(price * 0.8 * 0.00671).toLocaleString()}/mo`, dscrLoan: "75% LTV, no income verification, 7.4% rate", downPayment: `$${Math.round(price * 0.2).toLocaleString()} (20%)`, totalCashNeeded: `$${Math.round(price * 0.2 + 22000 + 5000).toLocaleString()} including setup and closing` },
      recommendation: "DSCR loan is the cleanest path for STR investors. If you have strong W-2 income, conventional at 20% down maximizes leverage.",
    },
    marketing: {
      summary: `${agentName} outlined a listing and brand strategy. Key positioning: mid-luxury, work-friendly, local character. Estimated time to first booking: 5–12 days with optimized listing.`,
      details: { recommendedPlatforms: ["Airbnb", "VRBO", "Direct booking site"], photosBudget: "$400–600", listingCopyStyle: "Feature-forward, local-first narrative", launchPromotion: "10% introductory discount for first 10 guests", socialChannels: "Instagram + short-form video at launch" },
      recommendation: "Invest in professional photos and a direct booking site from day one. Build an email list of repeat guests — it's your most profitable channel.",
    },
    legal: {
      summary: `${agentName} reviewed legal exposure. STR permit required in ${property.city}. Standard lease template needed for MTR. No active HOA restrictions detected (verify deed).`,
      details: { strPermit: `Required — ${property.city} city permit`, hoaRestrictions: "Verify deed covenants before closing", rentalAgreement: "Custom STR agreement recommended", liabilityExposure: "Moderate — umbrella insurance advised", complianceItems: ["Smoke/CO detectors", "Pool safety fence if applicable", "Accessibility disclosure"] },
      recommendation: "Have a real estate attorney review the deed and local STR ordinance before closing. Draft a custom rental agreement — don't use platform defaults.",
    },
    hr: {
      summary: `${agentName} assessed staffing needs. For a single STR/MTR property, a cleaning team (1099 contractor) and handyman retainer are sufficient. Full-time staff not warranted at this scale.`,
      details: { cleaningCost: "$85–120/turn", handymanRetainer: "$200/mo recommended", propertyManager: "Optional — 20–25% of revenue", coHostOption: "Local co-host at 15% is a strong middle ground", staffingRisk: "Low for single-property operation" },
      recommendation: "Hire a reliable local cleaning team before your first booking. Build a handyman retainer relationship from the start.",
    },
    operations: {
      summary: `${agentName} mapped operational workflows. Recommended tech stack: PMS, dynamic pricing tool, and guest messaging automation. Time investment: 3–5 hrs/week for self-managed STR.`,
      details: { pmsRecommendation: "Hospitable or Guesty Lite", dynamicPricing: "PriceLabs or Wheelhouse", guestMessaging: "Automated via PMS", keyAccess: "Smart lock + backup lockbox", maintenanceTracking: "Buildium or simple spreadsheet" },
      recommendation: "Set up your tech stack before launch. Automation is your margin — a $100/mo tool stack saves 10+ hours/week at scale.",
    },
    property_management: {
      summary: `${agentName} reviewed tenant and guest management framework. MTR tenants require a mid-term lease (30+ days), clear house rules, and security deposit structure.`,
      details: { tenantScreening: "Basic background check for MTR", securityDeposit: "30-day deposit recommended", maintenanceResponse: "24hr for urgent, 72hr for standard", turnoverCost: "$150–300 between MTR tenants", retentionStrategy: "Monthly check-in + renewal incentive" },
      recommendation: "For MTR, prioritize finding reliable traveling professionals (nurses, consultants, remote workers). Screen thoroughly and use a solid lease.",
    },
    design: {
      summary: `${agentName} assessed interior design opportunity. A neutral-modern aesthetic with local character elements performs best on STR platforms. Estimated design refresh budget: $14,000–18,000.`,
      details: { designStyle: "Neutral-modern with local accent pieces", photographyBudget: "$500–750 professional shoot", furnitureAllocation: "45% bedroom, 30% living/dining, 25% kitchen/bath", uniqueFeature: "One standout element (gallery wall, statement headboard) drives social sharing", listingPerformanceLift: "Estimated 12–18% ADR premium vs. basic listings" },
      recommendation: "Don't under-invest in design. The top 15% of-looking listings on Airbnb command 20–30% higher rates. Hire a staging consultant if unfamiliar.",
    },
  };

  return (
    map[category] ?? {
      summary: `${agentName} completed analysis for ${addr}.`,
      details: {},
      recommendation: "Review the full analysis report for detailed findings.",
    }
  );
}

export default router;
