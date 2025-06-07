import type { ReservaRepository } from '../repositories/ReservaRepository'
import { Reserva } from '../entities/Reserva'

interface CancelarReservaRequest {
	id: string
	mesaId: number
}

export class CancelarReservaUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}

	async execute({ mesaId, id }: CancelarReservaRequest): Promise<void> {
		const reservaEncontrada = await this.reservaRepository.findByMesaId(mesaId)
		if (!reservaEncontrada) {
			throw new Error('Reserva não existe')
		}
		const reservaAtualizada = new Reserva({
			id: reservaEncontrada.id,
			mesaId: reservaEncontrada.mesaId,
			nomeResponsavel: reservaEncontrada.nomeResponsavel,
			data: reservaEncontrada.data,
			hora: reservaEncontrada.hora,
			quantidadePessoas: reservaEncontrada.quantidadePessoas,
			status: 'cancelada',
		})
		await this.reservaRepository.update(id, reservaAtualizada)
	}
}
