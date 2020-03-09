import React from "react";
import axios from "axios";
import './MoviesDetails.css';
import SingleSerie from "../models/SingleSerie";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Cast } from "../models/Casts";
import SimilarSeries from "../models/SimilarSeries";

interface Props extends RouteComponentProps<{ id: string }> { }

interface State {
    series: SingleSerie;
    cast: Cast[];
    similar: SimilarSeries[];
}

class SeriesDetails extends React.Component<Props, State> {
    componentDidMount() {

        // Get general Series Infos
        axios.get(
            `https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=a69372d529161c3bf5f724875b197064&language=de`
        )
            .then(res => {
                this.setState({ series: res.data });
            });

        // Get Movie Casts infos
        axios.get(
            `https://api.themoviedb.org/3/tv/${this.props.match.params.id}/credits?api_key=a69372d529161c3bf5f724875b197064`
        )
            .then(res => {
                this.setState({ cast: res.data.cast });
            });

        // Get similar Movie basend on tags 
        axios.get(
            `https://api.themoviedb.org/3/tv/${this.props.match.params.id}/similar?api_key=a69372d529161c3bf5f724875b197064&language=de&page=1`
        )
            .then(res => {

                this.setState({ similar: res.data.results });
            });
    }

    imgError(e: any) {
        e.target.src = "https://i.imgur.com/PanR74x.jpg";
    }

    // Check, if in the biography is available
    bioValidator(input: string) {
        if (input !== "") {
            return input
        } else {
            return "Keine Informationen hinterlegt."
        }
    }

    render() {
        if (!this.state || !this.state.series) {
            return null;
        }

        const serie = this.state.series;
        const date: string = this.state.series.first_air_date;
        let releaseDate = new Date(date).toLocaleDateString();



        return (
            <div className="content" >
                <div className="movieHead">
                    <div className="moviePoster">
                        <img
                            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${serie.poster_path}`}
                            onError={this.imgError}
                            alt="Movieposter"
                        />
                    </div>
                    <div className="movieDescription">
                        <h3>
                            <strong>{serie.name}</strong>
                            <br />
                            <span>({serie.original_name})</span>
                        </h3>

                        <p>
                            <strong>Handung</strong>
                            <br />
                            {this.bioValidator(serie.overview)}
                        </p>
                        <div className="facts">
                            <p><strong>Rating:</strong> <br />{(serie.vote_average * 100) / 10}%</p>
                            <p><strong>Produktionsland:</strong><br /> {serie.origin_country}</p>
                            <p><strong>Originalsprache:</strong><br /> {serie.original_language}</p>
                            <p><strong>Anzahl Staffeln:</strong> <br />{serie.number_of_seasons}</p>
                            <p><strong>Länge:</strong> <br />{serie.episode_run_time} Minuten</p>
                            <p><strong>Genre:</strong>
                                {serie.genres.map((genre: any) => {
                                    return <li id="genre" key={genre.id}>{genre.name}</li>
                                })}
                            </p>
                            <p><strong>Erstaustrahlung:</strong> <br />{releaseDate}</p>
                        </div>
                    </div>
                </div>

                <br />

                <div className="information">
                    <h2><strong>Besetzung</strong></h2>
                    <div className="casts">

                        {this.state.cast && (
                            this.state.cast.slice(0, 9).map((person: any) => (
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
                <div className="information">
                    <div id="filme">
                        <h2> <strong>Genre Ähnliche Sendungen</strong></h2>
                        <div className="casts">

                            {this.state.similar && (
                                this.state.similar.map((simSeries: any) => (
                                    <div key={simSeries.id} className="castFrame">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w138_and_h175_face/${simSeries.poster_path}`}
                                            onError={this.imgError}
                                            onClick={() =>
                                                this.props.history.push(
                                                    `/series/${simSeries.id}`
                                                )

                                            }
                                            alt="Movieposter"
                                        />
                                        <p id="actorName">
                                            <strong>{simSeries.name}</strong> <br />
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
export default withRouter(SeriesDetails);
