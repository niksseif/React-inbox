import React from 'react';
import Labels from './Labels'


const Message = (props) =>{

  // const toggleStar = (e) => {
  //    // set state
  //    const index = props.message
  // }

  return (
    <div className={`row message ${props.message.read ? 'read ' : 'unread'}`} >
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className={`star fa fa-star${props.message.starred ? '' : '-o'}`} onClick={ toggleStar()}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <Labels labels={props.message.labels} />
        <a href="#">{props.message.subject}</a>
      </div>
    </div>
  );
}

    // {
    //   "id": 8,
    //   "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    //   "read": true,
    //   "starred": true,
    //   "labels": []
    // }

export default  Message;
