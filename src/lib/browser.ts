import type { PlaywrightPage } from '../types/scraper.js'

interface Browser {
  newPage(): Promise<PlaywrightPage>
  close(): Promise<void>
}

let browser: Browser | null = null

export async function getBrowser(): Promise<Browser> {
  if (!browser) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pw = await (Function('return import("playwright-chromium")')() as Promise<{ chromium: { launch(): Promise<Browser> } }>)
    browser = await pw.chromium.launch()
  }
  return browser
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close()
    browser = null
  }
}
