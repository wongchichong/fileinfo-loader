import fs from 'fs';
import { LoaderContext } from 'webpack';
declare global {
    /** @see https://nodejs.org/api/fs.html#class-fsstats */
    const __fileinfo__: fs.Stats;
}
export default function (this: LoaderContext<{
    test: string;
    public: boolean;
    variable: string;
    fullpath: boolean;
    readis: boolean;
}>, source: string, map: any, meta: any): string;
