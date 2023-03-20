"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const schema_utils_1 = __importDefault(require("schema-utils"));
const schema = {
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
};
const slash = (p) => p.split(path_1.default.sep).join(path_1.default.posix.sep);
function default_1(source, map, meta) {
    const options = this.getOptions();
    const { public: pb, variable, fullpath, readis } = options;
    const { resourcePath } = this;
    (0, schema_utils_1.default)(schema, options, {
        name: 'FileInfo Loader',
        baseDataPath: 'options',
    });
    const name = path_1.default.basename(resourcePath);
    const relativePath = slash(fullpath ? resourcePath : path_1.default.relative(__dirname, resourcePath));
    const s = fs_1.default.statSync(resourcePath);
    const adv = readis ? {
        isBlockDevice: s.isBlockDevice(),
        isCharacterDevice: s.isCharacterDevice(),
        isDirectory: s.isDirectory(),
        isFIFO: s.isFIFO(),
        isFile: s.isFile(),
        isSocket: s.isSocket(),
        isSymbolicLink: s.isSymbolicLink(),
    } : {};
    const info = {
        name,
        path: relativePath,
        ...s,
        ...adv,
    };
    return (`${pb ? 'export' : ''} const ${variable ?? '__fileinfo__'} = ${JSON.stringify(info)};

${source}
`);
}
exports.default = default_1;
