// 'use strict';

// const { createCoreService } = require("@strapi/strapi/lib/factories");

// /**
//  * order service
//  */

// // @ts-ignore
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// module.exports = createCoreService('api::order.order', ({ strapi }) => ({
//   // Other service functions...

//   async handleStripeWebhook(ctx) {
//     const sig = ctx.request.headers["stripe-signature"];
//     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; // Use your actual webhook secret

//     if (webhookSecret) {
//       try {
//         const event = stripe.webhooks.constructEvent(
//           ctx.request.body,
//           sig,
//           webhookSecret
//         );

//         switch (event.type) {
//           case "checkout.session.completed":
//             const paymentIntentId = event.data.object.id;
//             const paymentIntent = await stripe.paymentIntents.retrieve(
//               paymentIntentId
//             );

//             if (
//               paymentIntent &&
//               paymentIntent.status === "succeeded" &&
//               paymentIntent.shipping
//             ) {
//               const shippingZip =
//                 paymentIntent.shipping.address &&
//                 paymentIntent.shipping.address.postal_code;

//               if (!shippingZip) {
//                 console.error("Shipping info or postal code is missing");
//               } else {
//                 // Update the order with shippingZip
//                 const order = await strapi.query("order").findOne({
//                   paymentIntentId,
//                 });
//                 if (order) {
//                   await strapi.query("order").update(
//                     { id: order.id },
//                     {
//                       shippingZip: shippingZip,
//                     }
//                   );
//                 }
//                 console.log("Shipping Zip:", shippingZip);
//               }
//             }
//             break;

//           default:
//             console.log(`Unhandled event type: ${event.type}`);
//         }

//         // Send a success response in JSON format
//         ctx.response.body = { message: "Webhook Received" };
//       } catch (err) {
//         console.error("Error handling Stripe webhook:", err);
        
//         // Send an error response in JSON format
//         ctx.response.status = 500;
//         ctx.response.body = { error: "Internal Server Error" };
//       }
//     }
//   },
// }));
