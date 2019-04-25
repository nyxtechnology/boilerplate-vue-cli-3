const path = require('path');
const utilsEnv = require(path.resolve(__dirname, 'src/utils/environments'))

module.exports = {
  lintOnSave: !utilsEnv.isProd(),
  publicPath: !utilsEnv.isDevelopment() ? '/dist/' : '/',
  devServer: {
    host: process.env.NODE_HOST || '0.0.0.0',
    port: process.env.NODE_PORT || '80',
    public: process.env.TRAEFIK_FRONTEND_HOST,
    watchOptions: {
      ignored: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'dist'),
        path.resolve(__dirname, 'coverage'),
        path.resolve(__dirname, 'test'),
        path.resolve(__dirname, 'docker')
      ],
      poll: true
    },
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "@styles/_colors.scss";
               @import "@styles/_variables.scss";`
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@components': path.resolve(__dirname, 'src/components')
      }
    }    
  }
}