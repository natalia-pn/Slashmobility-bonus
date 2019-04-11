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
                
                <i className="fas fa-heart"></i>
                
                <span className="Counter">{favouritesTotal}</span>
            </header>
        );
    }
}

Header.propTypes = {
    handTap: PropTypes.string,
}

export default Header;