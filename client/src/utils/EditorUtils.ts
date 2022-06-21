import { Editor, Element, BaseEditor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import { FONT_STYLES } from './Constants';

export const isMarkActive = (editor: any, format: any) => {
  const marks = Editor.marks(editor) as any;
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor: any, format: any, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    })
  );
  return !!match;
};

export const insertMarkdownAnnotations = (
  editor: BaseEditor & ReactEditor,
  annotationType: any
) => {
  let moveLeft = 0;
  switch (annotationType) {
    case FONT_STYLES.BOLD:
      editor.insertText('****');
      moveLeft = -2;
      break;
    case FONT_STYLES.ITALIC:
      editor.insertText('__');
      moveLeft = -1;
      break;
    case FONT_STYLES.CODE:
      editor.insertText('``');
      moveLeft = -1;
      break;
    default:
      break;
  }

  const selection = editor?.selection ?? null;
  const currentOffSet = selection?.anchor.offset || 0;
  const path = selection?.anchor?.path || [0, 0];
  Transforms.select(editor, { path: path, offset: currentOffSet + moveLeft });
};
