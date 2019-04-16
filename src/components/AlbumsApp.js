import React, { Component } from 'react';
import AlbumsList from './AlbumsList';

class AlbumsApp extends Component {
  
  render() {
    const { albumsArray, selectFavourites } = this.props;
    
    return (
      <div className="App">
        <main className="Main-section">
          <AlbumsList    
            albumsArray={albumsArray}
            selectFavourites={selectFavourites} />
        </main>
      </div>
    );
  }
}

export default AlbumsApp;
