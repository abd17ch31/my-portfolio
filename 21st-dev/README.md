# 21st Dev Portfolio

This app is a Vite React frontend with a serverless contact endpoint at `api/contact.js`.

## Local development

```bash
npm install
npm run dev
```

Note: `npm run dev` starts the Vite frontend only. The `api/contact.js` route is meant for a serverless environment such as Vercel.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Set the project root directory to `21st-dev`.
3. Add the environment variables from `.env.example`.
4. Deploy.

## Required environment variables

Copy `.env.example` and set real values in Vercel:

```bash
WEB3FORMS_ACCESS_KEY=YOUR_WEB3FORMS_ACCESS_KEY
```

The frontend submits to `/api/contact`, and the serverless function forwards the data to Web3Forms using the secret access key stored in Vercel.

## Security

- Do not commit real API keys or `.env` files.
- The frontend submits to `/api/contact`.
- Secrets stay on the server in Vercel environment variables.
