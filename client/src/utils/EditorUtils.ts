import { BaseEditor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import { ANNOTATIONS } from './Constants';

export const insertMarkdownAnnotations = (
  editor: BaseEditor & ReactEditor,
  annotationType: any
) => {
  let moveLeft = 0;
  switch (annotationType) {
    case ANNOTATIONS.BOLD:
      editor.insertText('****');
      moveLeft = -2;
      break;
    case ANNOTATIONS.ITALIC:
      editor.insertText('__');
      moveLeft = -1;
      break;
    case ANNOTATIONS.CODE:
      editor.insertText('``');
      moveLeft = -1;
      break;
    case ANNOTATIONS.STRIKE:
      editor.insertText('~~');
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
