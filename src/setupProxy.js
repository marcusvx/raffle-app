const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/.netlify/functions',
    createProxyMiddleware({
      target: 'http://localhost:9000',
      changeOrigin: true,
      pathRewrite: {
        '^/\\.netlify/functions': '',
      },
    }),
  );
};
