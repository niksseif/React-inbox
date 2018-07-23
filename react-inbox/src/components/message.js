import React, { Component } from 'react';

class Message extends Component {
  render(){
     const { message, toggleStar, toggleSelect } = this.props;
     // console.log(message,"<<<message");
     const readClass= message.read ? "read" : "unread";
     const starClass = message.starred ? "fa-star" : "fa-start-o";
     const selectedClass = message.selected ? "selected" : "";

     const starMessage = e =>{
       //stop propagation won't let the event to bobble
       e.stopPropagation();
       toggleStar(message);
     };
     const labels = message.labels.map((label, index) => (
      <span key={index} className="label label-warning">
        {label}
      </span>
    ))

    return(
      <div className={`row message ${readClass} ${selectedClass}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
                type="checkbox"
                checked={!!message.selected}
                onClick={() => toggleSelect(message)}
                readOnly={true} />
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starClass}`} onClick={starMessage} />
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {labels}
          {message.subject}
        </div>
      </div>
    );
  }


}




export default Message;
