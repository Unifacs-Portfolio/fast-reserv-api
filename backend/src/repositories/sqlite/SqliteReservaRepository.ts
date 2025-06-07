import type { Database } from 'sqlite'
import { Reserva } from '../../entities/Reserva'
import { isReserva } from '../../utils/isReserva'
import type { ReservaRepository } from '../ReservaRepository'
import { getConnection } from '../../Datenbank/configdb'

export class SqliteReservaRepository implements ReservaRepository {
	private db: Database
	constructor() {
		this.db = getConnection()
	}
	async create(reserva: Reserva): Promise<Reserva> {
		await this.db.run(
			'INSERT INTO Reserva (id, mesaId, nomeResponsavel, data, hora, quantidadePessoas, status, verify_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
			[
				reserva.id,
				reserva.mesaId,
				reserva.nomeResponsavel,
				reserva.data,
				reserva.hora,
				reserva.quantidadePessoas,
				reserva.status,
				reserva.verify_by,
			],
		)
		const reservaCriada = await this.db.get(
			'SELECT * FROM Reserva WHERE id = ?',
			[reserva.id],
		)
		if (!reservaCriada) {
			throw new Error('Reserva criada, mas não encontrada.')
		}
		if (isReserva(reservaCriada)) {
			return new Reserva({
				id: reservaCriada.id,
				mesaId: reservaCriada.mesaId,
				nomeResponsavel: reservaCriada.nomeResponsavel,
				data: reservaCriada.data,
				hora: reservaCriada.hora,
				quantidadePessoas: reservaCriada.quantidadePessoas,
				status: reservaCriada.status,
				verify_by: reservaCriada.verify_by,
			})
		}
		throw new Error('Dados da reserva inválidos.')
	}

	async findByMesaId(mesaId: number): Promise<Reserva | null> {
		const reserva = await this.db.get(
			'SELECT * FROM Reserva WHERE mesaId = ?',
			[mesaId],
		)
		if (!reserva) {
			return null
		}
		if (isReserva(reserva)) {
			return new Reserva({
				id: reserva.id,
				mesaId: reserva.mesaId,
				nomeResponsavel: reserva.nomeResponsavel,
				data: reserva.data,
				hora: reserva.hora,
				quantidadePessoas: reserva.quantidadePessoas,
				status: reserva.status,
				verify_by: reserva.verify_by,
			})
		}
		throw new Error('Dados da reserva inválidos.')
	}

	async findById(id: string): Promise<Reserva | null> {
		const reserva = await this.db.get('SELECT * FROM Reserva WHERE Id = ?', [
			id,
		])
		if (!reserva) {
			return null
		}
		if (isReserva(reserva)) {
			return new Reserva({
				id: reserva.id,
				mesaId: reserva.mesaId,
				nomeResponsavel: reserva.nomeResponsavel,
				data: reserva.data,
				hora: reserva.hora,
				quantidadePessoas: reserva.quantidadePessoas,
				status: reserva.status,
				verify_by: reserva.verify_by,
			})
		}
		throw new Error('Dados da reserva inválidos.')
	}

	async update(id: string, reserva: Reserva): Promise<Reserva> {
		const updates: string[] = []
		const values: (string | null)[] = []

		if (reserva.status !== undefined) {
			updates.push('status = ?')
			values.push(reserva.status)
		}

		if (reserva.verify_by !== undefined) {
			updates.push('verify_by = ?')
			values.push(reserva.verify_by)
		}

		if (updates.length === 0) {
			throw new Error('Nenhum campo fornecido para atualização.')
		}

		values.push(id) // id da reserva

		const sql = `UPDATE Reserva SET ${updates.join(', ')} WHERE id = ?`

		const reservaResultado = await this.db.run(sql, values)
		if (reservaResultado.changes === 0) {
			throw new Error(
				'Erro ao atualizar reserva. Verifique se a reserva existe.',
			)
		}
		if (reservaResultado.changes === 0) {
			throw new Error(
				'Erro ao atualizar reserva. Verifique se a reserva existe.',
			)
		}
		const reservaAtualizada = await this.findById(id)
		if (isReserva(reservaAtualizada)) {
			return new Reserva({
				id: reservaAtualizada.id,
				mesaId: reservaAtualizada.mesaId,
				nomeResponsavel: reservaAtualizada.nomeResponsavel,
				data: reservaAtualizada.data,
				hora: reservaAtualizada.hora,
				quantidadePessoas: reservaAtualizada.quantidadePessoas,
				status: reservaAtualizada.status,
				verify_by: reservaAtualizada.verify_by,
			})
		}
		console.error('Erro ao atualizar reserva:', reservaAtualizada)
		throw new Error('Dados da reserva inválidos.')
	}
}
