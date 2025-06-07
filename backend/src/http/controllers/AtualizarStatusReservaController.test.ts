import supertest from 'supertest'
import { afterAll, describe, expect, it } from 'vitest'
import { setup } from '../../app'
import { env } from '../../env'
import { checkRouteExists } from '../../utils/checkRouteExists'
import { getConnection } from '../../Datenbank/configdb'

describe('AtualizarStatusReservaController', async () => {
	const app = await setup()
	afterAll(async () => {
		const connection = getConnection()
		await connection.close()
	})
	it('deve ser possível confirmar uma reserva', async () => {
		const newReserva = await supertest(app).post('/api/reservas').send({
			mesaId: 1,
			nomeResponsavel: 'João Silva',
			data: '2025-07-06',
			hora: '12:00',
			quantidadePessoas: 4,
		})
		const url = `/api/reservas/${newReserva.body.reserva.id}`
		if (!env.GARCOM_ID_RANDOM) {
			throw new Error('GARCOM_ID_RANDOM não está definido.')
		}
		const response = await supertest(app).patch(url).send({
			garcomId: env.GARCOM_ID_RANDOM,
			status: 'confirmada',
		})
		expect(checkRouteExists(response, 'PATCH', url)).toBe(true)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('reserva')
		expect(response.body.reserva).toHaveProperty('id')
		expect(response.body.reserva).toHaveProperty(
			'verify_by',
			env.GARCOM_ID_RANDOM,
		)
		expect(response.body.reserva).toHaveProperty('status', 'confirmada')
	})
	it('deve ser possível cancelar uma reserva', async () => {
		const newReserva = await supertest(app).post('/api/reservas').send({
			mesaId: 2,
			nomeResponsavel: 'John Doe',
			data: '2025-07-06',
			hora: '13:00',
			quantidadePessoas: 4,
		})
		const url = `/api/reservas/${newReserva.body.reserva.id}`
		const response = await supertest(app).patch(url).send({
			status: 'cancelada',
		})
		expect(checkRouteExists(response, 'PATCH', url)).toBe(true)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('reserva')
		expect(response.body.reserva).toHaveProperty('id')
		expect(response.body.reserva).toHaveProperty('status', 'cancelada')
	})
})
