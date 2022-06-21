import { Flex, Segment, Text, Divider } from '@fluentui/react-northstar';

import MarkdownEditor from './components/MarkdownEditor';
import MarkdownRenderer from './components/MarkdownRenderer';

const App = () => {
  return (
    <Flex
      gap="gap.small"
      padding="padding.medium"
      style={{ minHeight: 500, maxWidth: '100%' }}
    >
      <Flex.Item size="size.half">
        <Segment>
          <MarkdownEditor />
        </Segment>
      </Flex.Item>

      <Flex.Item size="size.half">
        <Segment>
          <Text content="Preview" size="larger" weight="semibold" />
          <Divider />
          <MarkdownRenderer />
        </Segment>
      </Flex.Item>
    </Flex>
  );
};

export default App;
