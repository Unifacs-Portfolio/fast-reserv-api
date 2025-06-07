export type StatusMesa = 'Disponivel' | 'Ocupada'

export interface MesaRequest {
	mesaId: number
	status?: StatusMesa
}

export class Mesa {
	private readonly _mesaId: number
	private _status: StatusMesa = 'Disponivel'

	constructor({ mesaId, status }: MesaRequest) {
		this._mesaId = mesaId

		if (status) {
			this._status = status
		}
	}

	get mesaId(): number {
		return this._mesaId
	}

	get status(): StatusMesa {
		return this._status
	}
}
