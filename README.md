# Universal Fit Web

Static GitHub Pages site for Universal Fit.

The authoring route at `/generate-with-ai` includes a client-side workout builder, pasted JSON editor, schema validation, and AI edit-prompt helper.

## Development

```sh
npm install
npm run dev
```

## App Store URLs

Copy `.env.example` to `.env` and set:

```sh
PUBLIC_IOS_APP_URL=
PUBLIC_ANDROID_APP_URL=
```

If either value is empty, the matching download CTA renders as "Coming soon".
