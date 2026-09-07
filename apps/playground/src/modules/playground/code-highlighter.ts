import type { HighlighterCore } from 'shiki/core';

let highlighter: Promise<HighlighterCore> | undefined;

export function loadCodeHighlighter(): Promise<HighlighterCore> {
  highlighter ??= createCodeHighlighter();
  return highlighter;
}

async function createCodeHighlighter(): Promise<HighlighterCore> {
  const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] =
    await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ]);

  return createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    langs: [import('@shikijs/langs/vue')],
    themes: [
      import('@shikijs/themes/github-dark'),
      import('@shikijs/themes/github-light'),
    ],
  });
}
