/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_IOS_APP_URL?: string;
  readonly PUBLIC_ANDROID_APP_URL?: string;
  readonly PUBLIC_GITHUB_REPO?: string;
  readonly PUBLIC_GITHUB_PROJECT_URL?: string;
  readonly PUBLIC_SITE_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
