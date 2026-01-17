import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data
  await prisma.user.deleteMany();
  console.log("🗑️  Cleaned existing data");

  // Create users
  const hashedPassword = await bcrypt.hash("123456", 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        phone: "5548999999999",
        document: "12345678901",
      },
    }),
    prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        phone: "5548988888888",
        document: "98765432101",
      },
    }),
    prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        phone: "5548977777777",
        document: "11122233344",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);
  console.log("");
  console.log("📋 Seeded users:");
  console.log("─────────────────────────────────────────");
  console.log("Email                 | Password");
  console.log("─────────────────────────────────────────");
  console.log("admin@example.com     | 123456");
  console.log("john@example.com      | 123456");
  console.log("jane@example.com      | 123456");
  console.log("─────────────────────────────────────────");
  console.log("");
  console.log("🌱 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });