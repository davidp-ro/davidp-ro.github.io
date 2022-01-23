const { resolve } = require('path')

/**
 * @type {import('vite').UserConfig}
 */
 const config = {
  publicDir: 'assets',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        info: resolve(__dirname, 'info.html'),
      }
    }
  },
};

export default config
