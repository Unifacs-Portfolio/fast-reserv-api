export interface GarconRequest {
	id: string
	nome: string
}
export class Garcon {
	private readonly _id: string
	private readonly _nome: string

	constructor({ id, nome }: GarconRequest) {
		// Outras validações podem ser adicionadas aqui,
		// podem ser criados metodos para isso
		this._id = id
		this._nome = nome
	}

	get id(): string {
		return this._id
	}

	get nome(): string {
		return this._nome
	}
}
