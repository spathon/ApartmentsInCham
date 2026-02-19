import { Layout } from './Layout.js'

export function ErrorPage({ message, status, stack }: { message: string; status: number; stack?: string }) {
  return (
    <Layout title="Error">
      <h1>{message}</h1>
      <h2>{status}</h2>
      {stack && <pre>{stack}</pre>}
    </Layout>
  )
}
