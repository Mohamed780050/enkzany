"use server";

import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z
    .string()
    .min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: { email?: string[]; password?: string[] };
} | null;

export async function loginAction(
  state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = loginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "يرجى تعبئة الحقول المطلوبة بشكل صحيح",
    };
  }

  // Demo: Accept any login that passes validation.
  // We'll hardcode a dummy hospital ID for the demo session.
  await createSession({ hospitalId: "demo-hospital-1", role: "admin" });

  redirect("/dashboard");
}
