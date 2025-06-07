import type { ReservaRepository } from '../ReservaRepository'
import type { Reserva } from '../../entities/Reserva'

export class InMemoryReservaRepository implements ReservaRepository {
	update(id: string, reserva: Reserva): Promise<Reserva> {
		throw new Error('Method not implemented.')
	}
	async findById(id: string): Promise<Reserva | null> {
		return this.reservas.find((reserva) => reserva.id === id) || null
	}
	public reservas: Reserva[] = []
	async create(reserva: Reserva): Promise<Reserva> {
		this.reservas.push(reserva)
		return reserva
	}
	async findByMesaId(mesaId: number): Promise<Reserva | null> {
		return this.reservas.find((reserva) => reserva.mesaId === mesaId) || null
	}
}
