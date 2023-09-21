// @ts-nocheck
("use strict");

/**
 * order controller
 */

const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_KEY);
// Middleware to extract user information from JWT token
const authenticateUser = (ctx, next) => {
  const authorizationHeader = ctx.request.headers.authorization;

  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1]; // Assuming "Bearer <token>"

    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
        ctx.state.user = decodedToken.user; // Attach user information to context
      } catch (error) {
        // Token is invalid or expired
        console.error("JWT verification error:", error);
      }
    }
  }

  return next();
};


const handleStripeWebhook = async (ctx) => {
  const sig = ctx.request.headers["stripe-signature"];
  const webhookSecret = 'whsec_6437dc3dc2f76baf71478f96150bbfd3313b79b0b352eb76428e2da6312151a2'; // Replace with your actual signing secret
  
  if (webhookSecret) {
    try {
      const event = stripe.webhooks.constructEvent(ctx.request.body, sig, webhookSecret);

      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object;
          const shippingAddress = session.shipping_details.address;
        const shippingZip = shippingAddress.postal_code;

        try {
          const paymentIntentId = session.payment_intent;
          const order = await strapi.services.order.findOne({ paymentIntentId });

          if (order) {
            await strapi.services.order.update({
              where: { paymentIntentId },
              data: { shippingZip: shippingZip },
            });
            console.log("Shipping Zip updated in Strapi:", shippingZip);
          }
        } catch (error) {
          console.error("Error updating shippingZip:", error);
        }
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      ctx.send("Webhook Received");
    } catch (err) {
      ctx.throw(400, `Webhook Error: ${err.message}`);
    }
  }
};





const { createCoreController } = require("@strapi/strapi").factories;

const { getOrdersForSession } = require('../services/order');

module.exports =  createCoreController("api::order.order", ({ strapi }) => ({

  before: {
    create: [authenticateUser], // Apply the middleware before the create action
  },
  async webhook(ctx) {
    await handleStripeWebhook(ctx); // Use the handleStripeWebhook function as middleware
  },

  async create(ctx) {
    const localUser = ctx.state.user; // Get the user information from context
    const shippingZip = ctx.request.body.shippingZip;
    if (!localUser || !localUser.id) {
      ctx.response.status = 401;
      return { error: "Local user not found in session" };
    }
    
    const { products , username   } = ctx.request.body;

    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const itemId = product?.id; // Use optional chaining to handle undefined
          if (!itemId) {
            throw new Error("Product ID is missing");
          }
    
          const item = await strapi
            .service("api::product.product")
            .findOne(itemId);

          if (!item) {
            throw new Error(`Product with ID ${itemId} not found`);
          }

          console.log("this is item------->", item);
          console.log("this is product------->", product);
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                metadata: {
                  selectedSize: product.selectedSize,
                },
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity,
          };
        })
      );

      const totalAmount = lineItems.reduce((total, item) => {
        return total + item.price_data.unit_amount * item.quantity;
      }, 0) / 100 ;
     
      const productNames = lineItems.map(item => item.price_data.product_data.name).join(', ');

      const totalQuantity = lineItems.reduce((total, item) => total + item.quantity, 0);

      const selectedSizesArray = lineItems.map((item) => item.price_data.product_data.metadata.selectedSize).join(', ');
  
      console.log("test from new size",selectedSizesArray);



      const session = await stripe.checkout.sessions.create({
       
        shipping_address_collection: { allowed_countries: ["IN"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + `/success`,
        cancel_url: process.env.CLIENT_URL + "/failed",
        line_items: lineItems,
        metadata: {
          userEmail: localUser.email,
          userId: localUser.id,
          totalAmount: totalAmount,
          productNames: productNames,
          totalQuantity: totalQuantity,
          selectedSizesArray: selectedSizesArray,
          shippingZip:shippingZip
        }
      });

      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeid: session.id ,username ,
           user: localUser.id , amount: totalAmount ,
           pname: productNames,
           quantity: totalQuantity,
           selectedSize: selectedSizesArray,
           shippingZip:shippingZip
      
           } });

      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      return { error: error.message };
    }
  },

  async find(ctx) {
    const userEmail = ctx.query['user.email']; // Extract user email from query parameter
  
    try {
      const data = await strapi.db.query("api::order.order").findMany({
        where: { user: { email: userEmail } }, // Filter orders by user email
      });
  
      return { data };
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },

  // async uploadAvatar(ctx) {
  //   const { user } = ctx.state; // Assuming user is authenticated
  //   const uploadedFile = ctx.request.files.file; // Assuming the upload field is named 'file'

  //   if (!uploadedFile) {
  //     ctx.response.status = 400;
  //     ctx.response.body = { error: 'No file uploaded' };
  //     return;
  //   }

  //   const uploadedFileName = uploadedFile.name;
  //   const avatarUrl = `http://localhost:1337/uploads/${uploadedFileName}`;

  //   // Assuming `user` is the current authenticated user
  //   await strapi.query('user', 'users-permissions').update(
  //     { id: user.id },
  //     { avatarUrl }
  //   );

  //   ctx.response.body = { avatarUrl };
  // },
  

}));
