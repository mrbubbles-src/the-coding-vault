'use server';

import fs from 'fs';
import path from 'path';
import type { OutputData } from '@editorjs/editorjs';

export async function saveEditorData(data: OutputData) {
  const filePath = path.join(process.cwd(), 'data', 'editor-preview.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
