import { describe, it, expect, afterAll } from 'vitest'
import { setup } from '../../app'
import supertest from 'supertest'
import { checkRouteExists } from '../../utils/checkRouteExists'
import { getConnection } from '../../Datenbank/configdb'

describe('CriarReservaController', async () => {
	afterAll(async () => {
		const connection = getConnection()
		await connection.close()
	})
	const app = await setup()
	it('deve ser possível criar uma reserva', async () => {
		const url = '/api/reservas'
		const response = await supertest(app).post(url).send({
			mesaId: 1,
			nomeResponsavel: 'João Silva',
			data: '2025-07-06',
			hora: '12:00',
			quantidadePessoas: 4,
		})
		expect(checkRouteExists(response, 'POST', url)).toBe(true)
		expect(response.status).toBe(201)
		expect(response.body).toHaveProperty('reserva')
		expect(response.body.reserva).toHaveProperty('id')
	})
})
