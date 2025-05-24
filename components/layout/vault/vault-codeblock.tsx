import { codeToHtml } from 'shiki';

type Props = {
  code: string;
  language?: string;
};

export default async function VaultCodeBlock({
  code,
  language = 'plaintext',
}: Props) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'one-dark-pro',
    decorations: [
      {
        start: { line: 1, character: 0 },
        end: { line: 1, character: 11 },
        properties: { class: 'highlighted-word' },
      },
    ],
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
