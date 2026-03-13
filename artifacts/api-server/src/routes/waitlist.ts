import { Router, type IRouter, type Request, type Response } from "express";
import { db, waitlistTable } from "@workspace/db";
import { JoinWaitlistBody, ExportWaitlistQueryParams } from "@workspace/api-zod";
import { eq, count } from "drizzle-orm";

const router: IRouter = Router();

router.post("/waitlist", async (req: Request, res: Response) => {
  const parsed = JoinWaitlistBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(422).json({
      error: "validation_error",
      message: "Please provide a valid email address.",
    });
    return;
  }

  const { email, firstName, investorType } = parsed.data;

  const existing = await db
    .select({ id: waitlistTable.id })
    .from(waitlistTable)
    .where(eq(waitlistTable.email, email.toLowerCase()))
    .limit(1);

  if (existing.length > 0) {
    res.status(409).json({
      error: "duplicate_email",
      message: "That email is already on the waitlist.",
    });
    return;
  }

  await db.insert(waitlistTable).values({
    email: email.toLowerCase(),
    firstName: firstName ?? null,
    investorType: investorType ?? null,
    ipAddress: req.ip ?? null,
  });

  const [{ total }] = await db
    .select({ total: count() })
    .from(waitlistTable);

  res.status(201).json({
    success: true,
    message: "You're on the list! We'll be in touch soon.",
    position: Number(total),
  });
});

router.get("/waitlist/export", async (req: Request, res: Response) => {
  const parsed = ExportWaitlistQueryParams.safeParse(req.query);

  if (!parsed.success) {
    res.status(401).json({
      error: "unauthorized",
      message: "Admin key required.",
    });
    return;
  }

  const adminKey = process.env.ADMIN_KEY ?? "yieldkey-admin";
  if (parsed.data.adminKey !== adminKey) {
    res.status(401).json({
      error: "unauthorized",
      message: "Invalid admin key.",
    });
    return;
  }

  const entries = await db
    .select()
    .from(waitlistTable)
    .orderBy(waitlistTable.createdAt);

  const csvHeader = "id,first_name,email,investor_type,created_at\n";
  const csvRows = entries
    .map((e) =>
      [
        e.id,
        `"${(e.firstName ?? "").replace(/"/g, '""')}"`,
        `"${e.email.replace(/"/g, '""')}"`,
        e.investorType ?? "",
        e.createdAt.toISOString(),
      ].join(",")
    )
    .join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="yieldkey-waitlist-${new Date().toISOString().split("T")[0]}.csv"`
  );
  res.send(csvHeader + csvRows);
});

export default router;
