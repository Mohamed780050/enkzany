import prisma from "../src/lib/prisma";

async function main() {
  const hospital = await prisma.hospital.upsert({
    where: { email: "admin@hospital.com" },
    update: {},
    create: {
      id: "demo-hospital-1",
      nameAr: "مستشفى دمنهور العام",
      nameEn: "Damanhour General Hospital",
      email: "admin@hospital.com",
      address: "دمنهور، البحيرة",
      phone: "+201000000000",
      type: "public",
      bedsGeneral: 12,
      bedsIcu: 3,
      bedsEmergency: 5,
    },
  });

  // create some initial history if none exists
  const count = await prisma.updateHistory.count({
    where: { hospitalId: "demo-hospital-1" },
  });

  if (count === 0) {
    await prisma.updateHistory.createMany({
      data: [
        {
          hospitalId: "demo-hospital-1",
          bedsGeneral: 12,
          bedsIcu: 3,
          bedsEmergency: 5,
          updatedBy: "Admin",
          updatedAt: new Date(),
        },
        {
          hospitalId: "demo-hospital-1",
          bedsGeneral: 10,
          bedsIcu: 2,
          bedsEmergency: 3,
          updatedBy: "Admin",
          updatedAt: new Date(Date.now() - 3600 * 1000),
        },
        {
          hospitalId: "demo-hospital-1",
          bedsGeneral: 8,
          bedsIcu: 1,
          bedsEmergency: 1,
          updatedBy: "Admin",
          updatedAt: new Date(Date.now() - 7200 * 1000),
        },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
