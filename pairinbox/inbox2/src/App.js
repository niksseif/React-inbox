import React, { Component } from 'react';
import './App.css';
import Toolbar from './component/Toolbar';
import MessageList from './component/MessageList';
import ComposeMessageComponent from './component/composeMessage'

class App extends Component {
  state = {
    messages:[]
  }

  //fetch messages from API
  componentDidMount = async () => {
      const response = await fetch('http://localhost:8082/api/messages')
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
//posting the new message to the API
sendMessage = async () => {
  const subject = document.querySelector('#subject').value
  const body = document.querySelector('#body').value
  const response =
  await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        body,
      })
    })
    console.log(response);
    this.showCompose()
}

//update th
//this is toggle property//using this function to swith between props of the message.
//for example between read and unread.// stared or unstared

toggleProperty(message, property) {
  const index = this.state.messages.indexOf(message)
  this.setState({
    messages: [
      ...this.state.messages.slice(0, index),
      {...message, [property]: !message[property]},
      ...this.state.messages.slice(index + 1)
    ]
  })

}
//switching between properties of unread
handleToggleRead = message => {
  console.log("clicked toggleRead ----------------------");
  this.toggleProperty(message, 'read')
  console.log(message,"<<<message");
}
//switching between two properties of starred
handleToggleStar = message => {
  this.toggleProperty(message, 'starred')

}
//switching between selected
handleToggleSelected = message => {
  this.toggleProperty(message,'selected')
}
 showCompose = () => {
   console.log('composed message clicked');
   this.setState({
    showComposeForm: !this.state.showComposeForm,
    showMessages: !this.state.showMessages,
   })
 }


  render() {
    return (
      <div className="container">
        <div className="App">
        <Toolbar
          messages={this.state.messages}
          read={this.state.toggleRead}
          starred= {this.state.toggleStar}
          selected = {this.state.toggSelected}
          showCompose={this.showCompose}
        />
        <ComposeMessageComponent
          showCompose={this.showCompose}
        />
        <MessageList
          messages={this.state.messages}
          handleToggleStar={this.handleToggleStar}
          handleToggleSelected={this.handleToggleSelected}
          handleToggleRead={this.handleToggleRead}
        />
      </div>
    </div>
    )
  }
}

export default App;