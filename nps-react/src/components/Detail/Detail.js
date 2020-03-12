import React, { useState } from 'react';

import './Detail.css';

function Detail(props) {
  // States
  const [icon] = useState(props.icon);
  const [field] = useState(props.field);
  const [fieldValue] = useState(props.fieldValue);
  
  return (
    <div className="detailItem">
      <span className="detailItemField"><i className="material-icons">{icon}</i>{field}: </span>
      <span className="detailItemValue">{fieldValue}</span>
    </div>
  );
}

export default Detail;