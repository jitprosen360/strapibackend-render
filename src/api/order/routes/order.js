// routes/order.js
'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;
const orderController = require('../controllers/order'); // Update the path as needed

// @ts-ignore
module.exports = createCoreRouter('api::order.order', ({ strapi }) => ({
  before: {
    // @ts-ignore
    create: [ orderController.authenticateUser],
  },
  routes: [
    {
      method: 'POST',
      path: '/stripe-webhook',
      handler: 'order.webhook',
    }
  ],
}));
