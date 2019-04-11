import React, { Component} from 'react';
import PropTypes from "prop-types";
import IonSearchbar from './IonSearchbar';

class Header extends Component {
    render() {
        const { handTap, getSearchName, magnify, favouritesTotal} = this.props;

        return(
            <header className="App-header">
                <img className="Hand-tap" src={handTap} alt="hand tapping icon"></img>
                
                <IonSearchbar 
                    getSearchName={getSearchName}
                    magnify={magnify} />
                <div className="Favourites-counter__container">
                    <i className="fas fa-heart Header__heart"></i>
                    
                    <span className="Favourites__counter">{favouritesTotal}</span>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    handTap: PropTypes.string,
}

export default Header;