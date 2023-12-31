import * as esbuild from 'esbuild'

const watch = process.argv.includes('-w')

const entryPoints = ['src/index.js']

const browserConfig = {
  bundle: true,
  entryPoints,
  format: 'esm',
  minify: true,
  sourcemap: true,
  outdir: 'dist/esm',
}

const cjsConfig = {
  ...browserConfig,
  ...{
    format: 'cjs',
    minify: false,
    sourcemap: false,
    outdir: 'dist/cjs',
    target: ['node16.0'],
  },
}

const testConfig = {
  bundle: true,
  entryPoints: ['src/tests/index.js'],
  format: 'esm',
  minify: false,
  outfile: 'tests/browser-bundle.js',
  sourcemap: false,
}


if (watch) {
  console.log('watch', watch)
  const ctx = await esbuild.context({
    entryPoints: ['src/tests/index.js'],
    bundle: true,
    format: 'esm',
    minify: false,
    sourcemap: false,
    outfile: 'tests/browser-bundle.js',
  })
  const { host, port = await ctx.serve({ servedir: '.' }) } = ctx
  console.log('port', port)
}

Promise.all([esbuild.build(browserConfig), esbuild.build(cjsConfig), esbuild.build(testConfig)]).catch((err) =>
  console.log('err', err)
)