import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import path from 'path';
import sass from 'rollup-plugin-sass';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.tsx',
    output: [
        {
            dir:"lib",
            format: 'cjs',
            sourcemapPathTransform: (relativePath) => {
              return path.relative('src', relativePath);
            },
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        nodeResolve({
            browser: true,
        }),

        typescript({ objectHashIgnoreUnknownHack: true }),
        commonjs({
          include: /node_modules/,
        }),
        sass({
            insert: true,
        })
    ],
};