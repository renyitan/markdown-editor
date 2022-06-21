import { Toolbar } from '@fluentui/react-northstar';
import * as React from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  FontSizeIcon,
  RemoveFormatIcon,
  OutdentIcon,
  IndentIcon,
  MoreIcon,
  LinkIcon,
  CodeSnippetIcon,
  QuoteIcon,
} from '@fluentui/react-icons-northstar';

import { toggleMark, insertMarkdownAnnotations } from '../utils/EditorUtils';

const stateReducer: React.Reducer<
  { bold: boolean; italic: boolean; underline: boolean; more: boolean },
  'bold' | 'italic' | 'underline' | 'more'
> = (prevState, action) => ({ ...prevState, [action]: !prevState[action] });

const EditorToolBar = () => {
  const [state, dispatch] = React.useReducer(stateReducer, {
    bold: false,
    italic: false,
    more: false,
    underline: false,
  });

  const editor = useSlate();

  return (
    <Toolbar
      aria-label="Default"
      items={[
        {
          icon: <BoldIcon {...{ outline: true }} />,
          key: 'bold',
          kind: 'toggle',
          active: state.bold,
          title: 'Toggle bold',
          onClick: () => {
            insertMarkdownAnnotations(editor, 'bold');
            ReactEditor.focus(editor);
          },
        },
        {
          icon: <ItalicIcon {...{ outline: true }} />,
          key: 'italic',
          kind: 'toggle',
          active: state.italic,
          title: 'Toggle italic',
          onClick: (event) => {
            insertMarkdownAnnotations(editor, 'italic');
            ReactEditor.focus(editor);
          },
        },
        // {
        //   icon: <UnderlineIcon {...{ outline: true }} />,
        //   key: 'underline',
        //   kind: 'toggle',
        //   active: state.underline,
        //   title: 'Toggle underline',
        //   onClick: (event) => {
        //     dispatch('underline');
        //     toggleMark(editor, 'underline');
        //     ReactEditor.focus(editor);
        //   },
        // },
        // { key: 'divider-1', kind: 'divider' },
        // {
        //   icon: <FontSizeIcon {...{ outline: true }} />,
        //   key: 'font-size',
        //   title: 'Font size',
        // },
        // {
        //   icon: <RemoveFormatIcon {...{ outline: true }} />,
        //   key: 'remove-format',
        //   title: 'Remove formatting',
        // },
        // { key: 'divider-2', kind: 'divider' },
        // {
        //   icon: <OutdentIcon {...{ outline: true }} />,
        //   key: 'outdent',
        //   title: 'Outdent',
        // },
        // {
        //   icon: <IndentIcon {...{ outline: true }} />,
        //   key: 'indent',
        //   title: 'Indent',
        // },
        // { key: 'divider-3', kind: 'divider' },
        // {
        //   icon: <MoreIcon {...{ outline: true }} />,
        //   key: 'more',
        //   active: state.more,
        //   title: 'More',
        //   menu: [
        //     { key: 'quote', content: 'Quote', icon: <QuoteIcon /> },
        //     {
        //       key: 'link',
        //       content: 'Link',
        //       icon: <LinkIcon />,
        //       disabled: true,
        //     },
        //     { key: 'code', content: 'Code snippet', icon: <CodeSnippetIcon /> },
        //   ],
        //   menuOpen: state.more,
        //   onMenuOpenChange: () => dispatch('more'),
        // },
      ]}
    />
  );
};

export default EditorToolBar;