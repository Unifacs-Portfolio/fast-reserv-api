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

	async execute({ id, verify_by }: ConfirmarReservaRequest): Promise<void> {
		const reservaEncontrada = await this.reservaRepository.findById(id)
		if (!reservaEncontrada) {
			throw new Error('Reserva não Encontrada')
		}

		const reservaConfirmada = new Reserva({
			id: reservaEncontrada.id,
			mesaId: reservaEncontrada.mesaId,
			nomeResponsavel: reservaEncontrada.nomeResponsavel,
			data: reservaEncontrada.data,
			hora: reservaEncontrada.hora,
			quantidadePessoas: reservaEncontrada.quantidadePessoas,
			verify_by: verify_by,
			status: 'confirmada', // sobrescreve o status
		})

		await this.reservaRepository.update(
			reservaConfirmada.id,
			reservaConfirmada.status,
		)

		await this.reservaRepository.verifyBy(verify_by, reservaConfirmada.id)
	}
}
