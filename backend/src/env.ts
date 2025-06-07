import 'dotenv/config'
import { z } from 'zod'
import { generateDatabasePath } from './utils/generateDatabasePath'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']),
	PORT: z.coerce.number().default(3000),
	PATH_TO_DB: z.string(),
	GARCOM_ID_RANDOM: z.string().uuid().optional(),
})

const { success, data, error } = envSchema.safeParse(process.env)

if (!success) {
	console.error('Invalid environment variables:', error.format())
	throw new Error('Invalid environment variables')
}
if (data.NODE_ENV === 'test') {
	data.PATH_TO_DB = generateDatabasePath()
}

export const env = data
