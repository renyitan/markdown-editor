import { Flex, Segment } from '@fluentui/react-northstar';
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
        <Segment content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis velit non gravida venenatis. Praesent consequat lectus purus, ut scelerisque velit condimentum eu. Maecenas sagittis ante ut turpis varius interdum. Quisque tellus ipsum, eleifend non ipsum id, suscipit ultricies neque." />
      </Flex.Item>
    </Flex>
  );
};

export default App;
