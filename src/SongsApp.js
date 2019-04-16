import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { debounce, cloneDeep  } from 'lodash';
// import * as  from 'lodash/cloneDeep';
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
      favouritesTotal: 0
    }
  }

  getSongs = debounce(() => {
    const { query } = this.state;

    fetchSongs(query)
    .then(data => {
      const newData = data.results;
      const deepcloned = cloneDeep(newData)

      const songsArray = newData.map(object => {return {...object, favouriteSongStatus: false }})

      const albumsArray = deepcloned.map((object, index) => {return {...object, id: index, favouriteAlbumStatus: false }})

  
      this.setState({songsArray: songsArray, albumsArray: albumsArray})
    })

    this.setState({resultsArray: []})
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
        this.addFavouritesTotal();

        return {
          ...item, favouriteSongStatus: true
        };

        } 
      else if (item.trackId  === parseInt(buttonValue) && item.favouriteSongStatus === true) {
        this.deductFavouritesTotal();
        return {
          ...item, favouriteSongStatus: false
        }
      } return item;

    });

    const newAlbumsArray = albumsArray.map(item => {
      
      
      if (item.id === parseInt(buttonValue) && item.favouriteAlbumStatus === false) {
        this.addFavouritesTotal();
        console.log(item.id)
        console.log(item.favouriteAlbumStatus)

        return {
          ...item, favouriteAlbumStatus: true
        }
        
      } else if (item.id === parseInt(buttonValue) && item.favouriteAlbumStatus === true) {
        this.deductFavouritesTotal();
        console.log(item.id)
        console.log(item.favouriteAlbumStatus)

        return {
          ...item, favouriteAlbumStatus: false
        }
      } 
      return item;
    });
    
    this.setState({songsArray : newSongsArray, albumsArray: newAlbumsArray});
  }

  addFavouritesTotal = () => {
    this.setState(prevState => {
      return {
        favouritesTotal: prevState.favouritesTotal + 1
      }
    })
  }

  deductFavouritesTotal = () => {
    this.setState(prevState => {
      return {
        favouritesTotal: prevState.favouritesTotal - 1
      }
    })
  }

  render() {
    const { songsArray, albumsArray, favouritesTotal } = this.state;
    const { getSearchName, selectFavourites } = this;
    
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
