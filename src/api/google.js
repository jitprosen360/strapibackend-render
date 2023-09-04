// api/google.js

module.exports = {
    async index(ctx) {
      try {
        const { access_token } = ctx.query; // Get the access token from the query parameters
        const googleUserData = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`);
        const userData = await googleUserData.json();
  
        // You can now process and store the `userData` in your Strapi database
        // @ts-ignore
        const createdUser = await strapi.services.user.create({
          username: userData.name,
          email: userData.email,
          // Additional fields...
        });
  
        return ctx.send({
          success: true,
          user: createdUser,
        });
      } catch (error) {
        return ctx.send({
          success: false,
          error: 'Error while processing Google OAuth data.',
        });
      }
    },
  };
  