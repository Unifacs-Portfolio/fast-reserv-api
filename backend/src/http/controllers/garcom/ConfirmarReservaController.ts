import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeConfirmarReservaUseCase } from '../../../useCases/factories/makeConfirmarReservaUseCase'

const bodySchema = z.object({
	verify_by: z.string(),
})

export const confirmarReservaController: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { verify_by } = bodySchema.parse(req.body)
	try {
		const id = req.params.id
		const confirmarReservaUseCase = makeConfirmarReservaUseCase()
		await confirmarReservaUseCase.execute({ id, verify_by })
		console.log('Reserva Confirmada')

		res.status(204).send()
	} catch (error) {
		if (error instanceof Error && error.message === 'Reserva não Encontrada') {
			res.status(404).json({ message: error.message })
		}
		next(error)
	}
}
