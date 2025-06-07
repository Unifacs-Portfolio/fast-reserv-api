import { Reserva, type StatusReserva } from '../entities/Reserva'
import type { GarconRepository } from '../repositories/GarconRepository'
import type { ReservaRepository } from '../repositories/ReservaRepository'

interface AtualizarReservaRequest {
	id: string
	status: string
	garcomId?: string
}

interface AtualizarReservaResponse {
	reserva: {
		id: string
		mesaId: number
		nomeResponsavel: string
		data: string
		hora: string
		quantidadePessoas: number
		status: StatusReserva
		verify_by: string
	}
}

export class AtualizarReservaUseCase {
	private reservaRepository: ReservaRepository
	private garconRepository: GarconRepository

	constructor(
		reservaRepository: ReservaRepository,
		garconRepository: GarconRepository,
	) {
		this.reservaRepository = reservaRepository
		this.garconRepository = garconRepository
	}

	async execute({
		id,
		status,
		garcomId,
	}: AtualizarReservaRequest): Promise<AtualizarReservaResponse> {
		const reservaEncontrada = await this.reservaRepository.findById(id)
		let verify_by: string | undefined = 'Sistema'

		if (!reservaEncontrada) {
			throw new Error('Reserva não existe')
		}
		if (
			reservaEncontrada.status === 'cancelada' ||
			reservaEncontrada.status === 'confirmada'
		) {
			throw new Error('Reserva Indisponivel para mudança de status')
		}

		if (status === 'cancelada') {
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
			return {
				reserva: {
					id: reservaEncontrada.id,
					mesaId: reservaEncontrada.mesaId,
					nomeResponsavel: reservaEncontrada.nomeResponsavel,
					data: reservaEncontrada.data,
					hora: reservaEncontrada.hora,
					quantidadePessoas: reservaEncontrada.quantidadePessoas,
					status: reservaAtualizada.status,
					verify_by,
				},
			}
		}
		if (!garcomId) {
			throw new Error('Garçom não informada')
		}
		if (status === 'confirmada' && !garcomId) {
			throw new Error('Garçom é obrigatório para confirmar reserva')
		}
		console.log(garcomId)

		const garcomEncontrado = await this.garconRepository.findById(garcomId)
		console.log(garcomEncontrado)

		if (!garcomEncontrado) {
			throw new Error('Garçom não existe na tabela')
		}
		verify_by = garcomEncontrado.nome

		if (status === 'confirmada') {
			const reservaAtualizada = new Reserva({
				id: reservaEncontrada.id,
				mesaId: reservaEncontrada.mesaId,
				nomeResponsavel: reservaEncontrada.nomeResponsavel,
				data: reservaEncontrada.data,
				hora: reservaEncontrada.hora,
				quantidadePessoas: reservaEncontrada.quantidadePessoas,
				status: 'confirmada',
			})
			await this.reservaRepository.update(id, reservaAtualizada)
			return {
				reserva: {
					id: reservaAtualizada.id,
					mesaId: reservaAtualizada.mesaId,
					nomeResponsavel: reservaAtualizada.nomeResponsavel,
					data: reservaAtualizada.data,
					hora: reservaAtualizada.hora,
					quantidadePessoas: reservaAtualizada.quantidadePessoas,
					status: reservaAtualizada.status,
					verify_by: garcomId,
				},
			}
		}
		throw new Error('Status inválido para atualização da reserva')
	}
}
