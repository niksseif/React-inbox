
import Labels from './Labels'
import React, { Component } from 'react';



//

// toggleRead, toggleStar, toggleSelected

class Message extends Component {
  state = { markRead: this.props.markRead }
  render(){
    const { message, handleToggleStar, handleToggleSelected, handleToggleRead, addLabel,removeLabel } = this.props

    const starMessage = e => {
      e.stopPropagation();
      handleToggleStar(message)
    }
    //selected messages function
    const selectedMessage = e => {
    e.stopPropagation();  
    handleToggleSelected(message);
 
    }

    const selectedRead =  e => {
      e.stopPropagation();
     
       handleToggleRead(e); 
    }
   


    return(
      <div className={`row message ${message.read ? 'read ' : 'unread'} ${message.selected ? 'selected' : null} ` } >
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
           
              <input
                type="checkbox"
                checked={message.selected ? true : false}
                // readOnly={true}
                onClick={(e) => selectedMessage(e)}
               />
            </div>
            <div className="col-xs-2">
              <i className={`star fa fa-star${message.starred ? '' : '-o'}`}
                onClick={starMessage}>

                </i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <Labels labels={message.labels}

           />
          <a href="#">{message.subject}</a>
        </div>
      </div>
    )

  }
}


export default  Message;
