import { open, type Database } from 'sqlite'
import sqlite3 from 'sqlite3'
import { env } from '../env'

let db: Database
async function initDb() {
	db = await open({
		filename: env.PATH_TO_DB,
		driver: sqlite3.Database,
	})
	return db
}

export function getConnection() {
	if (!db) {
		throw new Error('Banco de dados não foi inicializado')
	}
	return db
}

// Criação de tabelas
export async function createTableMesa() {
	await getConnection().exec(
		'CREATE TABLE IF NOT EXISTS Mesa (id INTEGER PRIMARY KEY, status TEXT)',
	)
}

export async function createTableReserva() {
	await getConnection().exec(
		'CREATE TABLE IF NOT EXISTS Reserva (id TEXT PRIMARY KEY NOT NULL , mesaId INTEGER,nomeResponsavel TEXT UNIQUE, quantidadePessoas INTEGER, data TEXT, hora TEXT, verify_by TEXT,status TEXT,FOREIGN KEY (mesaId) REFERENCES Mesa(id), FOREIGN KEY(verify_by) REFERENCES Garcon(nome))',
	)
}

export async function createTableGarcon() {
	await getConnection().exec(
		'CREATE TABLE IF NOT EXISTS Garcon (id TEXT PRIMARY KEY NOT NULL, nome TEXT UNIQUE)',
	)
}

export async function insertGarconTest() {
	if (!env.GARCOM_ID_RANDOM) {
		throw new Error('GARCOM_ID_RANDOM não está definido no ambiente de teste.')
	}
	await getConnection().run(
		'INSERT OR IGNORE INTO Garcon (id, nome) VALUES (? , ?)',
		[env.GARCOM_ID_RANDOM, 'Marcilio'],
	)
}

// Executar a tabela e banco
export async function configuratedb() {
	await initDb()
	await createTableGarcon()
	await createTableMesa()
	await createTableReserva()
	if (env.NODE_ENV === 'test') {
		await insertGarconTest()
	}
}
