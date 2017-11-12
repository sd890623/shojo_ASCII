import React, { Component } from 'react';
import Sound from 'react-sound';
import bindAll from 'lodash/bindAll';
import './Player.scss';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      text: '',
      started: true,
      tick: 1,
      soundPlay: Sound.status.STOPPED
    });
    bindAll(this, ['tick', 'startTick']);
  }

  componentDidMount() {
    //setInterval(this.tick, 200);
  }

  appendZero(val) {
    while ((val+"").length < 3) {
      val = "0" + val;
    }
    return val;
  }

  tick() {
    if (this.state.started) {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", `./sources/op/ASCII-op ${this.appendZero(this.state.tick)}.txt`, false);
      rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            this.setState({
              text: allText,
              tick: this.state.tick + 1
            });
          }
        }
      };
      rawFile.send(null);
    }
  };

  startTick() {
    setInterval(this.tick, 200);
    if (this.state.soundPlay === Sound.status.STOPPED || this.state.soundPlay === Sound.status.PAUSED) {
      setTimeout(this.setState({
        soundPlay: Sound.status.PLAYING
      }), 400);

    }
  }

  render() {
    return (
      <div id="player-container" className="container">
        <div id="player">
          <pre className="content">
            {this.state.text}
          </pre>
        </div>
        <button type="button" className="btn btn-primary control-btn" onClick={() => this.startTick()}>
          开始
        </button>
        <Sound
          url="./sources/op.mp3"
          playStatus={this.state.soundPlay}
          playFromPosition={0}
          onLoading={() => ''}
          onPlaying={() => ''}
          onFinishedPlaying={() => ''}
          loop={false}
        />
      </div>
    );
  }
}

export default Player;