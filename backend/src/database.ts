import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'fala_leve',
});

// Setup tables
const initDB = async (retries = 5) => {
  while (retries > 0) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS "User" (
          id TEXT PRIMARY KEY,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          senha TEXT NOT NULL,
          tipo TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Paciente (
          id TEXT PRIMARY KEY,
          grau TEXT,
          cores TEXT,
          sons TEXT,
          FOREIGN KEY(id) REFERENCES "User"(id)
        );

        CREATE TABLE IF NOT EXISTS Medico (
          id TEXT PRIMARY KEY,
          crm TEXT,
          FOREIGN KEY(id) REFERENCES "User"(id)
        );

        CREATE TABLE IF NOT EXISTS MedicoPaciente (
          medicoId TEXT,
          pacienteId TEXT,
          PRIMARY KEY (medicoId, pacienteId),
          FOREIGN KEY(medicoId) REFERENCES Medico(id),
          FOREIGN KEY(pacienteId) REFERENCES Paciente(id)
        );

        CREATE TABLE IF NOT EXISTS Simbolo (
          idSimbolo TEXT PRIMARY KEY,
          descricaoSimbolo TEXT,
          categoriaSimbolo TEXT,
          tagsSimbolo TEXT,
          URLImagemSimbolo TEXT,
          URLaudioSimbolo TEXT,
          userId TEXT,
          FOREIGN KEY(userId) REFERENCES "User"(id)
        );
      `);
      console.log("Database initialized successfully.");
      return;
    } catch (error) {
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  console.error("Failed to initialize database after multiple retries.");
};

initDB();

export default pool;
