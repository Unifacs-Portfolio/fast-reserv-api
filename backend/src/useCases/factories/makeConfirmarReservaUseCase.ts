import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'
import { ConfirmarUseCase } from '../ConfirmarReservaUseCase'

export const makeConfirmarReservaUseCase = (): ConfirmarUseCase => {
	const reservaRepository = new SqliteReservaRepository()
	const confirmarReservaUseCase = new ConfirmarUseCase(reservaRepository)
	return confirmarReservaUseCase
}
