import { Pool } from 'pg';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  try {
    console.log('Running database migration...');
    
    // Read and execute the migration SQL
    const migrationSQL = await readFile(
      join(__dirname, '..', 'migrations', '001_create_tables.sql'),
      'utf8',
    );
    
    await pool.query(migrationSQL);
    console.log('Migration completed successfully!');
    
    // Test the connection by running a simple query
    const result = await pool.query('SELECT COUNT(*) as song_count FROM songs');
    console.log(`Database setup complete. Songs in database: ${result.rows[0].song_count}`);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
