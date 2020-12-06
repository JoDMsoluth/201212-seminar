import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import sass from 'rollup-plugin-sass';
import commonjs from '@rollup/plugin-commonjs';

import packageJson from './package.json';

export default {
    input: 'src/index.tsx',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        nodeResolve({
            browser: true,
        }),

        typescript({ objectHashIgnoreUnknownHack: true }),
        commonjs(),
        sass({
            insert: true,
        })
    ],
};