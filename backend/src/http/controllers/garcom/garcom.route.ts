import { Router } from 'express'
import { confirmarReservaController } from './ConfirmarReservaController'

const router = Router()
router.patch('/reserva/:id', confirmarReservaController)

export { router as garcomRouter }
