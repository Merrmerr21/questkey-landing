import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { signToken, requireAuth, formatUser } from "../lib/auth.js";
import { RegisterBody, LoginBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/auth/register", async (req, res) => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ error: "validation_error", message: "Please check your input and try again." });
    return;
  }

  const { email, password, firstName, lastName } = parsed.data;

  const existing = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()))
    .limit(1);

  if (existing.length > 0) {
    res.status(409).json({ error: "duplicate_email", message: "An account with that email already exists." });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const [user] = await db
    .insert(usersTable)
    .values({
      email: email.toLowerCase(),
      passwordHash,
      firstName: firstName ?? null,
      lastName: lastName ?? null,
    })
    .returning();

  const token = signToken({ userId: user.id, email: user.email });

  res.status(201).json({ user: formatUser(user), token });
});

router.post("/auth/login", async (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(401).json({ error: "invalid_credentials", message: "Invalid email or password." });
    return;
  }

  const { email, password } = parsed.data;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()))
    .limit(1);

  if (!user) {
    res.status(401).json({ error: "invalid_credentials", message: "Invalid email or password." });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "invalid_credentials", message: "Invalid email or password." });
    return;
  }

  const token = signToken({ userId: user.id, email: user.email });

  res.status(200).json({ user: formatUser(user), token });
});

router.post("/auth/logout", (_req, res) => {
  res.json({ success: true, message: "Logged out." });
});

router.get("/auth/me", requireAuth, (req, res) => {
  res.json(formatUser((req as any).user));
});

export default router;
