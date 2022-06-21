// @refresh reset
import { createEditor, BaseEditor, Node } from 'slate';
import { Divider } from '@fluentui/react-northstar';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { useMemo, useContext } from 'react';
import isHotKey from 'is-hotkey';

import { initialValue, HOTKEYS } from '../utils/Constants';
import { insertMarkdownAnnotations } from '../utils/EditorUtils';
import { StateContext } from '../context/State';
import EditorToolBar from './EditorToolbar';

type ParagraphElement = { type: 'paragraph'; children: CustomText[] };
type CodeElement = { type: 'code'; children: CustomText[] };
type CustomElement = ParagraphElement | CodeElement;
type CustomText = { text: string; bold?: true };

export type CustomEditor = BaseEditor & ReactEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const MarkdownEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const { updateContent } = useContext(StateContext);

  const outputString = (nodes: any[]) => {
    const content = nodes.map((n: any) => Node.string(n)).join('\n');
    updateContent(content);
  };

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={() => outputString(editor.children)}
    >
      <EditorToolBar />
      <Divider />

      <Editable
        style={{ height: '100%', maxWidth: '100%' }}
        autoFocus
        onKeyDown={(event: any) => {
          for (const hotkey in HOTKEYS) {
            if (isHotKey(hotkey, event as any)) {
              event.preventDefault();
              const annotationType = HOTKEYS[hotkey];
              insertMarkdownAnnotations(editor, annotationType);
            }
          }
        }}
      />
    </Slate>
  );
};

export default MarkdownEditor;
