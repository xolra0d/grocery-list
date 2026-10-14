import dotenv from "dotenv";
import path from "node:path";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { client, db } from "./drizzle";

dotenv.config();

async function main() {
  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), "src/lib/db/migrations"),
  });

  await client.end();
  console.log("Migrations complete");
}

main();
