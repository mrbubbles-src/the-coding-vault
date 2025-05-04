'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/shadcn/button';
import { saveEditorData } from '@/lib/test';
import EditorJS, { ToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import AttachesTool from '@editorjs/attaches';
import CodeBox from '@bomdi/codebox';
import Delimiter from '@coolbytes/editorjs-delimiter';
import ToggleBlock from 'editorjs-toggle-block';
import Alert from 'editorjs-alert';
import Strikethrough from '@sotaproject/strikethrough';
import Annotation from 'editorjs-annotation';
import EditorJSInlineHotkey from 'editorjs-inline-hotkey';

const Editor = () => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      // data: {
      //   blocks: [
      //     { type: 'header', data: { text: 'Heading Example', level: 2 } },
      //     { type: 'paragraph', data: { text: 'This is a paragraph.' } },
      //     {
      //       type: 'list',
      //       data: { style: 'unordered', items: ['Item 1', 'Item 2'] },
      //     },
      //     { type: 'codeBox', data: { code: 'console.log("Hello, world!");' } },
      //     { type: 'inlineCode', data: { text: 'const x = 1;' } },
      //     {
      //       type: 'alert',
      //       data: { type: 'info', message: 'This is an alert.' },
      //     },
      //     {
      //       type: 'warning',
      //       data: { title: 'Heads up', message: 'This is a warning.' },
      //     },
      //     {
      //       type: 'quote',
      //       data: { text: 'To be or not to be.', caption: 'Shakespeare' },
      //     },
      //     {
      //       type: 'table',
      //       data: {
      //         content: [
      //           ['Col1', 'Col2'],
      //           ['1', '2'],
      //         ],
      //       },
      //     },
      //     { type: 'delimiter', data: {} },
      //     {
      //       type: 'toggle',
      //       data: { title: 'Toggle title', message: 'Toggle content' },
      //     },
      //     { type: 'strikethrough', data: { text: 'Strikethrough this.' } },
      //     { type: 'annotation', data: { text: 'Important note here.' } },
      //     { type: 'InlineHotkey', data: { text: 'Ctrl+Shift+1' } },
      //     {
      //       type: 'embed',
      //       data: {
      //         service: 'youtube',
      //         source: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      //         embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      //         width: 580,
      //         height: 320,
      //         caption: 'YouTube Video',
      //       },
      //     },
      //   ],
      // },
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          config: {
            placeholder: 'Enter a heading',
            levels: [1, 2, 3],
            defaultLevel: 2,
          },
          shortcut: 'CMD+SHIFT+H',
        },
        list: {
          class: EditorjsList as unknown as ToolConstructable,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        },
        codeBox: {
          class: CodeBox as unknown as ToolConstructable,
          config: {
            themeURL:
              'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/atom-one-dark.min.css',
            themeName: 'atom-one-dark',
          },
        },
        inlineCode: {
          class: InlineCode as unknown as ToolConstructable,
          shortcut: 'CMD+SHIFT+M',
        },
        alert: {
          class: Alert as unknown as ToolConstructable,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+A',
          config: {
            alertTypes: ['info', 'success', 'warning', 'danger'],
            defaultType: 'primary',
            defaultAlign: 'left',
            messagePlaceholder: 'Enter something',
          },
        },
        quote: {
          class: Quote as unknown as ToolConstructable,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
        },
        table: {
          class: Table as unknown as ToolConstructable,
          inlineToolbar: true,
          config: {
            withHeadings: true,
            rows: 2,
            cols: 3,
          },
        },
        attaches: {
          class: AttachesTool as unknown as ToolConstructable,
          config: {
            endpoint: '',
          },
        },
        delimiter: {
          class: Delimiter as unknown as ToolConstructable,
          config: {
            styleOptions: ['star', 'dash', 'line'],
            defaultStyle: 'star',
            lineWidthOptions: [8, 15, 25, 35, 50, 60, 100],
            defaultLineWidth: 25,
            lineThicknessOptions: [1, 2, 3, 4, 5, 6],
            defaultLineThickness: 2,
          },
        },
        toggle: {
          class: ToggleBlock as unknown as ToolConstructable,
          inlineToolbar: true,
        },
        strikethrough: Strikethrough,
        annotation: Annotation,
        InlineHotkey: EditorJSInlineHotkey,
        embed: {
          class: Embed as unknown as ToolConstructable,
          config: {
            services: {
              facebook: true,
              twitter: true,
              youtube: true,
              github: true,
              codepen: true,
              gfycat: true,
              'twitch-video': true,
            },
          },
        },
      },
    });

    editorRef.current = editor;

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((e) => console.error('EditorJS cleanup failed:', e));
    };
  }, []);

  const handleSave = async () => {
    if (!editorRef.current) return;
    const output = await editorRef.current.save();
    await saveEditorData(output);
  };

  return (
    <section className="border-border bg-background mb-4 flex w-full flex-col items-center justify-center rounded-md border-2 p-4 text-base shadow-sm">
      <div id="editorjs" className="w-[60%]" />
      <Button onClick={handleSave} className="place-self-start">
        Save
      </Button>
    </section>
  );
};

export default Editor;
