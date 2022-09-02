import "./Track.css";
import React from "react";

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    const { isRemoval } = this.props;

    if (isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className="Track-action" onClick={this.addTrack}>
        +
      </button>
    );
  }

  addTrack() {
    const { track, onAdd } = this.props;
    onAdd(track);
  }

  removeTrack() {
    const { track, onRemove } = this.props;
    onRemove(track);
  }

  render() {
    const { track } = this.props;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>
            {track.artists} | {track.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
