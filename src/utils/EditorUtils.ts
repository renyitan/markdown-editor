import { BaseEditor, Transforms, Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import { ANNOTATIONS } from './Constants';

export const insertMarkdownAnnotations = (
  editor: BaseEditor & ReactEditor,
  annotationType: any
): void => {
  let moveLeft = 0;

  let selectedText = editor.selection
    ? Editor.string(editor, editor.selection)
    : '';
  switch (annotationType) {
    case ANNOTATIONS.BOLD:
      editor.insertText(`**${selectedText}**`);
      moveLeft = -2;
      break;
    case ANNOTATIONS.ITALIC:
      editor.insertText(`_${selectedText}_`);
      moveLeft = -1;
      break;
    case ANNOTATIONS.CODE:
      editor.insertText(`\`${selectedText}\``);
      moveLeft = -1;
      break;
    case ANNOTATIONS.STRIKE:
      editor.insertText(`~${selectedText}~`);
      moveLeft = -1;
      break;
    case ANNOTATIONS.UNDERLINE:
      editor.insertText(`<u>${selectedText}</u>`);
      moveLeft = -4;
      break;
    default:
      break;
  }
  const selection = editor?.selection ?? null;
  const currentOffSet = selection?.anchor.offset || 0;
  const path = selection?.anchor?.path || [0, 0];
  Transforms.select(editor, { path: path, offset: currentOffSet + moveLeft });
};
