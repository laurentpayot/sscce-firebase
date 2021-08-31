const { build } = require('esbuild')

const isDev = ['DEV', 'development'].includes(process.env.NODE_ENV)

const options = {
    minify: !isDev,
    bundle: true,
    sourcemap: true,
    format: 'esm',
    target: 'es2018',
    define: {
        "process.env.NODE_ENV": isDev ? "'development'" : "'production'"
    },
    watch: isDev ? {
        onRebuild(error, result) {
            if (error) console.error('Esbuild watch build failed:', error)
            else {
                console.log(
                    "Esbuild watch build succeeded.",
                    result.warnings.length ? `(${result.warnings.length} warnings).` : ''
                )
            }
        }
    } : undefined
}

const srcDir = __dirname
const targetDir = __dirname + '/../dist'

Promise.all([

    build({
        ...options,
        entryPoints: [
            srcDir + '/main.js',
            srcDir + '/service-worker.js',
            srcDir + '/firebase-worker.js',
        ],
        entryNames: '[name]',
        outdir: targetDir,

    }),

    build({
        ...options,
        entryPoints: [srcDir + '/firebase-worker-deps.js'],
        outdir: targetDir,
        format: 'iife',
        globalName: 'firebaseWorkerDeps', // name of the global for the IIFE format

    })

]).catch(() => process.exit(1))