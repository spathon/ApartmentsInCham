import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import routes from './routes/index.js'
import { ErrorPage } from './views/Error.js'

const app = new Hono()

app.use('/stylesheets/*', serveStatic({ root: './public' }))
app.use('/images/*', serveStatic({ root: './public' }))
app.use('/favicon.ico', serveStatic({ root: './public' }))

app.route('/', routes)

app.notFound((c) => {
  return c.html(<ErrorPage message="Not Found" status={404} />, 404)
})

app.onError((err, c) => {
  console.error(err)
  return c.html(
    <ErrorPage message={err.message} status={500} stack={err.stack} />,
    500,
  )
})

export default app
