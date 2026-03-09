import { cookies } from "next/headers";

type SessionPayload = { hospitalId: string; role: "admin" | "nurse" };

export async function createSession(payload: SessionPayload) {
  const cookieStore = await cookies();
  cookieStore.set("demo_session", JSON.stringify(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("demo_session")?.value;
  if (!session) return null;
  try {
    return JSON.parse(session) as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("demo_session");
}
