import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import { DEFAULT_LOCALE, type Locale } from './i18n';
import { localizedDocs } from './localizedDocs';

const docsDir = path.join(process.cwd(), 'src', 'content', 'docs');

marked.use({
  gfm: true,
});

export async function renderMarkdownDoc(fileName: string, locale: Locale = DEFAULT_LOCALE) {
  const docName = fileName as keyof (typeof localizedDocs)['es'];
  const markdown = locale === DEFAULT_LOCALE
    ? await readFile(path.join(docsDir, fileName), 'utf8')
    : localizedDocs[locale as Exclude<Locale, 'en'>][docName];

  return {
    markdown,
    html: await marked.parse(markdown),
  };
}
