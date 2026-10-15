import { Pool } from "pg";

function getRequiredEnv(name: string): string {
    const value = process.env[name];

    if ((!value || value.trim() === "")) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

function getRequiredPortEnv(name: string): number {
    const value = getRequiredNumberEnv(name);

    if (!Number.isInteger(value) || value < 1 || value > 65535) {
        throw new Error(`Required ${name} environment variable must be a valid Port number`);
    }

    return value;
}

function getRequiredNumberEnv(name: string): number {
    const value = getRequiredEnv(name);
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
        throw new Error(`Required ${name} environment variable must be a valid number`);
    }

    return parsed;
}

const dbConfig = {
  host: getRequiredEnv("PGHOST"),
  port: getRequiredPortEnv("PGPORT"),
  database: getRequiredEnv("PGDATABASE"),
  user: getRequiredEnv("PGUSER"),
  //password: getRequiredEnv("PGPASSWORD"),
};

const pool = new Pool(dbConfig);

export async function query(
    text: string,
    values?: unknown[]
) {
    const result = await pool.query(text, values);

    return result.rows;
}

export async function testDatabaseConnection() {
    const result = await pool.query("SELECT * FROM accounts;");

    console.log("Database connected:", result.rows);
}

