import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'main.js',
  output: {
    file: 'dist/main.js',
    format: 'es',
  },
  plugins: [
    resolve(),
  ],
}
