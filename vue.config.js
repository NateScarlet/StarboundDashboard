const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  assetsDir: 'static',
  chainWebpack: (config) => {
    config.plugin('html')
      .use(htmlPlugin, [{
        template: 'public/templates/index.html',
        filename: 'templates/index.html'
      }]);
    config
      .devServer
      .publicPath('static/');
  },
  devServer: {
    contentBase: path.join(__dirname, 'tests/pages'),
    proxy: {
      '/': {
        target: 'http://localhost:5001',
        ws: true
      }
    }
  }
};
