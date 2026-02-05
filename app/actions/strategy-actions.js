"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getStrategies(category = null) {
  try {
    const where = category ? { category } : {};

    // Fetch strategies from the "Cognitive Database"
    const strategies = await prisma.pedagogicalStrategy.findMany({
      where,
      orderBy: { category: "asc" },
    });

    return { success: true, data: strategies };
  } catch (error) {
    console.error("Error fetching strategies:", error);
    return { success: false, error: "Failed to load V-Ultra Strategies." };
  }
}
