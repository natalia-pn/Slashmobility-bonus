import React, { Component} from 'react';
import IonSearchbar from './IonSearchbar';

class Header extends Component {
    render() {
        const { getSearchName, magnify, favouritesTotal} = this.props;

        return(
            <header className="App-header">
                <i class="material-icons Hand-tapping">touch_app</i>
    
                <IonSearchbar 
                    getSearchName={getSearchName}
                    magnify={magnify}
                />
                <div className="Favourites-counter__container">
                    <i class="material-icons Header__heart">favorite</i>
                    
                    <span className="Favourites__counter">{favouritesTotal}</span>
                </div>
            </header>
        );
    }
}

export default Header;