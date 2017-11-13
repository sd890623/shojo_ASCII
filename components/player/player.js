import React, { Component } from 'react';
import Sound from 'react-sound';
import bindAll from 'lodash/bindAll';
import './Player.scss';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      text: null,
      started: false,
      tick: 1,
      soundPlay: Sound.status.STOPPED,
      intervalId: 0,
      maxCount: 449
    });
    bindAll(this, ['tick', 'toggleTick']);
  }

  appendZero(val) {
    while ((val+"").length < 3) {
      val = "0" + val;
    }
    return val;
  }

  tick() {
    if (this.state.started && this.state.tick < this.state.maxCount + 1) {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", `./sources/op/ASCII-op ${this.appendZero(this.state.tick)}.txt`, true);
      rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            if (this.state.started) {
              this.setState({
                text: allText
              });
            }
          }
        }
      };
      rawFile.send(null);
      this.setState({
        tick: this.state.tick + 1
      });
    }
  }

  toggleTick() {
    if (this.state.started) {
      this.setState({
        text: null,
        started: false,
        tick: 1,
        soundPlay: Sound.status.STOPPED
      });
      clearInterval(this.state.intervalId);
    } else {
      this.setState({
        started: true
      });
      const intervalId = setInterval(this.tick, 200);
      setTimeout(() => {
        this.setState({
          soundPlay: Sound.status.PLAYING,
          intervalId: intervalId
        });
      }, 300);

    }
  }

  render() {
    return (
      <div id="player-container" className="container">
        <h2>用Javascript打开少女终末旅行OP</h2>
        <div id="player">
          <pre className="content">
            {this.state.text ? this.state.text : <img className="thumb" src="./sources/thumb.png" />}
          </pre>
        </div>
        <button type="button" className="btn btn-primary control-btn" onClick={() => this.toggleTick()}>
          开始/停止
        </button>
        <Sound
          url="./sources/op.mp3"
          playStatus={this.state.soundPlay}
          playFromPosition={0}
          onLoading={() => ''}
          onPlaying={() => ''}
          onFinishedPlaying={() => {this.setState({
            soundPlay: Sound.status.STOPPED
          })}}
          loops={false}
        />
      </div>
    );
  }
}

export default Player;