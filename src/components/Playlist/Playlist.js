import './Playlist.css';
import React from 'react';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const { onNameChange } = this.props;
    onNameChange(event.target.value);
  }

  render() {
    const { playlistName, playlistTracks, onRemove, onSave } = this.props;
    return (
      <div className='Playlist'>
        <input
          defaultValue={'New Playlist'}
          value={playlistName}
          onChange={this.handleNameChange}
        />
        <TrackList isRemoval={true} onRemove={onRemove} tracks={playlistTracks} />
        <button className='Playlist-save' onClick={onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}
