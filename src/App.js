import React, { Component } from 'react';
import { debounce } from 'lodash';
import handTap from './images/gesture-tap-hold.svg';
import magnify from './images/magnify.svg';
import Header from './components/Header';
import './styles/App.scss';
import { fetchSongs } from './services/ApiRequest';
import SongsList from './components/SongsList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsArray: [],
      query: '',
      favouriteStatus: 'false',
      favouritesClass: '',
    }
  }

  getSongs = debounce(() => {
    const { query } = this.state;

    fetchSongs(query)
    .then(data => {
      const results = data.results;
      console.log(results)
      this.setState({resultsArray: results})
    })
  }, 1000);

  getSearchName = (e) => {
    const nameValue = e.currentTarget.value;
    this.setState({query:nameValue})

    this.getSongs();
  }

  toggleHeart = () => {
    const { favouriteStatus} = this.state;

    this.setState({
      favouriteStatus:!favouriteStatus
    })
  }

  selectFavourites = () => {
    const { favouriteStatus} = this.state;
    let favouriteclass;

    this.toggleHeart();

    if(favouriteStatus === false) {
      favouriteclass = '';

    } else {
      favouriteclass = 'Favourite';
    }

    this.setState({
      favouritesClass: favouriteclass
    })

    
  }

  render() {
    const { resultsArray, favouritesClass } = this.state;
    const { getSearchName, selectFavourites } = this;
    
    return (
      <div className="App">
        <Header  
          handTap={handTap}
          getSearchName={getSearchName} 
          magnify={magnify} />

        <main className="Main-section">
          <SongsList    
            resultsArray={resultsArray}
            selectFavourites={selectFavourites} 
            favouritesClass = {favouritesClass}/>
        </main>
      </div>
    );
  }
}

export default App;
