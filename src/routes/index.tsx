import { Hono } from 'hono'
import { desc } from 'drizzle-orm'
import { format } from 'date-fns'
import { db, schema } from '../db/index.js'
import { ApartmentList } from '../views/ApartmentList.js'

const routes = new Hono()

routes.get('/', (c) => {
  const result = db
    .select()
    .from(schema.apartments)
    .orderBy(desc(schema.apartments.createdAt))
    .all()

  const apartments = result.map((row) => ({
    ...row,
    createdAt: format(new Date(row.createdAt), 'd MMMM yyyy - HH:mm'),
  }))

  return c.html(<ApartmentList apartments={apartments} />)
})

export default routes
