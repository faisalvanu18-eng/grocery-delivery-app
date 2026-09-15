# Deployment Guide

Stack: **Neon** (database) · **Render** (backend) · **Vercel** (frontend).

The backend is a long-running Express server (`app.listen`), so it runs on
Render (a long-running host), not on Vercel serverless. The frontend is a
static Vite build served by Vercel.

---

## Status checklist

- [x] Neon database created
- [x] Migration applied to Neon (`prisma migrate deploy`)
- [x] Demo products seeded (27 products)
- [x] CORS restricted to `FRONTEND_URL`
- [x] `render.yaml` (backend) and `client/vercel.json` (frontend) added
- [x] `.env.example` templates added
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Stripe + Inngest webhooks registered
- [ ] Smoke test complete

---

## 1. Push the repo to GitHub

Both Render and Vercel deploy from a Git repo. Push this project to GitHub.

## 2. Deploy the backend to Render

1. Go to render.com → **New** → **Blueprint**, and point it at your repo.
   Render reads `render.yaml` at the repo root and creates the `grocery-backend`
   service (root dir `server`, build `npm install`, start `npm start`).
2. Set the environment variables (all marked `sync: false`, so you enter them in
   the dashboard):

   | Variable | Value |
   | --- | --- |
   | `DATABASE_URL` | your Neon connection string |
   | `JWT_SECRET` | a long random string (one was generated for you) |
   | `ADMIN_EMAILS` | comma-separated admin emails |
   | `FRONTEND_URL` | your Vercel URL (fill after step 3, then redeploy) |
   | `CLOUDINARY_*` | Cloudinary credentials (for image uploads) |
   | `INNGEST_*` | Inngest keys (for background jobs/emails) |
   | `SENDER_EMAIL`, `SMTP_USER`, `SMTP_PASS` | Brevo SMTP (for emails) |
   | `STRIPE_SECRET_KEY` | Stripe secret key (for payments) |
   | `STRIPE_WEBHOOK_SECRET` | fill after step 4, then redeploy |

3. Deploy. Note the public URL, e.g. `https://grocery-backend.onrender.com`.
   Visit it — you should see `Server is Live!`.

> Optional features can be left blank for a minimal launch, but the feature that
> depends on them will not work (payments, uploads, emails, background jobs).

## 3. Deploy the frontend to Vercel

1. Go to vercel.com → **New Project** → import the repo.
2. Set **Root Directory** to `client`. Vercel detects Vite and uses
   `client/vercel.json` (build `npm run build`, output `dist`, SPA rewrites).
3. Environment variables:

   | Variable | Value |
   | --- | --- |
   | `VITE_BASE_URL` | `https://grocery-backend.onrender.com/api` |
   | `VITE_CURRENCY_SYMBOL` | `₹` |

4. Deploy. Note the URL, e.g. `https://your-app.vercel.app`.
5. Go back to Render, set `FRONTEND_URL` to that Vercel URL, and redeploy the
   backend (needed for CORS).

## 4. Register webhooks

**Stripe** (payments):
1. Stripe Dashboard → Developers → Webhooks → Add endpoint.
2. URL: `https://grocery-backend.onrender.com/api/stripe`
3. Events: `payment_intent.succeeded`, `payment_intent.payment_failed`,
   `payment_intent.canceled`.
4. Copy the signing secret into `STRIPE_WEBHOOK_SECRET` on Render, redeploy.

**Inngest** (background jobs):
1. In the Inngest dashboard, register the serve endpoint:
   `https://grocery-backend.onrender.com/api/inngest`.

## 5. Smoke test

1. Register a user on the deployed frontend.
2. Browse products (27 seeded), add to cart.
3. Checkout with Stripe test card `4242 4242 4242 4242`, any future expiry/CVC.
4. Confirm the order appears in "My Orders" and stock decrements.
5. Log in as an admin (email listed in `ADMIN_EMAILS`) and open the admin pages.
6. Test the delivery partner login/flow.

---

## Notes

- **Free-tier cold starts:** Render free web services sleep after inactivity;
  the first request after idle can take ~30–60s.
- **Rotate the Neon password** if the connection string was shared anywhere.
- **Local dev** still works unchanged: with `FRONTEND_URL` unset or set to
  `http://localhost:5173`, CORS allows the local frontend.
