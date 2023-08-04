import Database from "better-sqlite3";
export declare let db: Database.Database;
export declare function initializeDatabase(filename: string, options?: Database.Options): Promise<void>;
export declare function closeDatabase(): Promise<void>;
export declare function transaction<T>(cb: () => T): T;
