module.exports = (strapi) => {
    return {
      async initialize() {
        strapi.app.use(async (ctx, next) => {
          if (ctx.path === '/api/auth/session') {
            // Customize CORS headers for the /api/auth/session path
            ctx.set('Access-Control-Allow-Origin', 'https://nextstrapifrontend-render.vercel.app');
            ctx.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
            ctx.set('Access-Control-Allow-Headers', 'Content-Type');
          }
          await next();
        });
      },
    };
  };
  