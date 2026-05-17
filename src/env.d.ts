/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_IOS_APP_URL?: string;
  readonly PUBLIC_ANDROID_APP_URL?: string;
  readonly PUBLIC_APPLE_APP_ID?: string;
  readonly PUBLIC_GOOGLE_PLAY_PACKAGE_ID?: string;
  readonly PUBLIC_GITHUB_REPO?: string;
  readonly PUBLIC_GITHUB_PROJECT_URL?: string;
  readonly PUBLIC_SITE_ORIGIN?: string;
  readonly PUBLIC_SUPPORT_EMAIL?: string;
  readonly PUBLIC_APP_SUPPORT_URL?: string;
  readonly PUBLIC_APP_MARKETING_URL?: string;
  readonly PUBLIC_PRIVACY_POLICY_URL?: string;
  readonly PUBLIC_USER_PRIVACY_CHOICES_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
