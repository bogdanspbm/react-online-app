const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://bba8mn43mvel1jncd95g.containers.yandexcloud.net',
      changeOrigin: true,
    })
  );
};