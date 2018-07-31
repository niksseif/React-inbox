import React from 'react';

const Labels = (props) => {
  console.log("I'm about to render some labels these are my props", props);
  return props.labels.map((label, i) => <span className="label label-warning" key={label}>{label}</span>)

}
export default Labels;
