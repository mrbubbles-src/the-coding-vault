import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { logoutUser } from './auth';
import { redirect } from 'next/navigation';
import { TEditorJsListItem } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleLogout() {
  try {
    const res = await logoutUser();
    const data = await res?.json();
    if (data?.message === 'Logout erfolgreich') {
      redirect('/');
    }
  } catch (error) {
    console.error(error);
  }
}

function escapeHtmlAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

export function replaceLinksWithVaultLinks(text: string): string {
  return text.replace(
    /<a\s+href=["']([^"']+)["']>(.*?)<\/a>/g,
    (_, href, content) =>
      `<VaultLink href="${escapeHtmlAttr(href)}">${content}</VaultLink>`,
  );
}

export function renderListItems(
  items: TEditorJsListItem[],
  style: 'ordered' | 'unordered' | 'checklist',
  depth = 0,
): string {
  return items
    .map((item, idx) => {
      let bullet: string;
      if (style === 'ordered') {
        bullet = `${idx + 1}.`;
      } else if (style === 'unordered') {
        const unorderedBullets = ['-', '*', '+'];
        bullet = unorderedBullets[depth % unorderedBullets.length];
      } else {
        const checked = item.meta?.checked ?? false;
        bullet = checked ? '- [x]' : '- [ ]';
      }
      const content =
        typeof item === 'string'
          ? item
          : replaceLinksWithVaultLinks(item.content || item.text || '');

      const indentPerLevel = 4;
      const prefix = ' '.repeat(indentPerLevel * depth);
      const line = `${prefix}${bullet} ${content}`;

      const children =
        item.items && item.items.length
          ? `\n${renderListItems(item.items, style, depth + 1)}`
          : '';

      return `${line}${children}`;
    })
    .join('\n');
}
