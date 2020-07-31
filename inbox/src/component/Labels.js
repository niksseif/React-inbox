import React from 'react';

const Labels = (props) => {
  return props.labels.map((label, i) => <span className="label label-warning" key={label}>{label}</span>)

}
export default Labels;
