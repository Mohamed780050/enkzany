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

  // Find the hospital owned by this user
  const hospital = await prisma.hospital.findFirst({
    where: { adminId: session.user.id },
  });

  if (!hospital) {
    return { success: false, message: "لم يتم العثور على المستشفى" };
  }

  const nameAr = formData.get("nameAr") as string;
  const nameEn = formData.get("nameEn") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const type = formData.get("type") as string;
  
  const latitudeStr = formData.get("latitude") as string | null;
  const longitudeStr = formData.get("longitude") as string | null;

  const parsedLat = latitudeStr ? parseFloat(latitudeStr) : null;
  const parsedLng = longitudeStr ? parseFloat(longitudeStr) : null;

  try {
    await prisma.hospital.update({
      where: { id: hospital.id },
      data: {
        nameAr,
        nameEn,
        address,
        phone,
        type,
        latitude: isNaN(parsedLat as any) ? null : parsedLat,
        longitude: isNaN(parsedLng as any) ? null : parsedLng,
      },
    });

    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "تم إرسال التغييرات للمراجعة وستظهر خلال 24 ساعة",
    };
  } catch (error) {
    console.error("Failed to update profile", error);
    return { success: false, message: "حدث خطأ أثناء حفظ البيانات" };
  }
}
