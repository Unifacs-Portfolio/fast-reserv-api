import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'
import { CancelarReservaUseCase } from '../CancelarReservaUseCase'

export const makeCancelarReservaUseCase = (): CancelarReservaUseCase => {
	const reservaRepository = new SqliteReservaRepository()
	const cancelarReservaUseCase = new CancelarReservaUseCase(reservaRepository)
	return cancelarReservaUseCase
}
