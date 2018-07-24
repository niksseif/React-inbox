import React from 'react';
import Message from './Message';


const MessageList = (props) => {
  return props.messages.map(message => <Message message={message} key={message.id}/>)

  }


export default MessageList;
