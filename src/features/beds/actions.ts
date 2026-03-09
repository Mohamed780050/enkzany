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
      where: { id: session.hospitalId },
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
        hospitalId: session.hospitalId,
        bedsGeneral,
        bedsIcu,
        bedsEmergency,
        updatedBy: session.role === "admin" ? "Admin" : "Nurse",
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
