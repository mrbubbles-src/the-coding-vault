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

  // Extract the actual code from the <code> block
  const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
  const rawCode = match?.[1] || '';
  const lines = rawCode.split('\n');

  return (
    <pre className="bg-code-bg overflow-x-auto rounded-md p-4 text-lg leading-relaxed">
      <code className="language-js font-code">
        {lines.map((line, i) => (
          <span key={i} className="line flex">
            <span className="pr-4 text-gray-500 select-none">{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />
          </span>
        ))}
      </code>
    </pre>
  );
}
