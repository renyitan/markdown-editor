/* eslint-disable import/no-anonymous-default-export */

export default (
  state: { content: any },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case 'UPDATE_CONTENT':
      return {
        content: action.payload,
      };
    default:
      return state;
  }
};
