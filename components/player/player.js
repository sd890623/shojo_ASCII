import React, { Component } from 'react';
import { Button } from 'antd';
import './player.scss';

class Player extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="player-container" className="container">
        <div id="player">
          <Button>
            asds
          </Button>
        </div>
      </div>
    );
  }
}

export default Player;