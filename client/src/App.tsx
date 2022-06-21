import { Flex, Segment } from '@fluentui/react-northstar';
import Markdown from 'marked-react';

import Editor from './MarkdownEditor';

const App = () => {
  return (
    <Flex
      gap="gap.small"
      padding="padding.medium"
      style={{
        minHeight: 500,
      }}
    >
      <Flex.Item size="size.half">
        <Segment>
          <Editor />
        </Segment>
      </Flex.Item>

      <Flex.Item size="size.half">
        <Segment>
          <Markdown>## Hello</Markdown>
        </Segment>
      </Flex.Item>
    </Flex>
  );
};

export default App;
