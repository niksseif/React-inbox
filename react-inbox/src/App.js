import React, { Component } from 'react';
import ToolBar from './components/toolBar'
import MessagesList from './components/message_list';
import ComposeMessageComponent from './components/compose_message_component';

import './App.css';

class App extends Component {
  state = {
    messages :[]
  }
  //fetch messages from the api
  componentDidMount = async () => {
    const response = await fetch("http://localhost:8082/api/messages")
    const messages = await response.json()

    this.setState({
      messages: [
        ...this.state.messages,
        ...messages.map(message => ({
          ...message,
          selected: false
        }))
      ],
      display: false
    })
  }
  //made thr toggle
  toggleCompose = () => {
     this.setState({ display: !this.state.display })
   }
//composing a new mwssage
addMessage = async (composeMessage) => {
    const { subject, body } = composeMessage
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "POST",
      body: JSON.stringify({
        subject,
        body
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    const message = await response.json()
    console.log("messages === ", this.state.messages);
    console.log("new message == ", message);

    this.setState({
      messages: [
        ...this.state.messages,
        message
      ],
      display: !this.state.display
    })
    console.log(this.state);
  }

//
  toggleProperty = async (message, property) => {
   const index = this.state.messages.indexOf(message)

   this.setState({
     messages: [
       ...this.state.messages.slice(0, index),
       { ...message, [property]: !message[property] },
       ...this.state.messages.slice(index + 1)
     ]
   })
 }

////staring the message
 toggleStar = async message => {
   // PATCH request on starred
   await fetch("http://localhost:8082/api/messages", {
     method: "PATCH",
     body: JSON.stringify({
       messageIds: [message.id],
       command: "star",
       star: message.starred
     }),
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
     }
   })

   this.toggleProperty(message, "starred")
 }

 toggleSelect = message => {
   this.toggleProperty(message, "selected")
 }

 markReadStatus = async readStatus => {
   // filter out selected messages
   const selectedMessages = this.state.messages.filter(message => message.selected)

   // PATCH request on mark read status
   await fetch("http://localhost:8082/api/messages", {
     method: "PATCH",
     body: JSON.stringify({
       messageIds: [...selectedMessages.map(message => message.id)],
       command: "read",
       read: readStatus
     }),
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
     }
   })

   this.setState({
     messages: this.state.messages.map(message => (message.selected ? {...message, read: readStatus} : message))
   })
 }
 //deleting the messages
 deleteMessages = async () => {
    const messages = this.state.messages.filter(message => !message.selected);

    // filter out selected messages
    const selectedMessages = this.state.messages.filter(message => message.selected)

    // PATCH request on deleting messages
    await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({
        messageIds: [...selectedMessages.map(message => message.id)],
        command: "delete"
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })

    this.setState({ messages })
  }
  //apply label
  applyLabel = async label => {
    const messages = this.state.messages.map(message =>
      message.selected && !message.labels.includes(label)
        ? {...message, labels: [...message.labels, label].sort()}
        : message
    )
    // filter out selected messages
    const selectedMessages = this.state.messages.filter(message => message.selected)

    // PATCH request on applying labels
    await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({
        messageIds: [...selectedMessages.map(message => message.id)],
        command: "addLabel",
        label
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })

    this.setState({ messages })
  }
  //remove label
  removeLabel = async label => {
    const messages = this.state.messages.map(message => {
      const index = message.labels.indexOf(label)
      if (message.selected && index > -1) {
        return {
          ...message,
          labels: [
            ...message.labels.slice(0, index),
            ...message.labels.slice(index + 1)
          ]
        }
      }
      return message
    })
//here you need to filter out selected messages
const selectedMessages = this.state.messages.filter(message => message.selected)

// PATCH request on removing labels
await fetch("http://localhost:8082/api/messages", {
  method: "PATCH",
  body: JSON.stringify({
    messageIds: [...selectedMessages.map(message => message.id)],
    command: "removeLabel",
    label
  }),
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})

this.setState({ messages })
}

toggleSelectAll = () => {
const selectedMessages = this.state.messages.filter(message => message.selected)

const selected = selectedMessages.length !== this.state.messages.length
this.setState({
  messages: this.state.messages.map(message => message.selected !== selected ? { ...message, selected } : message)
})
}


  render() {
    return (
      <div className="App">
        <ToolBar
          messages={this.state.messages}
          toggleCompose={this.toggleCompose}
          toggleSelectAll={this.toggleSelectAll}
          markReadStatus={this.markReadStatus}
          deleteMessages={this.deleteMessages}
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel}

         />
         <ComposeMessageComponent
         display={this.state.display}
         addMessage={this.addMessage}
       />
         <MessagesList
          messages={this.state.messages}
          toggleStar={this.toggleStar}
          toggleSelect={this.toggleSelect}
        />
       </div>
    );
  }
}

export default App;
