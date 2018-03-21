import faker from 'faker'
import puppeteer from 'puppeteer'

const appUrlBase = 'http://localhost:8080'

let browser
let page
beforeAll(async () => {
  browser = await puppeteer.launch(
    process.env.DEBUG
      ? {
        headless: false,
        slowMo: 100,
      }
      : {}
  )
  page = await browser.newPage()
})

describe('home', () => {
  test('shows greeting', async () => {
    await page.goto(appUrlBase)
    const greeting = await page.waitFor('[data-testid="greeting"]')
    const text = await greeting.getProperty('innerHTML')
    const value = await text.jsonValue()
    expect(value).not.toBe('')
  })
})

afterAll(() => {
  if (!process.env.DEBUG) {
    browser.close()
  }
})
