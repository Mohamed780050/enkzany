"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export type ProfileUpdateState = {
  success?: boolean;
  message?: string;
} | null;

export async function updateProfileAction(
  state: ProfileUpdateState,
  formData: FormData,
): Promise<ProfileUpdateState> {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "غير مصرح لك" };
  }

  const nameAr = formData.get("nameAr") as string;
  const nameEn = formData.get("nameEn") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const type = formData.get("type") as string;

  try {
    await prisma.hospital.update({
      where: { id: session.hospitalId },
      data: {
        nameAr,
        nameEn,
        address,
        phone,
        type,
      },
    });

    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");

    // Simulate approval process for demo
    return {
      success: true,
      message: "تم إرسال التغييرات للمراجعة وستظهر خلال 24 ساعة",
    };
  } catch (error) {
    console.error("Failed to update profile", error);
    return { success: false, message: "حدث خطأ أثناء حفظ البيانات" };
  }
}
