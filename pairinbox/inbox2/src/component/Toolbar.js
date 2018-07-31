import React, {Component} from 'react'


class Toolbar extends Component {

  render() {
    const {messages, showCompose } = this.props
    //filter theough the messages with read false and count them;
    let unreadCount = messages.filter(message => message.read === false).length;
    // console.log(unreadCount,"<<<<unreadCount");
    //filter through the selected messages are selected and count them
    const selectedCount = messages.filter(message => message.selected).length
    //this function is for switching between selected classess
    let selectAllClass

        switch (selectedCount) {
          case 0:
            selectAllClass = 'fa-square-o'
            break;
          case messages.length:
            selectAllClass = 'fa-check-square-o'
            break;
          default:
            selectAllClass = 'fa-minus-square-o'

        }
        const composedMessage = e => {
          e.stopPropagation();
          showCompose()
        }


    return (<div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          {/*this is showing the unread count in the toolbar  */}
          <span className="badge badge">{unreadCount}</span>
          unread messages
        </p>

        <a className="btn btn-danger">
          <i className="fa fa-plus"
            onClick={composedMessage}></i>
        </a>

        <button className="btn btn-default">
          <i className={`fa ${selectAllClass}`}></i>
        </button>

        <button className="btn btn-default" >
          Mark As Read
        </button>

        <button className="btn btn-default" >
          Mark As Unread
        </button>

        <select className="form-control label-select add-label" >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select remove-label" >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" >
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>)
  }
}


export default Toolbar;
