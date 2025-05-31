import type { Reserva, StatusReserva } from '../entities/Reserva'

export interface ReservaRepository {
	create(reserva: Reserva): Promise<Reserva>
	findByMesaId(mesaId: number): Promise<Reserva | null>
	delete(mesaId: number): Promise<void>
	findById(id: string): Promise<Reserva | null>
	update(id: string, status: StatusReserva): Promise<void>
	verifyBy(verify_by: string, id: string): Promise<void>
}
