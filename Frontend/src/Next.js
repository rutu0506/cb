import React from 'react';
import Header from './components/Header'
import Message from './components/Message'

class Next extends React.Component
{
  render() 
  {
    return (
      <div>
        <Header/>
        <Message/>
      </div>
    );
  }
}

export default Next;