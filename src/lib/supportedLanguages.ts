export const SUPPORTED_LANGS = ['en', 'es', 'pt', 'fr', 'de', 'it'] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export type AppLanguage = 'auto' | SupportedLang;

export const LANG_LABELS: Record<AppLanguage, string> = {
  auto: '...',
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
};

export const LANGUAGE_REGION_LABELS: Record<SupportedLang, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
};
