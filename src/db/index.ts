import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema.js'
import path from 'node:path'

const dbPath = path.join(import.meta.dirname, '../../db.sqlite')
const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')

export const db = drizzle(sqlite, { schema })
export { schema }
