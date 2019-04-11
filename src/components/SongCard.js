import React, { Component } from 'react';
import PropTypes from "prop-types";

class SongCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favouriteStatus: 'false',
            favouritesClass: '',
        }
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
          this.props.deductFavouritesTotal();
    
        } else {
          favouriteclass = 'Favourite';
          this.props.addFavouritesTotal();
        }

        this.setState({
          favouritesClass: favouriteclass
        })
      }

    render() {
        const { image, trackName, collectionName, id} = this.props;
        const { selectFavourites} = this;
        const { favouritesClass} = this.state;

        return(
            <li className="Song__item">
                <img className="Song__sleeve" src={image} alt={collectionName}></img>

                <p className="Song__title">{trackName}</p>

                <p className="Song__album">{collectionName}</p>

                <button type="button" className="Favourites__heart" onClick={selectFavourites}><i class={`fas fa-heart ${favouritesClass}`} value={id}></i></button>
                <i class="material-icons">favorite_border</i>
            </li>
        );
    }
}

SongCard.propTypes = {
    image: PropTypes.string,
    trackName: PropTypes.string,
    collectionName: PropTypes.string,
}

export default SongCard;