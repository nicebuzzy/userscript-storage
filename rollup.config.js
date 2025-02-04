export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/userscript-storage.js',
      format: 'es'
    },
    {
      file: 'dist/userscript-storage.umd.js',
      format: 'umd',
      name: 'UserscriptStorage'
    }
  ]
}