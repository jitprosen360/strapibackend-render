# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>

{
  "data": [
    {
      "size": "UK 6",
      "enabled": true
    },
    {
      "size": "UK 6.5",
      "enabled": true
    },
    {
      "size": "UK 7",
      "enabled": true
    },
    {
      "size": "UK 7.5",
      "enabled": true
    },
    {
      "size": "UK 8",
      "enabled": true
    },
    {
      "size": "UK 8.5",
      "enabled": true
    },
    {
      "size": "UK 9",
      "enabled": true
    },
    {
      "size": "UK 9.5",
      "enabled": true
    },
    {
      "size": "UK 10",
      "enabled": true
    },
    {
      "size": "UK 10.5",
      "enabled": true
    },
    {
      "size": "UK 11",
      "enabled": false
    },
    {
      "size": "UK 11.5",
      "enabled": false
    }
  ]
}

**  stripe login --api-key sk_test_51Mg1mxSG0XH0azCqvAMr6y5iwySiwTjrXF1I70JJXIdMQcqW61wQITvTmMDEfFkMb52X3aYXqaIU74qpbxNPxlQV00GmQZedgO

stripe login

https://ab1d-103-88-216-238.ngrok-free.app -> http://localhost:1337  

stripe listen --forward-to http://127.0.0.1:4242/stripe-webhooks

** stripe listen --forward-to=https://ab1d-103-88-216-238.ngrok-free.app/stripe-webhooks

stripe listen --load-from-webhooks-api --forward-to=https://ab1d-103-88-216-238.ngrok-free.app

stripe listen --forward-to=https://ab1d-103-88-216-238.ngrok-free.app/stripe-webhook


stripe trigger checkout.session.completed --forward-to https://ab1d-103-88-216-238.ngrok-free.app/stripe-webhook

stripe listen --forward-to http://127.0.0.1:1337/stripe-webhooks

stripe listen --forward-to http://127.0.0.1:4242/stripe-webhooks

curl -X POST https://ab1d-103-88-216-238.ngrok-free.app/stripe-webhooks

stripe trigger checkout.session.completed

stripe trigger charge.succeeded
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.requires_action
payment_intent.created and payment_intent.requires_action

ngrok http 1337

strapikey = ba8f1966b717b144ed96897672256bb1b6ca63db0b8bdd257c37bc23ca3b7b075e1dc81fa399a31b366c63bf179d5b52e80c0f2a9b501ba91b3909214b0d28b00bc92a1cab31147da8bf9967f0074dacd12527e5de9e25c6e6c03e1d25c4379341e1a4dd20e18ace57c76ff3f8797493f902e7c6db61a4fc93b4561ba0c81028


https://19d4-103-88-216-130.ngrok-free.app/api/connect/google

http://127.0.0.1:1337/api/connect/google

https://19d4-103-88-216-130.ngrok-free.app/api/connect/google/callback