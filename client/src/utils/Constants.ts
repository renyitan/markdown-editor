import { Descendant } from 'slate';

export const FONT_STYLES = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  CODE: 'code',
};

export interface IHotKeys {
  [key: string]: string;
}

export const HOTKEYS: IHotKeys = {
  'mod+b': FONT_STYLES.BOLD,
  'mod+i': FONT_STYLES.ITALIC,
  'mod+`': FONT_STYLES.CODE,
};

export const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '## Hello' }],
  },
];
