import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./web/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["drizz_*"],
} satisfies Config;
