import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeAtualizarReservaUseCase } from '../../useCases/factories/makeAtualizarReservaUseCase'

const bodySchema = z.object({
	status: z.string(),
	garcomId: z.string().optional(),
})

export const atualizarReservaController: RequestHandler = async (req, res) => {
	const { status, garcomId } = bodySchema.parse(req.body)
	const id = req.params.id
	const atualizarReservaUseCase = makeAtualizarReservaUseCase()
	const reserva = await atualizarReservaUseCase.execute({
		id,
		status,
		garcomId,
	})
	console.log('Reserva Atualizada')
	res.status(200).json(reserva)
}
