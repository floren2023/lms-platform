import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: "postgresql://neondb_owner:npg_uFNe8z1SnCmU@ep-rapid-heart-abanp218-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require", 
  },
});
