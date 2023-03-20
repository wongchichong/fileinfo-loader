import path from 'path'
import fs from 'fs'
import validate from 'schema-utils'
import { Schema } from 'schema-utils/declarations/validate'
import { LoaderContext } from 'webpack'

declare global {
    /** @see https://nodejs.org/api/fs.html#class-fsstats */
    const __fileinfo__: fs.Stats
}

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
        variable: { type: "string", default: '__fileinfo__' },
        /** Call isXXX() and return */
        readis: { type: "boolean", default: false }
    },
}

const slash = (p: string) => p.split(path.sep).join(path.posix.sep)

export default function (this: LoaderContext<{ test: string, public: boolean, variable: string, fullpath: boolean, readis: boolean }>, source: string, map: any, meta: any) {
    const options = this.getOptions()

    const { public: pb, variable, fullpath, readis } = options
    const { resourcePath } = this

    validate(schema, options, {
        name: 'FileInfo Loader',
        baseDataPath: 'options',
    })

    const name = path.basename(resourcePath)
    const relativePath = slash(fullpath ? resourcePath : path.relative(__dirname, resourcePath))

    const s = fs.statSync(resourcePath)

    const adv = readis ? {
        isBlockDevice: s.isBlockDevice(),
        isCharacterDevice: s.isCharacterDevice(),
        isDirectory: s.isDirectory(),
        isFIFO: s.isFIFO(),
        isFile: s.isFile(),
        isSocket: s.isSocket(),
        isSymbolicLink: s.isSymbolicLink(),
    } : {}

    const info = {
        name,
        path: relativePath,
        ...s,
        ...adv,
    }

    return (
        `${pb ? 'export' : ''} const ${variable ?? '__fileinfo__'} = ${JSON.stringify(info)};

${source}
`)
}
