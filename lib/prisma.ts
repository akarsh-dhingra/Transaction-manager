declare global {
  // allow global `var`
  // (needed for Prisma 7 + Next.js Hot Reload safe client)
  // must be inside a module, not global script
  // so ensure this file is treated as a module.
  var prisma: PrismaClient | undefined;
  var pgPool: Pool | undefined;
}

import { PrismaClient } from "../app/generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Create a SINGLE shared pg pool
const pool =
  globalThis.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,                   // IMPORTANT: increase pool size
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 60000, // Increased timeout for slow DBs
  });

if (!globalThis.pgPool) {
  globalThis.pgPool = pool;
}

// Create Prisma adapter ONCE
const adapter = new PrismaPg(pool);

// Prevent hot reload from creating multiple PrismaClients
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ adapter });
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient({
      adapter,
      log: ["info", "warn", "error"],
    });
  }
  prisma = globalThis.prisma;
}

export { prisma };
