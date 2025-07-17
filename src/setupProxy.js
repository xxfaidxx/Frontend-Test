const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/storage",
    createProxyMiddleware({
      target: "https://suitmedia-backend.suitdev.com",
      changeOrigin: true,
      pathRewrite: {
        "^/storage": "/storage",
      },
    })
  );
};
