import React, { Component } from 'react';

class ComposeMessageComponent extends Component {
  render() {
    const { display, addMessage } = this.props

    const sendMessage = e => {
      e.preventDefault()
      const subject = document.querySelector("#subject")
      const body = document.querySelector("#body")

      addMessage({ subject: subject.value, body: body.value })

      subject.value = ""
      body.value = ""
    }

    return (
      <form
        className="form-horizontal well"
        style={{ display: display ? "block" : "none" }}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">
            Subject
          </label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control"></textarea>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input
              type="submit"
              value="Send"
              className="btn btn-primary"
              onClick={sendMessage}/>
          </div>
        </div>
      </form>
    );
  }
}

export default ComposeMessageComponent;
