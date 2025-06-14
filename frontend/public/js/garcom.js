// Script para manipulação do Painel do Garçom

// Importa funções do módulo da API
import { atualizarStatusReserva, getGarcons, getReservas } from './api.js'

/**
 * Exibe feedback no painel do Garçom utilizando alertas estilizados
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo do alerta (ex: "alert-success", "alert-danger")
 */
function showWaiterFeedback(message, type) {
	const feedbackDiv = document.getElementById('waiterFeedback')
	feedbackDiv.innerHTML = `<div class="alert ${type}" role="alert">${message}</div>`
}

//  Carrega as reservas pendentes e exibe na tabela
async function loadReservations() {
	try {
		const { reservas } = await getReservas()
		const tbody = document.querySelector('#reservationsTable tbody')
		tbody.innerHTML = ''

		// Filtra apenas reservas pendentes
		const pendingReservations = reservas.filter(
			(r) => r.status === 'aguardando',
		)

		for (const pendingReservation of pendingReservations) {
			const tr = document.createElement('tr')
			tr.innerHTML = `
					<td>${pendingReservation.data}</td>
					<td>${pendingReservation.hora}</td>
					<td>${pendingReservation.mesaId}</td>
					<td>${pendingReservation.quantidadePessoas}</td>
					<td>${pendingReservation.nomeResponsavel}</td>
					<td>
						<select class="form-select form-select-sm garcom-select">
							<option value="" hidden>Selecione</option>
						</select>
					</td>
					<td>
						<button class="btn btn-success btn-sm" data-id="${pendingReservation.id}">
							Confirmar
						</button>
					</td>
				`
			tbody.appendChild(tr)
		}

		await populateGarcomOptions()
	} catch (error) {
		console.error('Erro ao carregar reservas:', error)
		showWaiterFeedback(
			'Erro ao carregar reservas. Tente novamente.',
			'alert-danger',
		)
	}
}

// lista de garçons disponíveis
async function populateGarcomOptions() {
	try {
		const { garcons } = await getGarcons()
		const selects = document.querySelectorAll('select.form-select')

		for (const select of selects) {
			for (const garcom of garcons) {
				const option = document.createElement('option')
				option.value = garcom.id
				option.textContent = garcom.nome
				select.appendChild(option)
			}
		}
	} catch (error) {
		console.error('Erro ao carregar garçons:', error)
		showWaiterFeedback('Erro ao carregar lista de garçons.', 'alert-danger')
	}
}

//Manipula cliques no tbody para confirmar reserva
document
	.querySelector('#reservationsTable tbody')
	.addEventListener('click', async (e) => {
		if (e.target.tagName.toLowerCase() === 'button') {
			const reservationId = e.target.getAttribute('data-id')
			const tr = e.target.closest('tr')

			const selectedGarcom = tr.querySelector('select').value
			if (!selectedGarcom) {
				showWaiterFeedback(
					'Selecione um garçom responsável antes de confirmar.',
					'alert-danger',
				)
				return
			}

			try {
				await atualizarStatusReserva(
					reservationId,
					'confirmada',
					selectedGarcom,
				)
				await loadReservations()
				showWaiterFeedback(
					'Reserva confirmada com sucesso pelo garçom selecionado.',
					'alert-info',
				)
			} catch (error) {
				console.error('Erro ao confirmar reserva:', error)
				showWaiterFeedback(
					'Erro ao confirmar reserva. Tente novamente.',
					'alert-danger',
				)
			}
		}
	})

// Carrega as reservas ao inicializar
await loadReservations()
