import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = await request.json();
  const { nameAr, nameEn, email, phone, address, type, latitude, longitude, governorate } = body;

  if (!nameAr || !nameEn || !email) {
    return NextResponse.json(
      { error: "الحقول المطلوبة: اسم المستشفى (عربي وإنجليزي) والبريد الإلكتروني" },
      { status: 400 }
    );
  }

  // Check if user already has a hospital
  const existingHospital = await prisma.hospital.findFirst({
    where: { adminId: session.user.id },
  });

  if (existingHospital) {
    return NextResponse.json(
      { error: "لديك مستشفى مسجل بالفعل" },
      { status: 400 }
    );
  }

  // Check if email is already taken
  const emailTaken = await prisma.hospital.findUnique({
    where: { email },
  });

  if (emailTaken) {
    return NextResponse.json(
      { error: "البريد الإلكتروني مستخدم بالفعل" },
      { status: 400 }
    );
  }

  const parsedLat = latitude ? parseFloat(latitude) : null;
  const parsedLng = longitude ? parseFloat(longitude) : null;

  const hospital = await prisma.hospital.create({
    data: {
      nameAr,
      nameEn,
      email,
      phone: phone || null,
      address: address || null,
      type: type || "public",
      governorate: governorate || null,
      latitude: isNaN(parsedLat as any) ? null : parsedLat,
      longitude: isNaN(parsedLng as any) ? null : parsedLng,
      adminId: session.user.id,
    },
  });

  return NextResponse.json(hospital, { status: 201 });
}
