import React from 'react';

const copyToClipboard = () => {
  const inputElement = document.createElement('input');
  inputElement.value = window.location.href;
  document.body.appendChild(inputElement);
  inputElement.select();
  document.execCommand('copy');
  document.body.removeChild(inputElement);
};

const InviteYourFriend = () => {
  return ( 
    <div>
      <marquee className="bigMarq">Please invite a friend to start the game.</marquee><br/>
      <button onClick={copyToClipboard} className='btn-cope'>Copy Link</button>
    </div>
  );
};

export default InviteYourFriend;
