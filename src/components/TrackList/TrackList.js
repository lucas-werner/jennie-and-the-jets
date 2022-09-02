import "./TrackList.css";
import React from "react";
import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render() {
    const { tracks, isRemoval, onAdd, onRemove } = this.props;
    return (
      <div className="TrackList">
        {tracks &&
          tracks.map((track) => (
            <Track
              track={track}
              key={track.id}
              isRemoval={isRemoval}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          ))}
      </div>
    );
  }
}
