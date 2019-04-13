import React, { Component } from 'react';
import PropTypes from "prop-types";

class SongCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favouriteStatus: 'false',
            favouritesIcon: 'favorite',
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
        let favouriteIcon;
    
        this.toggleHeart();
    
        if(favouriteStatus === false) {
          favouriteIcon = 'favorite';
          this.props.deductFavouritesTotal();
    
        } else {
          favouriteIcon = 'favorite_border';
          this.props.addFavouritesTotal();
        }

        this.setState({
          favouritesIcon: favouriteIcon
        })
      }



    render() {
        const { image, trackName, collectionName, id} = this.props;
        const { selectFavourites} = this;
        const { favouritesIcon} = this.state;

        return(
            <li className="Song__item">
                <img className="Song__sleeve" src={image} alt={collectionName}></img>

                <p className="Song__title">{trackName}</p>

                <p className="Song__album">{collectionName}</p>

                <button type="button" className="Favourites__heart" onClick={selectFavourites}value={id}><i className="material-icons">{favouritesIcon}</i></button>
                
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