import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sql = neon(process.env.DATABASE_URL);
const schema = readFileSync(resolve(__dirname, "schema.sql"), "utf-8");

async function setup() {
  console.log("Creating tables...");
  const statements = schema.split(";");
  for (const statement of statements) {
    if (statement.trim().length > 0) {
      await sql(statement);
    }
  }
  console.log("Done! Tables created.");
}

setup().catch(console.error);
