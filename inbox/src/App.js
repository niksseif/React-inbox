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
    console.log(response,"<<<<RESPONSE");
    this.showCompose()
}
//updating the status of the message.
updateMessages = async () => {
  const response = await fetch('http://localhost:8082/api/messages')
  const json = await response.json()
  this.setState({messages: json})
}
//deleting the message
deleteMessage =  async () => {
  const selected = this.state.messages.filter(message => message.selected)
  const messageIds = selected.map(message => message.id)

  await fetch('http://localhost:8082/api/messages',
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({

      messageIds,
      "command": "delete"
    })
  })
  .then(response => this.updateMessages())
}

//update
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
handleToggleRead = async (message) => {
  let postData ={
    command: 'read',
    read : !message.read,
    messageIds: [message.id]
  }
  const messagesJson = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(postData)
      })
      let messages = await messagesJson.json()
      console.log("Came back from the patch and parsed json and got: ", messages)
        // when the response comes back, we should get all the messages back, so just setState on the response
      this.setState({messages})
}
//unread messages
//
handleToggleUnRead = async (message) => {
  let postData ={
    command: 'read',
    read : !message.read,
    messageIds: [message.id]
  }
  const messagesJson = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(postData)
      })
      let messages = await messagesJson.json()
      console.log("Came back from the patch and parsed json and got: ", messages)
        // when the response comes back, we should get all the messages back, so just setState on the response
      this.setState({messages})
}


//switching between two properties of starred
//Pathching the api with our updated stared messages.
handleToggleStar = async(message) => {
  this.toggleProperty(message, 'starred')
  let postData = {
    command:"star",
    messageId:[message.id]
  }
    const messagesJson = await fetch('http://localhost:8082/api/messages',{
      method:'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(postData)
    }
  )
  let messages = await messagesJson.json()
  this.setState({messages})
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

//add label
addLabel = async () => {
  const label = document.querySelector('.add-label').value
  const selected = this.state.messages.filter(message => message.selected)
  const messageIds = selected.map(message => message.id)
  console.log(messageIds, label);
  await fetch('http://localhost:8082/api/messages',
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      messageIds,
      command: "addLabel",
      label,
    })
  })
  .then(response => this.updateMessages()
  )
}

//remove Labels
removeLabel = async () => {
  const label = document.querySelector('.remove-label').value
  const selected = this.state.messages.filter(message => message.selected)
  const messageIds = selected.map(message => message.id)
  console.log(messageIds, label);
  await fetch('http://localhost:8082/api/messages',
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      messageIds,
      command: "removeLabel",
      label,
    })
  })
  .then(response => this.updateMessages()
  )
}
//select all for thr button in the toolbar
selectAllBtnAction = () => {
      let numMessageSelected = this.state.messages.filter((message) => {
        return message.selected
      }).length

      if(numMessageSelected === this.state.messages.length) {
        this.setState({
          message: this.state.messages.map((message) => {
            message.selected = false
            return message
          })
        })
      } else {
        this.setState({
          message: this.state.messages.map((message) => {
            message.selected = true
            return message
          })
        })
      }
    }



  render() {
    return (
      <div className="container">
        <div className="App">
        <Toolbar
          messages={this.state.messages}
          read={this.state.toggleRead}
          starred= {this.state.toggleStar}
          selected = {this.state.handleToggleSelected}
          showCompose={this.showCompose}
          handleToggleUnRead={this.handleToggleUnRead}
          handleToggleRead={this.handleToggleRead}
          deleteMessage={this.deleteMessage}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          selectAllBtnAction={this.selectAllBtnAction}
        />
        <ComposeMessageComponent
          showCompose={this.state.showComposeForm}
          sendMessage={this.sendMessage}
        />
        <MessageList
          messages={this.state.messages}
          handleToggleStar={this.handleToggleStar}
          handleToggleSelected={this.handleToggleSelected}
          handleToggleRead={this.handleToggleRead}
          handleToggleUnRead={this.handleToggleUnRead}
          deleteMessage={this.deleteMessage}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}

        />
      </div>
    </div>
    )
  }
}

export default App;
