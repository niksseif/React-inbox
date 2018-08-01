import React, {Component} from 'react'


class Toolbar extends Component {

  render() {
    const {messages, showCompose,handleToggleRead,handleToggleUnRead, deleteMessage, addLabel,removeLabel, selectAllBtnAction,toolbarMessageIconChange} = this.props
    //filter theough the messages with read false and count them;
    console.log(messages,"<<<<messages");
    // let unreadCount = messages.filter(message => !message.read).length;
    //filter through the selected messages are selected and count them

        const composedMessage = e => {
          e.stopPropagation();
          showCompose()
        }


    return (<div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          {/*this is showing the unread count in the toolbar  */}
          <span className="badge badge">
            {/* {unreadCount} */}
          </span>
          unread messages
        </p>

        <a className="btn btn-danger">
          <i className="fa fa-plus"
            onClick={composedMessage}></i>
        </a>

        <button className="btn btn-default"
          onClick={selectAllBtnAction}
          >
          <i className={`fa fa${toolbarMessageIconChange}-square-o`}></i>
        </button>

        {/* we want to call handleToggleRead with all the selected messages */}
        <button className="btn btn-default" onClick={ handleToggleRead}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={ handleToggleUnRead}>
          Mark As Unread
        </button>

        <select
          className="form-control label-select add-label"
          onChange={addLabel}
           >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select remove-label"
          onChange={removeLabel}
          >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={deleteMessage} >
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>)
  }
}


export default Toolbar;
