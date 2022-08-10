import type fs from 'fs'
import { prettyPrintJson } from 'pretty-print-json'
import type { } from '../loader/fileinfo-loader'

declare module './Body' {
  const __fileinfo__: fs.Stats
}

//must rename to avoid duplicate clash
import Body, { __fileinfo__ as info } from './Body'


const renderApp = (root: HTMLElement) => {
  const index = prettyPrintJson.toHtml(__fileinfo__)
  const inf = prettyPrintJson.toHtml(info)
  root.innerHTML = `
  <pre id=account class=json-container>
    <h1>index.ts</h1>
  ${index}
  <h1>body.ts</h1>
  ${Body()}
  <h1>body.ts (imported __fileinfo__) </h1>
  ${inf}
  </pre>`
}

renderApp(
  document.getElementById('root')
)
