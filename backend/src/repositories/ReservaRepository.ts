import type { Reserva } from '../entities/Reserva'

export interface ReservaRepository {
	findByMesaId(mesaId: number): Promise<Reserva | null>
	create(reserva: Reserva): Promise<Reserva>
	update(id: string, reserva: Reserva): Promise<Reserva>
	delete(mesaId: number): Promise<void>
}
