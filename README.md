# Scope of Work

Design and develop a project using one of the Circle APIs. Ensure that the frontend (FE) is fully integrated with the Circle API's and can be tested on platforms like Cloudflare or Vercel.

In this project I used programable wallet to add a payment method that allows users who have registered an account to make purchases using USDC tokens.

When users register for an account, they will be created an account on Circle API. When making payment, if they choose USDC as the payment method, they will be redirected to the payment page using a wallet created by Circle. If they do not have a wallet in their account, they will be allowed to create their own wallet and then deposit USDC to be able to make purchases.

# Deploy your own

Deploy the example using [Vercel](https://vercel.com/).

# Tech stack

- Nextjs - https://nextjs.org/
- Prisma with https://neon.tech for DB
- Kindle for Auth - https://kinde.com/
- Uploadthing for file storage - https://uploadthing.com/
- Upstash Redis - https://upstash.com/
- Stripe - https://stripe.com/
- Circle - https://www.circle.com/

# How to use

Change into the project directory and run the following command:

Change file name **.env.template** to **.env** and fill with your config

```
NEXT_PUBLIC_USDC_ADDRESS=
NEXT_PUBLIC_STORE_PAYMENT_ADDRESS=
NEXT_PUBLIC_FEE_LEVEL=MEDIUM
NEXT_PUBLIC_DEFAULT_BLOCKCHAIN=SOL-DEVNET
NEXT_PUBLIC_CIRCLE_APP_ID=
NEXT_PUBLIC_BASE_URL=https://circlestore.leopham.app


DATABASE_URL=

KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=https://circlestore.kinde.com
KINDE_SITE_URL=https://circlestore.leopham.app
KINDE_POST_LOGOUT_REDIRECT_URL=https://circlestore.leopham.app
KINDE_POST_LOGIN_REDIRECT_URL=https://circlestore.leopham.app/api/auth/creation

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

STRIPE_API_KEY=
STRIPE_SECRET_WEBHOOK=

CIRCLE_API_KEY=
CIRCLE_APP_ID=
```

## Install dependencies

```
pnpm install
pnpm run dev
```
