This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description

This is a simple Next.js app created to show reproduction steps for what appears to be a bug introduced in next v14.
I have an application that is incrementally adopting Next.js. This means we have our legacy application and a Next.js
application living side by side, with a routing layer above that sends requests to the appropriate application. From
our user's perspective, they see a single application and a single domain.

Inevitably, our Next.js application has links to routes that will ultimately go to the legacy application. We use the
Link component everywhere because as we move pages over to Next.js they will automatically start prefetching when linked
in another Next.js page. Though v13 of next this has worked great, however after upgrading to v14 we noticed an issue.

Now, all those Links with a url pointing to the legacy application will cause invalid requests to _next/data that
respond with 404s.

After much experimentation, I discovered that having middleware defined (no matter how it's used) is the culprit. Even if
I configure the middleware to exclude _next routes, we still get these errors. We do not get the same errors when running
the dev server, only in production.

## TLDR

If you have middleware (middleware.ts file), the Link component will attempt to preload routes that are not defined in the
Next.js app, resulting in lots of 404s. This only happens in production builds and does not go away even if you configure
the middleware to ignore _next routes.

## Reproduction Steps

```bash
git co main
npm install
npm run build
npm start
```
Go to http://localhost:3000 and notice in the browser console that you get a 404 from a request similar to
`http://localhost:3000/_next/data/Xnw_dslS_X99ly2_czqvP/somewhere-else.json`. Hovering over the link with text "I do
not" will cause additional bad requests to send.

```bash
git co v13
npm install
npm run build
npm start
```

Using Next.js v13, the error is gone.
