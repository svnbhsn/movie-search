import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="footer" className="py-4 bg-dark text-white-50">
                <div className="container text-center">
                    <small>&#60;&#47;&#62; by Sven Böhrnsen</small> <br />
                    <small>Realisiert mit der <a href="https://www.themoviedb.org/documentation/api">themoviedb API</a></small>
                </div>
            </footer >
        );
    }
}


