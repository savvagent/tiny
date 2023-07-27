import * as esbuild from 'esbuild'

const watch = process.argv.includes('-w')

const entryPoints = ['src/TinyUri.js']

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

Promise.all([esbuild.build(browserConfig), esbuild.build(cjsConfig)]).catch((err) => console.log('err', err))