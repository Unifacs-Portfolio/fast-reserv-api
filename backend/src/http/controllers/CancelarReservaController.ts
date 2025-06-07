import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeCancelarReservaUseCase } from '../../useCases/factories/makeCancelarReservaUseCase'

const bodySchema = z.object({
	mesaId: z.number(),
})

export const cancelarReservaController: RequestHandler = async (req, res) => {
	const { mesaId } = bodySchema.parse(req.body)
	const id = req.params.id
	const cancelarReservaUseCase = makeCancelarReservaUseCase()
	await cancelarReservaUseCase.execute({ id, mesaId })

	await cancelarReservaUseCase.execute({
		mesaId,
		id,
	})
	res.status(204).json()
}
