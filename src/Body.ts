import { prettyPrintJson } from 'pretty-print-json'

declare const __fileinfo__: string

export default (): string => {
    return prettyPrintJson.toHtml(__fileinfo__)
}
