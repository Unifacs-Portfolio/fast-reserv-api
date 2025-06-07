import { Router } from 'express'
import { criarReservaController } from '../controllers/CriarReservaController'
import { atualizarReservaController } from './AtualizarReservaController'

const router = Router()

router.post('/reservas', criarReservaController)
router.patch('/reservas/:id', atualizarReservaController)

export { router as reservasRouter }
