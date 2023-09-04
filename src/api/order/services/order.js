// 'use strict';

// const { createCoreService } = require('@strapi/strapi').factories;

// module.exports = {
//   ...createCoreService('api::order.order'),
//   ...require('./handleStripeWebhook'), // Import the handleStripeWebhook service
// };

'use strict';

/**
 * order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::order.order');
