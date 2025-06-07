import { SqliteGarconRepository } from '../../repositories/sqlite/SqliteGarconRepository'
import { SqliteReservaRepository } from '../../repositories/sqlite/SqliteReservaRepository'
import { AtualizarReservaUseCase } from '../AtualizarReservaUseCase'

export const makeAtualizarReservaUseCase = (): AtualizarReservaUseCase => {
	const reservaRepository = new SqliteReservaRepository()
	const garconRepository = new SqliteGarconRepository()
	const atualizarReservaUseCase = new AtualizarReservaUseCase(
		reservaRepository,
		garconRepository,
	)
	return atualizarReservaUseCase
}
