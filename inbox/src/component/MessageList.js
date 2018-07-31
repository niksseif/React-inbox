import React, { Component } from 'react';
import Message from './Message';


class MessageList extends Component {
  render(){
  const {messages, toggleStar, toggleSelected, handleToggleStar, handleToggleSelected, handleToggleRead} = this.props
  return (
    messages.map(message => <Message
      message={message}
      key={message.id}
      toggleStar={toggleStar}
      toggleSelected={toggleSelected}
      handleToggleStar={handleToggleStar}
      handleToggleSelected={handleToggleSelected}
      handleToggleRead={handleToggleRead}

    />
    )

)
}
  }


export default MessageList;