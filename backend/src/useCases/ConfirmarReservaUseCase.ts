import { Reserva } from '../entities/Reserva'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface ConfirmarReservaRequest {
	id: string
	verify_by: string
}
export class ConfirmarUseCase {
	private reservaRepository: ReservaRepository

	constructor(reservaRepository: ReservaRepository) {
		this.reservaRepository = reservaRepository
	}

	async execute({ id, verify_by }: ConfirmarReservaRequest): Promise<Reserva> {
		const reservaEncontrada = await this.reservaRepository.findById(id)

		if (!reservaEncontrada) {
			throw new Error('Reserva não Encontrada')
		}
		const reservaAtualizada = new Reserva({
			id: reservaEncontrada.id,
			mesaId: reservaEncontrada.mesaId,
			nomeResponsavel: reservaEncontrada.nomeResponsavel,
			data: reservaEncontrada.data,
			hora: reservaEncontrada.hora,
			quantidadePessoas: reservaEncontrada.quantidadePessoas,
			status: 'confirmada',
			verify_by: verify_by, // sobrescre
		})

		return await this.reservaRepository.update(id, reservaAtualizada)
	}
}
