import React from 'react';

const SlateElement = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          style={{ borderLeft: "solid", borderLeftWidth: "2",  borderLeftColor: "#ddd", marginLeft: 0, marginRight: 0, paddingLeft: 10, color: "#aaa" }}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export default SlateElement;
