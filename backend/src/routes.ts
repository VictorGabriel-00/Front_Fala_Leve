import { Router, Request, Response, NextFunction } from 'express';
import db from './database';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const router = Router();
const JWT_SECRET = 'super-secret-key-fala-leve';

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Middleware de autenticação
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// 1. Criar Paciente
router.post('/paciente', async (req, res) => {
  const { nome, email, senha, grau, cores, sons } = req.body;
  const id = uuidv4();
  
  try {
    await db.query('BEGIN');
    await db.query('INSERT INTO "User" (id, nome, email, senha, tipo) VALUES ($1, $2, $3, $4, $5)', [id, nome, email, senha, 'PACIENTE']);
    await db.query('INSERT INTO Paciente (id, grau, cores, sons) VALUES ($1, $2, $3, $4)', [id, grau, cores, sons]);
    await db.query('COMMIT');

    res.status(201).json({ id, nome, email });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar paciente' });
  }
});

// 2. Criar Medico
router.post('/medico', async (req, res) => {
  console.log("Recebido em /medico:", req.body);
  const { nome, email, senha, Crm } = req.body;
  const id = uuidv4();

  try {
    await db.query('BEGIN');
    await db.query('INSERT INTO "User" (id, nome, email, senha, tipo) VALUES ($1, $2, $3, $4, $5)', [id, nome, email, senha, 'MEDICO']);
    await db.query('INSERT INTO Medico (id, crm) VALUES ($1, $2)', [id, Crm]);
    await db.query('COMMIT');

    res.status(201).json({ id, nome, email });
  } catch (error: any) {
    await db.query('ROLLBACK');
    console.error("DB Error in /medico:", error.message, error.stack);
    res.status(400).json({ error: 'Erro ao criar médico' });
  }
});

// 3. Login
router.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const { rows } = await db.query('SELECT * FROM "User" WHERE email = $1 AND senha = $2', [email, senha]);
    const user = rows[0];

    if (user) {
      const token = jwt.sign({ id: user.id, tipoUsuario: user.tipo }, JWT_SECRET, { expiresIn: '1d' });
      res.json({
        token,
        id: user.id,
        tipoUsuario: user.tipo,
        nome: user.nome,
        email: user.email
      });
    } else {
      res.status(401).json({ error: 'Email ou senha incorretos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 4. Upload de Arquivo
router.post('/arquivo/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }
  const url = `/uploads/${req.file.filename}`;
  res.send(url);
});

// 5. Criar Símbolo
router.post('/simbolo', authMiddleware, async (req, res) => {
  const { descricaoSimbolo, categoriaSimbolo, tagsSimbolo, URLImagemSimbolo, URLaudioSimbolo } = req.body;
  const idSimbolo = uuidv4();
  const userId = (req as any).user.id;

  try {
    await db.query('INSERT INTO Simbolo (idSimbolo, descricaoSimbolo, categoriaSimbolo, tagsSimbolo, URLImagemSimbolo, URLaudioSimbolo, userId) VALUES ($1, $2, $3, $4, $5, $6, $7)', [idSimbolo, descricaoSimbolo, categoriaSimbolo, tagsSimbolo, URLImagemSimbolo, URLaudioSimbolo, userId]);
    res.status(201).json({ idSimbolo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar símbolo' });
  }
});

// 6. Listar Símbolos
router.get('/simbolo', authMiddleware, async (req, res) => {
  const userId = (req as any).user.id;
  try {
    const { rows } = await db.query('SELECT * FROM Simbolo WHERE userId = $1', [userId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 7. Deletar Símbolo
router.delete('/simbolo/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = (req as any).user.id;
  
  try {
    const result = await db.query('DELETE FROM Simbolo WHERE idSimbolo = $1 AND userId = $2', [id, userId]);
    if (result.rowCount && result.rowCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Símbolo não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 8. Buscar Paciente
router.get('/paciente/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(`
      SELECT u.id, u.nome, u.email, p.grau, p.cores, p.sons
      FROM "User" u
      JOIN Paciente p ON u.id = p.id
      WHERE u.id = $1
    `, [id]);

    const paciente = rows[0];

    if (paciente) {
      res.json(paciente);
    } else {
      res.status(404).json({ error: 'Paciente não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 9. Buscar Medico
router.get('/medico/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  
  try {
    const medicoRes = await db.query(`
      SELECT u.id, u.nome, u.email, m.crm
      FROM "User" u
      JOIN Medico m ON u.id = m.id
      WHERE u.id = $1
    `, [id]);

    const medico = medicoRes.rows[0] as any;

    if (medico) {
      const pacientesRes = await db.query(`
        SELECT u.id, u.nome
        FROM MedicoPaciente mp
        JOIN "User" u ON mp.pacienteId = u.id
        WHERE mp.medicoId = $1
      `, [id]);

      medico.pacientes = pacientesRes.rows;
      res.json(medico);
    } else {
      res.status(404).json({ error: 'Médico não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 10. Assumir Paciente
router.put('/medico/:idMedico/assumir/:idPaciente', authMiddleware, async (req, res) => {
  const { idMedico, idPaciente } = req.params;

  try {
    await db.query('INSERT INTO MedicoPaciente (medicoId, pacienteId) VALUES ($1, $2) ON CONFLICT DO NOTHING', [idMedico, idPaciente]);
    res.status(200).json({ message: 'Paciente vinculado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao vincular paciente' });
  }
});

export default router;
