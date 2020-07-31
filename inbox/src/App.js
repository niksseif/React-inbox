import React, { Component } from 'react';
import './App.css';
import Toolbar from './component/Toolbar';
import MessageList from './component/MessageList';
import ComposeMessageComponent from './component/composeMessage'

class App extends Component {
  state = {
    messages:[],
   
  }

  //fetch messages from API
  componentDidMount = async () => {
    const response = await fetch('https://mysterious-woodland-86329.herokuapp.com/api/messages')
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
//changing classname of the message icons
toolbarMessageIconChange = () => {
      let numMessageSelected = this.state.messages.filter((message) => {
        return message.selected
      }).length

      let action = ''

      if (numMessageSelected === this.state.messages.length){
        action = '-check'
      } else if (numMessageSelected === 0) {
        action = ''
      } else {
        action = '-minus'
      }

      return action
    }
//posting the new message to the API
sendMessage = async () => {
  const subject = document.querySelector('#subject').value
  const body = document.querySelector('#body').value
  const response =
    await fetch('https://mysterious-woodland-86329.herokuapp.com/api/messages', {
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
   
    this.showCompose()
}
//updating the status of the message.
updateMessages = async () => {
  const response = await fetch('https://mysterious-woodland-86329.herokuapp.com/api/messages')
  const json = await response.json()
  json.map(message => {
    if (message.selected === true) {
      message.selected = false;
    }
    return message
  })
  this.setState({messages: json})
}
//deleting the message
deleteMessage =  async () => {
  const selected = this.state.messages.filter(message => message.selected)
  const messageIds = selected.map(message => message.id)

  await fetch('https://mysterious-woodland-86329.herokuapp.com/api/messages',
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
  let prop = { ...message, [property] : !message[property]}
  let re = [...this.state.messages.slice(0, index), prop, ...this.state.messages.slice(index + 1)]
   this.setState({
    messages: re
  })


}
//switching between properties of unread
handleToggleRead = async (event) => {
  event.preventDefault()
  const selectedMessages = this.state.messages.filter(message => message.selected)
  const messagesIds= selectedMessages.map(message => {return message.id})
  
  let postData ={
    command: 'read',
    read : true,
    messageIds: messagesIds
  }
  const messagesJson = await fetch('https://mysterious-woodland-86329.herokuapp.com/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(postData)
      })
  let messages = await messagesJson.json()
//here since the data is giving me always 2 messages with option selected true i need to assign selected to false.
  messages.map(message =>{
    if(message.selected === true){
      message.selected = false;
    }
    return message
  })

    // when the response comes back, we should get all the messages back, so just setState on the response
  this.setState({messages})
  
}
//unread messages
//
handleToggleUnRead = async (message) => {
  const selectedMessages = this.state.messages.filter(message => message.selected)
  const messagesIds= selectedMessages.map(message=>  message.id)
  let postData ={
    command: 'read',
    read : false,
    messageId: messagesIds
  }
  const messagesJson = await fetch('https://mysterious-woodland-86329.herokuapp.com/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(postData)
      })
      let messages = await messagesJson.json()
        // when the response comes back, we should get all the messages back, so just setState on the response

        //here i need to assign 2 selected messages to false. for some reason this api is having 2 selected messages assign to true.
  messages.map(message => {
    if (message.selected === true) {
      message.selected = false;
    }
    return message
  })
      this.setState({messages})
}


//switching between two properties of starred
//Pathching the api with our updated stared messages.

  handleToggleStar = async(message) => {
    const messagesJson = await fetch('https://mysterious-woodland-86329.herokuapp.com/api/messages',{
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
    this.toggleProperty(message, 'starred')
  }


//switching between selected
handleToggleSelected = message => {
  return this.toggleProperty(message,'selected')
}
 showCompose = () => {
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

  await fetch('https://mysterious-woodland-86329.herokuapp.com/api/messages',
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
  await fetch('https://mysterious-woodland-86329.herokuapp.com/api/messages',
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
  .then(response => this.updateMessages(response)
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
          showComposeForm = {this.state.showComposeForm}
          handleToggleUnRead={this.handleToggleUnRead}
          handleToggleRead={this.handleToggleRead}
          deleteMessage={this.deleteMessage}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          selectAllBtnAction={this.selectAllBtnAction}
          toolbarMessageIconChange={this.toolbarMessageIconChange}
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
          markRead={this.state.markRead}

        />
      </div>
    </div>
    )
  }
}

export default App;
