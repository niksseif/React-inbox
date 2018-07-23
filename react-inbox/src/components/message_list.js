import React, { Component } from 'react';
import Message from './message';


class Messages extends Component {
  render() {
    // console.log("this.props on messages component = ", this.props);
    const { messages, toggleStar, toggleSelect } = this.props

    return (
      <div className="Messages">
        {messages.map(message => (
          <Message
            key={message.id}
            message={message}
            toggleStar={toggleStar}
            toggleSelect={toggleSelect}
          />
        ))}
      </div>
    );
  }
}

export default Messages;
