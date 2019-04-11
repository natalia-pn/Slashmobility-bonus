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
      favouritesTotal: 0
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
    this.setState({resultsArray: []})
  }, 1000);

  getSearchName = (e) => {
    const nameValue = e.currentTarget.value;
    this.setState({query:nameValue})

    this.getSongs();
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
    const { resultsArray, favouritesTotal } = this.state;
    const { getSearchName, addFavouritesTotal, deductFavouritesTotal } = this;
    
    return (
      <div className="App">
        <Header  
          handTap={handTap}
          getSearchName={getSearchName} 
          magnify={magnify}
          favouritesTotal={favouritesTotal} />

        <main className="Main-section">
          <SongsList    
            resultsArray={resultsArray}
            addFavouritesTotal={addFavouritesTotal}
            deductFavouritesTotal={deductFavouritesTotal} />
        </main>
      </div>
    );
  }
}

export default App;
