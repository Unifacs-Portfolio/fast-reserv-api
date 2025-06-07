// regras de dominio
/**
 * Restrições e comportamentos inerentes ao modelo do
 * Exemplo: quantidade de pessoas não pode ser não positivo
 * (uma regra que garante integridade da entidade Reserva)
 */

export type StatusReserva = 'aguardando' | 'confirmada' | 'cancelada'

export interface ReservaRequest {
	id: string
	mesaId: number
	nomeResponsavel: string
	data: string
	hora: string
	quantidadePessoas: number
	status?: StatusReserva
	verify_by?: string | null
}
export class Reserva {
	private readonly _id: string
	private readonly _mesaId: number
	private _nomeResponsavel: string
	private _data: string
	private _hora: string
	private _quantidadePessoas: number
	private _status: StatusReserva = 'aguardando'
	private _verify_by: string | null = null

	constructor({
		id,
		mesaId,
		nomeResponsavel,
		data,
		hora,
		quantidadePessoas,
		status,
		verify_by,
	}: ReservaRequest) {
		if (quantidadePessoas <= 0) {
			throw new Error('Quantidade de pessoas deve ser maior que zero')
		}

		if (status) {
			this._status = status
		}
		if (verify_by !== undefined) {
			this._verify_by = verify_by
		}
		// Outras validações podem ser adicionadas aqui,
		// podem ser criados metodos para isso
		this._id = id
		this._mesaId = this.validateMesaId(mesaId)
		this._nomeResponsavel = this.validateNome(nomeResponsavel)
		this._data = this.validateData(data)
		this._hora = this.validateHora(hora)
		this._quantidadePessoas = this.validateQuantidadePessoas(quantidadePessoas)
		this._verify_by = verify_by ?? null
	}

	private validateMesaId(mesaId: number): number {
		if (mesaId > 0 && Number.isInteger(mesaId)) {
			return mesaId
		}
		throw new Error('Numero de Mesa invalido!')
	}

	private validateData(data: string): string {
		const regex = /^\d{4}-\d{2}-\d{2}$/
		if (!regex.test(data)) {
			throw new Error('Data inválida. O formato deve ser AAAA-MM-DD')
		}
		return data
	}

	private validateHora(hora: string): string {
		const regex = /^\d{2}:\d{2}$/
		const horasString = hora.split(':')
		const horasNumber = horasString.map(Number)

		if (horasNumber[0] > 23 || horasNumber[1] > 59) {
			throw new Error('Hora inválida, o horário máximo é 23:59')
		}

		if (!regex.test(hora)) {
			throw new Error('Hora invalidada, o formato deve ser HH:MM')
		}

		return hora
	}

	private validateQuantidadePessoas(quantidadePessoas: number): number {
		if (quantidadePessoas <= 0) {
			throw new Error('Quantidade de pessoas invalidas.')
		}

		if (!Number.isInteger(quantidadePessoas)) {
			throw new Error('Nao pode numeros decimais.')
		}
		return quantidadePessoas
	}

	private validateNome(nomeResponsavel: string): string {
		const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ'\-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'\-]+)*$/
		if (!regex.test(nomeResponsavel)) {
			throw new Error(
				'Nao pode colocar numeros ou caracteres especiais em nomes.',
			)
		}
		return nomeResponsavel
	}

	get id(): string {
		return this._id
	}

	get mesaId(): number {
		return this._mesaId
	}

	get nomeResponsavel(): string {
		return this._nomeResponsavel
	}

	get data(): string {
		return this._data
	}

	get hora(): string {
		return this._hora
	}

	get quantidadePessoas(): number {
		return this._quantidadePessoas
	}

	get status(): StatusReserva {
		return this._status
	}
	get verify_by(): string | null {
		return this._verify_by
	}
}
