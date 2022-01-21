const { resolve } = require('path')

/**
 * @type {import('vite').UserConfig}
 */
 const config = {
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        info: resolve(__dirname, 'info.html'),
      }
    }
  },
};

export default config
