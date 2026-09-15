import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

// Standard PostgreSQL driver adapter (works with local Postgres and any
// standard Postgres provider). Prisma 7 requires a driver adapter.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
