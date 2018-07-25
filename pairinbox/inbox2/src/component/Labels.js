import React from 'react';

const Labels = (props) => {
  console.log(props.labels,"<<<<<");
  return props.labels.map((label, i) => <span className="label label-warning" key={i}>{label}</span>)

}
export default Labels;
