import type fs from 'fs'
import { prettyPrintJson } from 'pretty-print-json'

declare module './Body' {
  const __fileinfo__: fs.Stats
}

//must rename to avoid duplicate clash
import Body, { __fileinfo__ as info } from './Body'


const renderApp = (root: HTMLElement) => {
  const inf = prettyPrintJson.toHtml(info)
  root.innerHTML = `
  <pre id=account class=json-container>
  <h1>From body</h1>
  ${Body()}
  <h1>Here:</h1>
  ${inf}
  </pre>`
}

renderApp(
  document.getElementById('root')
)
