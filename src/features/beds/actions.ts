"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export type BedUpdateState = {
  success?: boolean;
  message?: string;
} | null;

export async function updateBedsAction(
  state: BedUpdateState,
  formData: FormData,
): Promise<BedUpdateState> {
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

  const bedsGeneral = parseInt(
    (formData.get("bedsGeneral") as string) || "0",
    10,
  );
  const bedsIcu = parseInt((formData.get("bedsIcu") as string) || "0", 10);
  const bedsEmergency = parseInt(
    (formData.get("bedsEmergency") as string) || "0",
    10,
  );

  if (isNaN(bedsGeneral) || isNaN(bedsIcu) || isNaN(bedsEmergency)) {
    return { success: false, message: "قيم غير صحيحة" };
  }

  try {
    // Update the hospital
    await prisma.hospital.update({
      where: { id: hospital.id },
      data: {
        bedsGeneral,
        bedsIcu,
        bedsEmergency,
        lastUpdate: new Date(),
      },
    });

    // Add to history
    await prisma.updateHistory.create({
      data: {
        hospitalId: hospital.id,
        bedsGeneral,
        bedsIcu,
        bedsEmergency,
        updatedBy: session.user.name || "Admin",
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/history");

    return { success: true, message: "تم التحديث بنجاح" };
  } catch (error) {
    console.error("Failed to update beds", error);
    return { success: false, message: "حدث خطأ أثناء التحديث" };
  }
}
