import { Toolbar } from '@fluentui/react-northstar';
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
  StrikeIcon,
} from '@fluentui/react-icons-northstar';

import { ANNOTATIONS } from '../utils/Constants';
import { insertMarkdownAnnotations } from '../utils/EditorUtils';

const EditorToolBar = () => {
  const editor = useSlate();

  return (
    <Toolbar
      aria-label="Default"
      items={[
        {
          icon: <BoldIcon {...{ outline: true }} />,
          key: ANNOTATIONS.BOLD,
          title: 'Toggle bold',
          onClick: () => {
            insertMarkdownAnnotations(editor, ANNOTATIONS.BOLD);
            ReactEditor.focus(editor);
          },
        },
        {
          icon: <ItalicIcon {...{ outline: true }} />,
          key: ANNOTATIONS.ITALIC,
          title: 'Toggle italic',
          onClick: () => {
            insertMarkdownAnnotations(editor, ANNOTATIONS.ITALIC);
            ReactEditor.focus(editor);
          },
        },
        {
          icon: <UnderlineIcon {...{ outline: true }} />,
          key: ANNOTATIONS.UNDERLINE,
          title: 'Toggle underline',
          onClick: (event) => {
            insertMarkdownAnnotations(editor, ANNOTATIONS.UNDERLINE);
            ReactEditor.focus(editor);
          },
        },
        {
          icon: <StrikeIcon {...{ outline: true }} />,
          key: ANNOTATIONS.STRIKE,
          title: 'Toggle strike',
          onClick: () => {
            insertMarkdownAnnotations(editor, ANNOTATIONS.STRIKE);
            ReactEditor.focus(editor);
          },
        },

        { key: 'divider-1', kind: 'divider' },
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
