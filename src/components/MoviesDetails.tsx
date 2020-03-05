import React from "react";
import axios from "axios";
import './MoviesDetails.css';
import SingleMovie from "../models/SingleMovie";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Cast } from "../models/Casts";

interface Props extends RouteComponentProps<{ id: string }> { }

interface State {
    movies: SingleMovie;
    cast: Cast[];
}

class MoviesDetails extends React.Component<Props, State> {

    componentDidMount() {

        // Get general Movie Infos
        axios.get(
            `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=a69372d529161c3bf5f724875b197064&language=de`
        )
            .then(res => {
                this.setState({ movies: res.data });
            });

        // Get Movie Casts infos
        axios.get(
            `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=a69372d529161c3bf5f724875b197064`
        )
            .then(res => {

                this.setState({ cast: res.data.cast });
            });
    }

    // Check, if in the fact entries are available
    contentvalidator(input: any) {
        if (input !== null) {
            return input
        } else {
            return "-"
        }
    }

    // Check, if in the biography is available
    bioValidator(input: string) {
        if (input !== "") {
            return input
        } else {
            return "Keine Informationen hinterlegt."
        }
    }

    // substitute for the Poster Image
    imgError(e: any) {
        e.target.src = "https://i.imgur.com/PanR74x.jpg";
    }


    render() {
        if (!this.state || !this.state.movies) {
            return null;
        }

        const movie = this.state.movies;
        const casts = this.state.cast;
        const date: string = this.state.movies.release_date;
        let ausschnitt = date.slice(0, 4);


        return (
            <div className="content">
                <div className="movieHead">
                    <div className="moviePoster">
                        <img
                            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                            onError={this.imgError}
                            alt="Movieposter"
                        />
                    </div>
                    <div className="movieDescription">
                        <h3>
                            {movie.title}
                            <br />
                            <span>({movie.original_title})</span>
                        </h3>

                        <p>
                            <strong>Handlung</strong>
                            <br />
                            {this.bioValidator(movie.overview)}
                        </p>
                        <div className="facts">
                            <p><strong>Rating:</strong> <br /> {(movie.vote_average * 100) / 10}%</p>
                            <p><strong>Produktionsland:</strong>
                                {movie.production_countries.map((origin: any) => {
                                    return <li id="genre" key={origin.id}>{origin.name}</li>
                                })}
                            </p>
                            <p><strong>Originalsprache:</strong><br /> {movie.original_language}</p>
                            <p><strong>Länge:</strong> <br />{movie.runtime} Minuten</p>
                            <p><strong>Genre:</strong>
                                {movie.genres.map((genre: any) => {
                                    return <li id="genre" key={genre.id}>{genre.name}</li>
                                })}
                            </p>
                            <p><strong>Erscheinungsjahr:</strong> <br />{ausschnitt}</p>
                        </div>
                    </div>
                </div>
                <br />
                <div className="information">
                    <h2>Besetzung</h2>
                    <div className="casts">
                        {casts && (
                            casts.sort().slice(0, 9).map((person: any) => (
                                <div key={person.id} className="castFrame">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                                        onError={this.imgError}
                                        alt="Movieposter"
                                        onClick={() =>
                                            this.props.history.push(
                                                `/actors/${person.id}`
                                            )
                                        }
                                    />
                                    <p id="actorName">
                                        <strong>{person.name}</strong> <br />
                                        <span id="actorRole">{person.character}</span>
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <button id="backButton" className='btn btn-secondary btn-lg btn-block' onClick={() => this.props.history.goBack()}>Zurück</button>
            </div>
        );
    }
}
export default withRouter(MoviesDetails);
