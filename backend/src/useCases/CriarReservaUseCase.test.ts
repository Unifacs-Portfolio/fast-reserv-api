import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCriarReservaRepository } from '../repositories/inMemory/InMemoryCriarReservaRepository'
import { CriarReservaUseCase } from './CriarReservaUseCase'

describe('CriarReservaUseCase', () => {
	let reservaRepository: InMemoryCriarReservaRepository
	let systemUnderTest: CriarReservaUseCase
	beforeEach(() => {
		reservaRepository = new InMemoryCriarReservaRepository()
		systemUnderTest = new CriarReservaUseCase(reservaRepository)
	})
	it('deve ser possível criar uma reserva', async () => {
		const reservaBody = {
			mesaId: 1,
			nomeResponsavel: 'João Silva',
			data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
			hora: '12:00',
			quantidadePessoas: 4,
		}
		const { reserva } = await systemUnderTest.execute(reservaBody)
		expect(reservaRepository.reservas).toHaveLength(1)
		expect(reserva.id).toEqual(expect.any(String))
		expect(reserva.mesaId).toEqual(reservaBody.mesaId)
		expect(reserva.nomeResponsavel).toEqual(reservaBody.nomeResponsavel)
		expect(reserva.data).toEqual(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/))
		expect(reserva.hora).toEqual(reservaBody.hora)
		expect(reserva.quantidadePessoas).toEqual(reservaBody.quantidadePessoas)
	})
	it('não deve permitir criar uma reserva com data inválida', async () => {
		const reservaBody = {
			mesaId: 1,
			nomeResponsavel: 'João Silva',
			data: '2023-02-30', // Data inválida
			hora: '12:00',
			quantidadePessoas: 4,
		}
		await expect(systemUnderTest.execute(reservaBody)).rejects.toThrow()
	})
	it('não deve permitir criar uma reserva com hora inválida', async () => {
		const reservaBody = {
			mesaId: 1,
			nomeResponsavel: 'João Silva',
			data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
			hora: '25:00', // Hora inválida
			quantidadePessoas: 4,
		}
		await expect(systemUnderTest.execute(reservaBody)).rejects.toThrow()
	})
	it('não deve permitir criar uma reserva com quantidade de pessoas inválida', async () => {
		const reservaBody = {
			mesaId: 1,
			nomeResponsavel: 'João Silva',
			data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
			hora: '12:00',
			quantidadePessoas: 0, // Quantidade de pessoas inválida
		}
		await expect(systemUnderTest.execute(reservaBody)).rejects.toThrow()
	})
	it('não deve permitir criar uma reserva com mesaId inválido', async () => {
		const reservaBody = {
			mesaId: -1, // Mesa ID inválido
			nomeResponsavel: 'João Silva',
			data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
			hora: '12:00',
			quantidadePessoas: 4,
		}
		await expect(systemUnderTest.execute(reservaBody)).rejects.toThrow()
	})
	it('não deve permitir criar uma reserva com nomeResponsavel vazio', async () => {
		const reservaBody = {
			mesaId: 1,
			nomeResponsavel: '', // Nome do responsável vazio
			data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
			hora: '12:00',
			quantidadePessoas: 4,
		}
		await expect(systemUnderTest.execute(reservaBody)).rejects.toThrow()
	})
})
