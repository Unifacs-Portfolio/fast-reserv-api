import express from 'express'
import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { configuratedb } from './Datenbank/configdb'
import { env } from './env'
import { atendenteRouter } from './http/controllers/atendente/atendente.route'
import { garcomRouter } from './http/controllers/garcom/garcom.route'
import path from 'node:path'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), 'frontend/public')))

configuratedb()
app.use('/api', atendenteRouter)
app.use('/api', garcomRouter)
app.use(<ErrorRequestHandler>((err, _req, res, next) => {
	if (err instanceof ZodError) {
		res.status(400).json({ message: 'Validação falhou', issues: err.format() })
	}
	if (env.NODE_ENV !== 'production') {
		console.error(err)
	}
	res.status(500).json({ message: 'Erro interno do servidor' })
}))

export { app }
