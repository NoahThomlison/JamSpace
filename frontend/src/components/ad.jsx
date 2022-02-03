import React from 'react';

function Ad(props) {
  const { userName } = props;
  return <div className='App'>Ad Component for {userName} </div>;
}

export default Ad;
