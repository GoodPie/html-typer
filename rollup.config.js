import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const commonPlugins = [
    resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    typescript({
        tsconfig: './tsconfig.json',
        jsx: "react"
    }),
    terser()
];

export default [
    // Vanilla builds
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.cjs.js',
                format: 'cjs',
                sourcemap: true
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: commonPlugins
    },
    // React component builds
    {
        input: 'src/HtmlTyper.tsx',
        output: [
            {
                file: 'dist/react.cjs.js',
                format: 'cjs',
                sourcemap: true
            },
            {
                file: 'dist/react.esm.js',
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: commonPlugins,
        external: ['react', 'react-dom']
    }
];