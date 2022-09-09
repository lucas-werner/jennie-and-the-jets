import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import PlaylistList from '../PlaylistList/PlaylistList';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: null,
      playlists: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getUserPlaylists = this.getUserPlaylists.bind(this);
  }

  componentDidMount() {
    this.getUserPlaylists();
  }

  getUserPlaylists() {
    Spotify.getUserPlaylists().then((playlists) => {
      this.setState({ playlists });
    });
  }

  componentDidUpdate() {
    this.getUserPlaylists();
  }

  addTrack(track) {
    const { playlistTracks } = this.state;
    const isInThePlaylist = playlistTracks.some((song) => song.id === track.id);

    if (isInThePlaylist) {
      return;
    } else {
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track],
      });
    }
  }

  removeTrack(track) {
    const { playlistTracks } = this.state;
    const newPlaylist = playlistTracks.filter((song) => song.id !== track.id);
    this.setState({
      playlistTracks: [...newPlaylist],
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist() {
    const { playlistTracks, playlistName } = this.state;
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlayList(playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
      });
    });
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    const { searchResults, playlistName, playlistTracks } = this.state;
    return (
      <div>
        <h1>
          <span className='highlight'>jennie</span> and the <span className='highlight'>jets</span>
        </h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            <SearchResults searchResults={searchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
          <PlaylistList playlists={this.state.playlists} />
        </div>
      </div>
    );
  }
}
export default App;
