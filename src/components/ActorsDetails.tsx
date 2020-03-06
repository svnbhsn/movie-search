import React from "react";
import axios from "axios";
import './MoviesDetails.css';
import SingleActor from "../models/SingleActor";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Cast as MovieCast } from "../models/MoviesOfActor";
import { Cast as SeriesCast } from "../models/SeriesOfActors";

interface Props extends RouteComponentProps<{ id: string }> { }

interface State {
    actors: SingleActor;
    movieRoles: MovieCast[];
    serieRoles: SeriesCast[];
}

class ActorsDetails extends React.Component<Props, State> {
    componentDidMount() {

        // Get general Actor Infos
        axios.get(
            `https://api.themoviedb.org/3/person/${this.props.match.params.id}?api_key=a69372d529161c3bf5f724875b197064&language=de`
        )
            .then(res => {
                this.setState({ actors: res.data });
            });

        // Get Movies from Actor infos
        axios.get(
            `https://api.themoviedb.org/3/person/${this.props.match.params.id}/movie_credits?api_key=a69372d529161c3bf5f724875b197064&language=de`
        )
            .then(res => {
                this.setState({ movieRoles: res.data.cast });
            });

        // Get Series from Actor infos
        axios.get(
            `https://api.themoviedb.org/3/person/${this.props.match.params.id}/tv_credits?api_key=a69372d529161c3bf5f724875b197064&language=de`
        )
            .then(res => {
                this.setState({ serieRoles: res.data.cast });
            });
    }

    // Check the given number end return the gender as string
    gender(number: number) {
        if (number === 1) {
            return "Weiblich"
        } else if (number === 2) {
            return "Männlich"
        } else {
            return "Unbekannt"
        }
    }

    // Check, if in the fact entries are available
    contentvalidator(input: any) {
        if (input != null) {
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

    // substitute for the Image of the Actors
    imgError(e: any) {
        e.target.src = "https://i.imgur.com/PanR74x.jpg";
    }


    render() {
        if (!this.state || !this.state.actors) {
            return null;
        }

        const actor = this.state.actors;

        return (
            <div className="content">
                <div className="movieHead">
                    <div className="moviePoster">
                        <img
                            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${actor.profile_path}`}
                            onError={this.imgError}
                            alt="Movieposter"
                        />
                    </div>
                    <div className="movieDescription">
                        <h1>{actor.name}</h1>
                        <br />
                        <div className="facts">
                            <p><strong>Geschlecht:</strong> <br />{this.gender(actor.gender)}</p>
                            <p><strong>Geboren am:</strong> <br />{this.contentvalidator(actor.birthday)}</p>
                            <p><strong>Geburtsort:</strong> <br />{this.contentvalidator(actor.place_of_birth)}</p>
                            <p><strong>Gestorben am:</strong> <br />{this.contentvalidator(actor.deathday)}</p>
                            <p><strong>Webseite:</strong> <br /> <a href={actor.homepage} target="_blank" rel="noopener noreferrer">Link</a></p>
                        </div>
                        <p>
                            <strong>Biografie</strong>
                            <br />
                            {this.bioValidator(actor.biography)}
                        </p>
                    </div>
                </div>

                <br />

                <div className="information">
                    <div id="filme">
                        <h2> <strong>Filme</strong></h2>
                        <div className="casts">

                            {this.state.movieRoles && (
                                this.state.movieRoles.map((movieRole: any) => (
                                    <div key={movieRole.id} className="castFrame">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w138_and_h175_face/${movieRole.poster_path}`}
                                            onError={this.imgError}
                                            onClick={() =>
                                                this.props.history.push(
                                                    `/movies/${movieRole.id}`
                                                )
                                            }
                                            alt="Movieposter"
                                        />
                                        <p id="actorName">
                                            <strong>{movieRole.title}</strong> <br />
                                            <span id="actorRole">{movieRole.character}</span>
                                        </p>

                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <br />
                    <div id="series">
                        <h2><strong>Serien & TV</strong></h2>
                        <div className="casts">

                            {this.state.serieRoles && (
                                this.state.serieRoles.map((serieRole: any) => (
                                    <div key={serieRole.id} className="castFrame">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w138_and_h175_face/${serieRole.poster_path}`}
                                            onError={this.imgError}
                                            alt="Movieposter"
                                            onClick={() =>
                                                this.props.history.push(
                                                    `/series/${serieRole.id}`
                                                )
                                            }
                                        />
                                        <p id="actorName">
                                            <strong>{serieRole.name}</strong> <br />
                                            <span id="actorRole">{serieRole.character}</span>
                                        </p>

                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <button id="backButton" className='btn btn-secondary btn-lg btn-block' onClick={() => this.props.history.goBack()}>Zurück</button>
            </div>
        );
    }
}
export default withRouter(ActorsDetails);
