import { Flex, Segment } from '@fluentui/react-northstar';
import ReactMarkdown from 'react-markdown';
import Editor from './Editor';

const App = () => {
  

  return (
    <Flex
      gap="gap.small"
      padding="padding.medium"
      style={{
        minHeight: 200,
      }}
    >
      <Flex.Item size="size.half">
        <Segment>
          <Editor />
        </Segment>
      </Flex.Item>

      <Flex.Item size="size.half">
        <Segment>
          Lorep ipsum
          {/* <ReactMarkdown children={markdown} /> */}
        </Segment>
      </Flex.Item>
    </Flex>
  );
};

export default App;
