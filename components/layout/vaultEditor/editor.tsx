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
import Warning from '@editorjs/warning';
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
            alertTypes: [
              'primary',
              'secondary',
              'info',
              'success',
              'warning',
              'danger',
              'light',
              'dark',
            ],
            defaultType: 'primary',
            defaultAlign: 'left',
            messagePlaceholder: 'Enter something',
          },
        },
        warning: {
          class: Warning as unknown as ToolConstructable,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+W',
          config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
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
    const dummyData = {
      blocks: [],
      version: '2.30.8',
      time: Date.now(),
    };
    await saveEditorData(dummyData);
  };

  return (
    <div>
      <div id="editorjs" className="border-2" />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default Editor;
