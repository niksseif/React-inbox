/* eslint-es6 */
import React, { Component } from 'react';


class Toolbar extends Component {
  render() {
    const {
      messages, showCompose, handleToggleRead, handleToggleUnRead, deleteMessage, addLabel, removeLabel, selectAllBtnAction, toolbarMessageIconChange,
    } = this.props;

    const composedMessage = (e) => {
      e.stopPropagation();
      showCompose();
    };
    const unreadCount = messages.filter(message => !message.read).length;
    const selectedCount = messages.filter(message => message.selected).length;
    let selectAllClass;

    switch (selectedCount) {
      case 0:
        selectAllClass = 'fa-square-o';
        break;
      case messages.length:
        selectAllClass = 'fa-check-square-o';
        break;
      default:
        selectAllClass = 'fa-minus-square-o';
    }


    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            {/* this is showing the unread count in the toolbar  */}
              <span className="badge badge">
                { unreadCount }
              </span>
          unread messages
          </p>

            <a className="btn btn-danger">
              <i
                className="fa fa-plus"
                onClick={composedMessage}
              />
            </a>
              <button
                className="btn btn-default"
                onClick={selectAllBtnAction}
                disabled={selectedCount === 0}
              >
                <i className={`fa fa${toolbarMessageIconChange}-square-o`} />
              </button>

          {/* we want to call handleToggleRead with all the selected messages */}
            <button
              className="btn btn-default"
              onClick={handleToggleRead}
              disabled={selectedCount === 0}
            >
          Mark As Read
            </button>
              <button
                className="btn btn-default"
                onClick={handleToggleUnRead}
                disabled={selectedCount === 0}
              >
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

                  <select
                    className="form-control label-select remove-label"
                    onChange={removeLabel}
                  >
                    <option>Remove label</option>
                      <option value="dev">dev</option>
                        <option value="personal">personal</option>
                          <option value="gschool">gschool</option>
                  </select>
                    <button
                      className="btn btn-default"
                      onClick={deleteMessage}
                      disabled={selectedCount === 0}
                    >
                      <i className="fa fa-trash-o" />
                    </button>
        </div>
      </div>
    );
  }
}


export default Toolbar;
