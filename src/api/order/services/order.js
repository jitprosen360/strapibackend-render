'use strict';

/**
 * order service
 */

 const { createCoreService } = require('@strapi/strapi').factories;

 module.exports = createCoreService('api::order.order');


// const { createCoreService } = require('@strapi/strapi').factories;
//  const coreService = createCoreService('api::order.order');
// const getOrdersForUser = async (/** @type {any} */ userId) => {
//   try {
//     const orders = await strapi.query('order').find({ user: userId });
//     return orders;
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     return null;
//   }
// };

// const getOrdersForSession = async (/** @type {any} */ sessionId) => {
//     try {
//       // Find the user associated with the session ID
//       const user = await strapi
//         // @ts-ignore
//         .query('user', 'users-permissions')
//         .findOne({ sessions: [sessionId] });
  
//       if (!user) {
//         throw new Error(`User not found for session ID ${sessionId}`);
//       }
  
//       // Use the user ID to fetch their orders
//       const orders = await strapi.query('order').find({ user: user.id });
//       return orders;
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       return null;
//     }
//   };

// module.exports = {
//     coreService,
//   getOrdersForUser,
//   getOrdersForSession
// };