import path from 'node:path'
import { tmpdir } from 'node:os'

export function generateDatabasePath(dbPath?: string): string {
	let dbDir: string
	if (dbPath) {
		dbDir = path.dirname(dbPath)
	} else {
		dbDir = tmpdir()
	}
	return path.join(dbDir, `teste-${crypto.randomUUID()}.db`)
}
