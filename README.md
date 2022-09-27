# **Jennie and the Jets**

**Deploy: [https://lucas-werner.github.io/jennie-and-the-jets](https://lucas-werner.github.io/jennie-and-the-jets)**

This is the repository for the “Jennie and the Jets” project, made in the Codecademy Full Stack course. The proposal is simple: using the Spotify API, it is possible to search for songs and create a playlist that will be saved in your account.


![](https://lh5.googleusercontent.com/TBSE9B0_ssjqDPxUeMlcryDFBPtiu4_1GnLom9hCb5QAfMxqkXwmAK-hf_vze1Frl2KQMoGJ9dyTWe4fBmEYqrmFEI7apZmCDWLggkN8tKH7IMSJLEfnyU6rQnxbZGS3JsQnf_iOZDwqndS7-kP2UOE-jzmu7KiKmfXUfzAdOyMbh-O4u9iV2uKi0Q)


## Technologies used:

**React**

The project was made, purposefully, using class components instead of functional ones. There is still a lot of legacy code in the class, and as a way of practice, I decided to develop the project this way. So, instead of using the Context API and Hooks, given that the project is small, we chose to keep all the application state in the App component.

  
**App.js**

      
    
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


The problem with this approach is prop drilling, where you pass callbacks several levels down, which can cause some confusion if the application gets too large. In this case, we only pass the callbacks to three child components: the SearchResults, which contains the search results, the Playlist, which contains the songs to be saved in a playlist, and the PlaylistList, which is the list of already saved playlists.

**Spotify API**

First, you need to [create an account](https://developer.spotify.com/dashboard/login) on the Spotify developer platform, which will create an ID so you can consume the API.

**Fetch token:**

    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    
    window.location = accessUrl;
    
With the key obtained (clientid) when creating a developer tools account, we were able to obtain an access token that will be used for all future api requests.

**Search songs:**

    search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
    
    headers: {    
    Authorization: `Bearer ${accessToken}`,
    },
    })
       

 

   **Save playlist**
       
    return Promise.resolve(Spotify.getCurrentUserId()).then((response) => {    
    userId = response;    
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {    
    headers: headers,    
    method: 'POST',    
    body: JSON.stringify({ name: name }),    
    })  
    .then((response) => response.json())    
    .then((jsonResponse) => {    
    const playlistId = jsonResponse.id;    
    return fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,    
    {    
    headers: headers,    
    method: 'POST',    
    body: JSON.stringify({ uris: trackUris }),    
    },    
    );    
    })

