import React, { Component } from 'react';
import AlbumsList from './AlbumsList';

class AlbumsApp extends Component {
  
  render() {
    const { resultsArray } = this.props;
    const { addFavouritesTotal, deductFavouritesTotal } = this;
    
    return (
      <div className="App">
        <main className="Main-section">
          <AlbumsList    
            resultsArray={resultsArray}
            addFavouritesTotal={addFavouritesTotal}
            deductFavouritesTotal={deductFavouritesTotal} />
        </main>
      </div>
    );
  }
}

export default AlbumsApp;
