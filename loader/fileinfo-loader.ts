import path from 'path'
import fs from 'fs'
import { validate } from 'schema-utils'
import { Schema } from 'schema-utils/declarations/validate'
import { LoaderContext } from 'webpack'

const schema: Schema = {
    type: 'object',
    properties: {
        test: {
            anyOf: [
                { type: 'array' },
                { type: 'string' },
                { instanceof: 'RegExp' }
            ]
        },
        public: { type: 'boolean', default: false },
        fullpath: { type: 'boolean', default: false },
        variable: { type: "string", default: '__fileinfo__' }
    },
}

export default function (this: LoaderContext<{ test: string, public: boolean, variable: string, fullpath: boolean }>, source: string, map: any, meta: any) {
    const options = this.getOptions()

    const { public: pb, variable, fullpath } = options
    const { resourcePath } = this

    validate(schema, options, {
        name: 'FileInfo Loader',
        baseDataPath: 'options',
    })

    // console.log()
    // console.log('The request path', urlToRequest(this.resourcePath))
    // console.log('The request path', resourcePath)

    const name = path.basename(resourcePath)
    const relativePath = fullpath ? resourcePath : path.relative(__dirname, resourcePath)

    const s = fs.statSync(resourcePath)
    const info = {
        name,
        path: relativePath,
        ...s
    }

    return source + `\n\n${pb ? 'export' : ''} const ${variable ?? '__fileinfo__'} = ${JSON.stringify(info)};`
}

// export default function (content: string) {
//     this.cacheable && this.cacheable()
//     this.value = content

//     var fileInfo = {
//         content: content,
//         path: this.resourcePath
//     }

//     return 'module.exports = ' + JSON.stringify(fileInfo)
// }
// export const seperable = true