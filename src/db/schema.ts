import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const apartments = sqliteTable('apartments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  agencyId: text('agencyId').notNull().default(''),
  hash: text('hash').notNull().unique(),
  ref: text('ref').notNull().default(''),
  title: text('title').notNull().default(''),
  price: text('price').notNull().default(''),
  desc: text('desc').notNull().default(''),
  sqm: text('sqm').notNull().default(''),
  rooms: text('rooms').notNull().default(''),
  url: text('url').notNull().default(''),
  img: text('img').notNull().default(''),
  createdAt: text('createdAt').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updatedAt').notNull().default(sql`(datetime('now'))`),
})
