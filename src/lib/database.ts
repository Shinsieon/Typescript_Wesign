import Database from "better-sqlite3";
import fs from "fs";

export let db: Database.Database;

export async function initializeDatabase(
  filename: string,
  options?: Database.Options
) {
  db = new Database(filename, options);

  const schema = fs.readFileSync("schema.sql").toString("utf-8");
  db.exec(schema);
}

export async function closeDatabase() {
  db?.close();
}

export function transaction<T>(cb: () => T) {
  let result: T;
  db.transaction(() => {
    result = cb();
  })();
  return result;
}
