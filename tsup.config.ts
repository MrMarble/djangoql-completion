import { defineConfig } from 'tsup'

export default defineConfig(options =>({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: false,
  dts: {
    footer: "declare module '@mrmarble/djangoql-completion';"
  },
  clean: true,
  minify: !options.watch,
  treeshake: true,
  format: ['cjs', 'esm'],
  outDir: 'dist',
  outExtension({format}) {
    return {
      js: `.${format}.js`,
    }
  }
}))
