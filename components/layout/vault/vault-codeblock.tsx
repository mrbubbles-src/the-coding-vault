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
  });

  return (
    <div
      className="overflow-x-auto p-4 text-lg [&_pre]:whitespace-pre"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
