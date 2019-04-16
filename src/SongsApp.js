import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { debounce, cloneDeep  } from 'lodash';
import Header from './components/Header';
import './styles/App.scss';
import { fetchSongs } from './services/ApiRequest';
import SongsList from './components/SongsList';
import AlbumsApp from './components/AlbumsApp';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songsArray: [],
      albumsArray: [],
      query: '',
    }
  }

  getSongs = debounce(() => {
    const { query } = this.state;

    fetchSongs(query)
    .then(data => {
      const newData = data.results;

      //Add the property favouriteSongStatus to newData array:
      const songsArray = newData.map(object => {return {...object, favouriteSongStatus: false }})
      
      //Create a new deep copy of the array with Lodash;
      const deepcloned = cloneDeep(newData)

      //Return an array of objects which don't contain the collectionName value repeated;
      //reduce goes through the array, and for each element it calls the provided function with accumulator (the return value of the previous call) and the current element. concat adds the current element to the accumulator if it doesn't exist there yet. find checks if the current element exists in the accumulator by comparing the collectionName properties:
      const uniqueValues = deepcloned.reduce((acc, x) =>
      acc.concat(acc.find(y => y.collectionName === x.collectionName) ? [] : [x]), []);

      const newAlbumsArray = uniqueValues.map((object, index) => {return {...object, id: index, favouriteAlbumStatus: false }})

      this.setState({songsArray: songsArray, albumsArray: newAlbumsArray})
    })

    this.setState({songsArray: [], albumsArray: [] })
  }, 1000);

  getSearchName = (e) => {
    const nameValue = e.currentTarget.value;
    this.setState({query:nameValue})

    this.getSongs();
  }

  selectFavourites = (e) => {
    const { songsArray, albumsArray } = this.state;
    const buttonValue = e.currentTarget.value;

    const newSongsArray = songsArray.map(item => {
      if(item.trackId === parseInt(buttonValue) && item.favouriteSongStatus === false) {
        return {
          ...item, favouriteSongStatus: true
        };

        } 
      else if (item.trackId  === parseInt(buttonValue) && item.favouriteSongStatus === true) {
        return {
          ...item, favouriteSongStatus: false
        }
      } return item;

    });

    const newAlbumsArray = albumsArray.map(item => {
      if (item.id === parseInt(buttonValue) && item.favouriteAlbumStatus === false) {
        return {
          ...item, favouriteAlbumStatus: true
        }
        
      } else if (item.id === parseInt(buttonValue) && item.favouriteAlbumStatus === true) {
        return {
          ...item, favouriteAlbumStatus: false
        }
      } 
      return item;
    });
    
    this.setState({songsArray : newSongsArray, albumsArray: newAlbumsArray});
  }

  render() {
    const { songsArray, albumsArray } = this.state;
    const { getSearchName, selectFavourites } = this;

    // Get favourite songs' total:
    const favouriteSongsTotal = songsArray.filter(item => item.favouriteSongStatus === true).length;

     // Get favourite albums' total:
     const favouriteAlbumsTotal = albumsArray.filter(item => item.favouriteAlbumStatus === true).length;

     const favouritesTotal = favouriteSongsTotal + favouriteAlbumsTotal;


    return (
      <div className="App">
        <Header  
            getSearchName={getSearchName} 
            favouritesTotal={favouritesTotal} />

        <main className="Main-section">
          <Switch>
              <Fragment>
                <Route exact path="/" render={()=>(
                  <SongsList    
                  songsArray={songsArray}
                  selectFavourites={selectFavourites} />      
                )}/>
                
                <Route path="/AlbumsApp" render={()=>(
                <AlbumsApp 
                  albumsArray={albumsArray}
                  selectFavourites={selectFavourites} />
                )}/>
              </Fragment>
            </Switch>
        </main>
      </div>
    );
  }
}

export default App;
