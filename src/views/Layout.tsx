import type { Child } from 'hono/jsx'

export function Layout({ title, children }: { title: string; children: Child }) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/stylesheets/style.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
