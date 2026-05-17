# Universal Fit Website

This folder contains the static public website for Universal Fit. It is hosted with GitHub Pages so the project can use GitHub's public tooling for support, issue tracking, roadmap visibility, and plan/schema feedback.

The mobile app itself is not hosted on GitHub Pages. This site is only the public web presence around the app.

## What This Site Provides

- A marketing homepage for Universal Fit.
- Store metadata URLs for Apple and Google review:
  - Support URL
  - Marketing URL
  - Privacy Policy URL
  - User Privacy Choices URL
- Public support entry points backed by GitHub issue forms.
- Roadmap links to GitHub issues, labels, milestones, and projects.
- Example workout-plan JSON files.
- Schema, LLM brief, and exercise-library documentation.
- A browser-based workout builder and JSON validator at `/generate-with-ai`.

## Tech Stack

- Astro static site
- Tailwind CSS
- React islands only for interactive tools
- JSON-driven plan examples
- GitHub Pages deployment

## Development

```sh
npm install
npm run dev
```

Run a production build:

```sh
npm run build
```

## Deployment

Deployments are handled by GitHub Pages through the workflow in `.github/workflows/deploy.yml`.

From this folder:

```sh
npm run deploy
```

From the parent app repository:

```sh
npm run page:deploy
```

The deploy script builds the site and then triggers the GitHub Pages workflow with the GitHub CLI.

## Store URLs

The copy-ready store metadata page is available at:

```text
/app-store
```

Default production URLs:

```text
App Store Product URL: https://apps.apple.com/app/id6770265864
Google Play Listing URL: https://play.google.com/store/apps/details?id=us.debloat.uf
Support URL: https://migue-rc.github.io/universal-fit/support
Marketing URL: https://migue-rc.github.io/universal-fit/
Privacy Policy URL: https://migue-rc.github.io/universal-fit/privacy
User Privacy Choices URL: https://migue-rc.github.io/universal-fit/privacy#privacy-choices
```

You can override public URL/config values with `.env`:

```sh
PUBLIC_APPLE_APP_ID=6770265864
PUBLIC_GOOGLE_PLAY_PACKAGE_ID=us.debloat.uf
PUBLIC_IOS_APP_URL=https://apps.apple.com/app/id6770265864
PUBLIC_ANDROID_APP_URL=https://play.google.com/store/apps/details?id=us.debloat.uf
PUBLIC_SITE_ORIGIN=https://migue-rc.github.io
PUBLIC_GITHUB_REPO=migue-rc/universal-fit
PUBLIC_GITHUB_PROJECT_URL=
PUBLIC_SUPPORT_EMAIL=support@debloat.us
PUBLIC_APP_SUPPORT_URL=
PUBLIC_APP_MARKETING_URL=
PUBLIC_PRIVACY_POLICY_URL=
PUBLIC_USER_PRIVACY_CHOICES_URL="https://migue-rc.github.io/universal-fit/privacy#privacy-choices"
```

If either app-store download URL is empty, the matching download CTA renders as "Coming soon".

## GitHub Project Management

GitHub is used here as the public project-management layer:

- Bug reports
- Feature requests
- Plan JSON submissions
- Schema and documentation feedback
- Roadmap visibility

Issue forms live in `.github/ISSUE_TEMPLATE/`. The website links users into those forms from `/support`.
