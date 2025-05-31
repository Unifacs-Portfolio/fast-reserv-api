import type { ReservaRepository } from '../ReservaRepository'
import type { Reserva } from '../../entities/Reserva'

export class InMemoryReservaRepository implements ReservaRepository {
	public reservas: Reserva[] = []
	async create(reserva: Reserva): Promise<Reserva> {
		this.reservas.push(reserva)
		return reserva
	}
	async findByMesaId(mesaId: number): Promise<Reserva | null> {
		return this.reservas.find((reserva) => reserva.mesaId === mesaId) || null
	}
	async update(id: string, reserva: Reserva): Promise<Reserva> {
		const index = this.reservas.findIndex((reserva) => reserva.id === id)
		if (index === -1) {
			throw new Error('Reserva not found')
		}
		this.reservas[index] = reserva
		return reserva
	}
	async delete(mesaId: number): Promise<void> {
		this.reservas = this.reservas.filter((reserva) => reserva.mesaId !== mesaId)
	}
}
