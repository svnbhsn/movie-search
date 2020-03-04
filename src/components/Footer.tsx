import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <p>Realisiert mit der <a href="https://www.themoviedb.org/documentation/api">themoviedb API</a></p>
            </div>
        );
    }
}