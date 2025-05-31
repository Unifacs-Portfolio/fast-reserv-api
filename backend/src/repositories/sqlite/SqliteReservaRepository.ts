import { Database } from 'sqlite3'
import type { Reserva, StatusReserva } from '../../entities/Reserva'
import { env } from '../../env'
import type { ReservaRepository } from '../ReservaRepository'

export class SqliteReservaRepository implements ReservaRepository {
	private db: Database
	constructor() {
		this.db = new Database(env.PATH_TO_DB, (err) => {
			if (err) {
				throw new Error(`Erro ao conectar ao banco de dados: ${err.message}`)
			}
		})
	}
	async create(reserva: Reserva): Promise<Reserva> {
		return new Promise<Reserva>((resolve, reject) => {
			this.db.run(
				'INSERT INTO Reserva (id, mesaId, nomeResponsavel, data, hora, quantidadePessoas, status, verify_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
				[
					reserva.id,
					reserva.mesaId,
					reserva.nomeResponsavel,
					reserva.data,
					reserva.hora,
					reserva.quantidadePessoas,
					reserva.status,
					reserva.verifyBy,
				],
				(err: Error | null) => {
					if (err) {
						reject(new Error(`Erro ao criar reserva: ${err.message}`))
					} else {
						resolve(reserva)
					}
				},
			)
		})
	}

	async findByMesaId(mesaId: number): Promise<Reserva | null> {
		return new Promise((resolve, reject) => {
			this.db.get(
				'SELECT * FROM Reserva WHERE mesaId = ?',
				[mesaId],
				(err, row: Reserva | null) => {
					if (err) {
						reject(new Error(`Erro ao buscar reserva: ${err.message}`))
					} else {
						resolve(row)
					}
				},
			)
		})
	}

	async delete(mesaId: number): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(
				'DELETE FROM Reserva WHERE mesaId = ?',
				[mesaId],
				(err: Error | null) => {
					if (err) {
						reject(new Error(`Erro ao deletar reserva: ${err.message}`))
					} else {
						console.log('Reserva Deletada')
						resolve()
					}
				},
			)
		})
	}
	async findById(id: string): Promise<Reserva | null> {
		return new Promise((resolve, reject) => {
			this.db.get(
				'SELECT * FROM Reserva WHERE Id = ?',
				[id],
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(err, row: any) => {
					if (err) {
						reject(new Error(`Erro ao buscar reserva: ${err.message}`))
					} else {
						console.log('Reserva Atualizada')
						resolve(row)
					}
				},
			)
		})
	}
	async update(id: string, status: StatusReserva): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(
				'UPDATE Reserva SET status = ? WHERE id = ?',
				[status, id],
				(err) => {
					if (err) {
						reject(
							new Error(`Erro ao atualizar status da reserva: ${err.message}`),
						)
					} else {
						resolve()
					}
				},
			)
		})
	}

	async verifyBy(verify_By: string, id: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(
				'UPDATE Reserva SET verify_by = ? WHERE id = ?',
				[verify_By, id],
				(err) => {
					if (err) {
						reject(
							new Error(
								`Erro ao atualizar quem verificou a reserva: ${err.message}`,
							),
						)
					} else {
						resolve()
					}
				},
			)
		})
	}
	async updateByStatus(mesaId: number, status: StatusReserva): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(
				'UPDATE Reserva SET status = ? WHERE mesaId = ?',
				[status, mesaId],
				(err) => {
					if (err) {
						reject(
							new Error(`Erro ao atualizar status da reserva: ${err.message}`),
						)
					} else {
						resolve()
					}
				},
			)
		})
	}
}
