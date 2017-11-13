import React from 'react';
import ReactDOM from 'react-dom';
import Player from './components/Player/Player'

if(document.documentElement.clientWidth <= 736) {
  document.getElementById("app").className = 'mobile';
}

ReactDOM.render(
  <Player />,
  document.getElementById('app')
);
