import type { Reserva } from '../../entities/Reserva'
import type { ReservaRepository } from '../ReservaRepository'

export class InMemoryCriarReservaRepository implements ReservaRepository {
	public reservas: Reserva[] = []

	async create(reserva: Reserva): Promise<Reserva> {
		this.reservas.push(reserva)
		return reserva
	}

	async findByMesaId(mesaId: number): Promise<Reserva | null> {
		const reserva = this.reservas.find((r) => r.mesaId === mesaId)
		return reserva || null
	}

	async delete(mesaId: number): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
