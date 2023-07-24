import * as esbuild from 'esbuild'

const watch = process.argv.includes('-w')

const entryPoints = [
  'src/TinyFetch.js',
  'src/interceptors/bust-cache.js',
  'src/interceptors/json-request.js',
  'src/interceptors/json-response.js',
  'src/interceptors/lrucache.js',
  'src/interceptors/reject-errors.js',
]

const browserConfig = {
  bundle: true,
  entryPoints,
  format: 'esm',
  minify: true,
  sourcemap: true,
  outdir: 'dist/esm',
  watch: true,
}

const cjsConfig = {
  ...browserConfig,
  ...{
    format: 'cjs',
    minify: false,
    sourcemap: false,
    outdir: 'dist/cjs',
    target: ['node16.0'],
    watch: true,
  },
}

const testConfig = {
  bundle: true,
  entryPoints: ['test/browser.js'],
  format: 'esm',
  minify: false,
  outfile: 'browser-bundle.js',
  sourcemap: false,
  watch: true,
}

// Promise.all([build(browserConfig), build(cjsConfig), build(testConfig)]).catch((err) => console.log("err", err))

if (watch) {
  console.log('watch', watch)
  const ctx = await esbuild.context({
    entryPoints: ['test/browser.js'],
    bundle: true,
    format: 'esm',
    minify: false,
    sourcemap: false,
    outfile: 'test/browser-bundle.js',
  })
  const { host, port = await ctx.serve({ servedir: '.' }) } = ctx
  console.log('port', port)
}