// components/editorjs/Renderer.tsx
import { TEditorBlock } from '@/types/types';

const ConvertEditorJsToMDX = (editorData: {
  blocks: TEditorBlock[];
}): string => {
  if (!editorData?.blocks || !Array.isArray(editorData.blocks)) {
    return '';
  }
  const result = editorData.blocks
    .map((block, i) => {
      switch (block.type) {
        case 'paragraph': {
          const data = block.data as { text: string };
          return data.text;
        }

        case 'header': {
          const data = block.data as { text: string; level: number };
          return `${'#'.repeat(data.level)} ${data.text}`;
        }

        case 'list': {
          const data = block.data as {
            style: 'ordered' | 'unordered';
            items: (
              | string
              | { content?: string; text?: string; checked?: boolean }
            )[];
          };

          const isChecklist = data.items.every(
            (item) =>
              typeof item === 'object' && 'checked' in item && 'text' in item,
          );

          if (isChecklist) {
            return data.items
              .map((item) =>
                typeof item === 'object'
                  ? `- [${item.checked ? 'x' : ' '}] ${item.text}`
                  : `- ${item}`,
              )
              .join('\n');
          }

          if (data.style === 'unordered') {
            return data.items
              .map((item) =>
                typeof item === 'string'
                  ? `- ${item}`
                  : `- ${item.content ?? item.text ?? ''}`,
              )
              .join('\n');
          } else {
            return data.items
              .map((item, i) =>
                typeof item === 'string'
                  ? `${i + 1}. ${item}`
                  : `${i + 1}. ${item.content ?? item.text ?? ''}`,
              )
              .join('\n');
          }
        }

        case 'image': {
          const data = block.data as {
            file?: { url?: string };
            caption?: string;
          };
          return `[${data.caption || ''}](${data.file?.url}${data.caption || ''})`;
        }

        case 'codeBox': {
          const data = block.data as { language?: string; code: string };
          let codeContent = data.code;
          if (typeof codeContent === 'string') {
            codeContent = codeContent
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&amp;/g, '&')
              .replace(/<div[^>]*>/g, '')
              .replace(/<\/div>/g, '\n')
              .replace(/<[^>]+>/g, '')
              .split('\n')
              .map((line) => line.replace(/^ {2}/, ''))
              .reduce<string[]>((acc, line, idx, arr) => {
                if (line.trim() === '') {
                  if (
                    acc.length === 0 ||
                    acc[acc.length - 1].trim() === '' ||
                    idx === arr.length - 1
                  ) {
                    return acc;
                  }
                }
                acc.push(line);
                return acc;
              }, [])
              .join('\n');
          }
          return `\`\`\`${data.language || ''}\n${codeContent}\n\`\`\``;
        }

        case 'quote': {
          const data = block.data as { text: string; caption?: string };
          return `> ${data.text}\n\n> — ${data.caption || ''}`;
        }

        case 'alert':
        case 'warning': {
          const data = block.data as { title?: string; message: string };
          return `<div className="${block.type}">\n${data.title ? `<strong>${data.title}</strong><br />\n` : ''}${data.message}\n</div>`;
        }

        case 'delimiter': {
          return `---`;
        }

        case 'toggle': {
          const data = block.data as { text?: string; items?: number };
          const text = data.text?.trim() || 'Details';
          const itemsCount = data.items ?? 0;
          const toggleBlocks = editorData.blocks.slice(
            i + 1,
            i + 1 + itemsCount,
          );
          const inner = toggleBlocks
            .map((b) => ConvertEditorJsToMDX({ blocks: [b] }))
            .join('\n\n');
          i += itemsCount;
          return [
            '<details>',
            `<summary>${text}</summary>`,
            '',
            inner,
            '',
            '</details>',
          ].join('\n');
        }

        case 'table': {
          const data = block.data as {
            withHeadings?: boolean;
            content: string[][];
          };

          const colWidths: number[] = [];

          data.content.forEach((row) => {
            row.forEach((cell, colIdx) => {
              const len = cell.trim().length;
              colWidths[colIdx] = Math.max(colWidths[colIdx] || 0, len);
            });
          });

          const padCell = (cell: string, idx: number) =>
            cell.trim().padEnd(colWidths[idx], ' ');

          const rows = data.content.map(
            (row) => `| ${row.map(padCell).join(' | ')} |`,
          );

          if (data.withHeadings && rows.length > 1) {
            const header = rows[0];
            const divider =
              '| ' + colWidths.map((w) => '-'.repeat(w)).join(' | ') + ' |';
            const bodyRows = rows.slice(1);
            return [header, divider, ...bodyRows].join('\n');
          }

          return rows.join('\n');
        }
      }
    })
    .join('\n\n');
  console.log('🔎 FINAL MARKDOWN OUTPUT:\n\n', result);
  return result;
};
export default ConvertEditorJsToMDX;
