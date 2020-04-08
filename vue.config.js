const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Ruby Item Editor',
    themeColor: '#b32222',
    msTileColor: '#b32222',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#b32222'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
