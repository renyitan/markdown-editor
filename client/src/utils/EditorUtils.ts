import { Editor } from 'slate';

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
