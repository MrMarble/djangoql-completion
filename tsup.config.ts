import { defineConfig } from 'tsup'

export default defineConfig(options =>({
  entry: ['src/index.js'],
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: !options.watch,
  dts: false,
  treeshake: true,
  format: ['cjs', 'esm'],
  outDir: 'dist',
  outExtension({format}) {
    return {
      js: `.${format}.js`,
    }
  }
}))
