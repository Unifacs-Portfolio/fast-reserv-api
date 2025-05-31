import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryReservaRepository } from '../repositories/inMemory/InMemoryReservaRepository'
import { CriarReservaUseCase } from './CriarReservaUseCase'
import { ConfirmarReservaUseCase } from './ConfirmarReservaUseCase'
import type { StatusReserva } from '../entities/Reserva'

describe('ConfirmarReservaUseCase', () => {
	let reservaRepository: InMemoryReservaRepository
	let criarReservaUseCase: CriarReservaUseCase
	let systemUnderTest: ConfirmarReservaUseCase

	beforeEach(() => {
		reservaRepository = new InMemoryReservaRepository()
		criarReservaUseCase = new CriarReservaUseCase(reservaRepository)
		systemUnderTest = new ConfirmarReservaUseCase(reservaRepository)
	})

	it('deve ser possível confirmar uma reserva', async () => {
		const reservaBody = {
			mesaId: 1,
			nomeResponsavel: 'João Silva',
			data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
			hora: '12:00',
			quantidadePessoas: 4,
		}
		const { reserva } = await criarReservaUseCase.execute(reservaBody)
		const { confirmedReserva } = await systemUnderTest.execute({
			id: reserva.id,
		})
		expect(confirmedReserva).toEqual(reserva)
		expect(confirmedReserva.status).toEqual('confirmada' as StatusReserva)
	})
	it('não deve ser possível confirmar uma reserva inválida', async () => {
		await expect(() =>
			systemUnderTest.execute({
				id: crypto.randomUUID(),
			}),
		).rejects.toThrow()
	})
})
