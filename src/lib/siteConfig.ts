const repo = import.meta.env.PUBLIC_GITHUB_REPO || 'migue-rc/universal-fit';
const base = import.meta.env.BASE_URL || '/';
const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
const siteOrigin = (import.meta.env.PUBLIC_SITE_ORIGIN || 'https://migue-rc.github.io').replace(/\/$/, '');
const supportEmail = import.meta.env.PUBLIC_SUPPORT_EMAIL || 'support@debloat.us';
const appleAppId = import.meta.env.PUBLIC_APPLE_APP_ID || '6770265864';
const appleAppUrl = `https://apps.apple.com/app/id${appleAppId}`;
const googlePlayPackageId = import.meta.env.PUBLIC_GOOGLE_PLAY_PACKAGE_ID || 'us.debloat.uf';
const googlePlayUrl = `https://play.google.com/store/apps/details?id=${googlePlayPackageId}`;

export const siteConfig = {
  name: 'Universal Fit',
  description: 'A mobile app that turns any workout-plan JSON file into a beautiful, trackable training program.',
  repo,
  repoUrl: `https://github.com/${repo}`,
  projectUrl: import.meta.env.PUBLIC_GITHUB_PROJECT_URL || `https://github.com/${repo}/projects`,
  appleAppId,
  googlePlayPackageId,
  iosAppUrl: import.meta.env.PUBLIC_IOS_APP_URL || appleAppUrl,
  androidAppUrl: import.meta.env.PUBLIC_ANDROID_APP_URL || googlePlayUrl,
  supportEmail,
  basePath: normalizedBase,
  siteOrigin,
  publicBaseUrl: `${siteOrigin}${normalizedBase}`,
};

export function withBase(path = '/') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.basePath}${cleanPath}` || cleanPath;
}

export function issueTemplateUrl(template: string) {
  return `${siteConfig.repoUrl}/issues/new?template=${encodeURIComponent(template)}`;
}

export function labelUrl(label: string) {
  const query = encodeURIComponent(`is:issue label:"${label}"`);
  return `${siteConfig.repoUrl}/issues?q=${query}`;
}

export function milestoneUrl() {
  return `${siteConfig.repoUrl}/milestones`;
}

export function issueSearchUrl(query: string) {
  return `${siteConfig.repoUrl}/issues?q=${encodeURIComponent(query)}`;
}

export function absoluteUrl(path: string) {
  return `${siteConfig.publicBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export const appStoreConfig = {
  appleAppId,
  appStoreProductUrl: siteConfig.iosAppUrl,
  googlePlayListingUrl: siteConfig.androidAppUrl,
  supportUrl: import.meta.env.PUBLIC_APP_SUPPORT_URL || absoluteUrl('/support'),
  marketingUrl: import.meta.env.PUBLIC_APP_MARKETING_URL || absoluteUrl('/'),
  privacyPolicyUrl: import.meta.env.PUBLIC_PRIVACY_POLICY_URL || absoluteUrl('/privacy'),
  userPrivacyChoicesUrl: import.meta.env.PUBLIC_USER_PRIVACY_CHOICES_URL || absoluteUrl('/privacy#privacy-choices'),
  supportEmail,
};
