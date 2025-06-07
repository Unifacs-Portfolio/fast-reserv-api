import type { Garcon } from '../entities/Garcon'

export interface GarconRepository {
	// Está com promessa vazia porque não sabiamos o que retornar || ver DEPOIS
	findById(garcomId: string): Promise<Garcon>
}
