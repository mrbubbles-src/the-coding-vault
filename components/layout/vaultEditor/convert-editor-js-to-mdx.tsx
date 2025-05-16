// components/editorjs/Renderer.tsx
import { TEditorBlock } from '@/types/types';

const ConvertEditorJsToMDX = (editorData: {
  blocks: TEditorBlock[];
}): string => {
  if (!editorData?.blocks || !Array.isArray(editorData.blocks)) {
    return '';
  }
  const resultArray: string[] = [];
  for (let i = 0; i < editorData.blocks.length; i++) {
    const block = editorData.blocks[i];
    switch (block.type) {
      case 'paragraph': {
        const data = block.data as { text: string };
        resultArray.push(data.text);
        break;
      }
      case 'header': {
        const data = block.data as { text: string; level: number };
        resultArray.push(`${'#'.repeat(data.level)} ${data.text}`);
        break;
      }
      case 'list': {
        const data = block.data as {
          style: 'ordered' | 'unordered';
          items: (
            | string
            | { content?: string; text?: string; checked?: boolean }
          )[];
        };
        if (data.style === 'unordered') {
          resultArray.push(
            data.items
              .map((item) =>
                typeof item === 'string'
                  ? `- ${item}`
                  : `- ${item.content ?? item.text ?? ''}`,
              )
              .join('\n'),
          );
        } else {
          resultArray.push(
            data.items
              .map((item, idx) =>
                typeof item === 'string'
                  ? `${idx + 1}. ${item}`
                  : `${idx + 1}. ${item.content ?? item.text ?? ''}`,
              )
              .join('\n'),
          );
        }
        break;
      }
      case 'image': {
        const data = block.data as {
          file?: { url?: string };
          caption?: string;
        };
        resultArray.push(
          `[${data.caption || ''}](${data.file?.url}${data.caption || ''})`,
        );
        break;
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
        resultArray.push(
          `\`\`\`${data.language || ''}\n${codeContent}\n\`\`\``,
        );
        break;
      }
      case 'quote': {
        const data = block.data as { text: string; caption?: string };
        resultArray.push(`> ${data.text}\n\n> — ${data.caption || ''}`);
        break;
      }
      case 'alert': {
        const data = block.data as {
          type?: 'info' | 'success' | 'warning' | 'danger';
          message: string;
        };
        const type = data.type || 'info';
        resultArray.push(`<Alert type="${type}" message="${data.message}" />`);
        break;
      }
      case 'delimiter': {
        resultArray.push(`---`);
        break;
      }
      case 'toggle': {
        const data = block.data as { text?: string; items?: number };
        const text = data.text?.trim() || 'Details';
        const itemsCount = data.items ?? 0;
        const toggleBlocks = editorData.blocks.slice(i + 1, i + 1 + itemsCount);
        const inner = toggleBlocks
          .map((b) => ConvertEditorJsToMDX({ blocks: [b] }))
          .join('\n\n');
        resultArray.push(
          `<DetailsToggle text="${text}">\n\n${inner}\n\n</DetailsToggle>`,
        );
        i += itemsCount;
        break;
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
          resultArray.push([header, divider, ...bodyRows].join('\n'));
        } else {
          resultArray.push(rows.join('\n'));
        }
        break;
      }
    }
  }
  const result = resultArray.join('\n\n');
  // console.log('🔎 FINAL MARKDOWN OUTPUT:\n\n', result);
  return result;
};
export default ConvertEditorJsToMDX;
