import { Pool, type PoolConfig } from "pg";

const dbConfig: PoolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
};

export async function executeSQL(sqlScript: string) {
  const pool = new Pool(dbConfig);

  try {
    const client = await pool.connect();
    try {
      const result = await client.query(sqlScript);
      console.log(result.rows);
      return result.rows;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Erro ao executar SQL:", error);
    throw error;
  } finally {
    await pool.end();
  }
}
