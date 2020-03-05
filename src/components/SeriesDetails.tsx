import React from "react";
import axios from "axios";
import './MoviesDetails.css';
import SingleSerie from "../models/SingleSerie";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Cast } from "../models/Casts";

interface Props extends RouteComponentProps<{ id: string }> { }

interface State {
    series: SingleSerie;
    cast: Cast[];
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
    }

    imgError(e: any) {
        e.target.src = "https://i.imgur.com/PanR74x.jpg";
    }


    render() {
        if (!this.state) {
            return null;
        }

        const serie = this.state.series;
        const date: string = this.state.series.first_air_date;
        let releaseDate = new Date(date).toLocaleDateString();
        let ausschnitt = date.slice(0, 4);

        return (
            <div className="content">
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
                            {serie.name} ({ausschnitt})
                            <br />
                            <span>({serie.original_name})</span>
                        </h3>
                        <div className="facts">
                            <p>Rating: {(serie.vote_average * 100) / 10}%</p>
                            <p>Herkunft: {serie.origin_country}</p>
                            <p>Staffeln: {serie.number_of_seasons}</p>
                            <p>Laufzeit: {serie.episode_run_time} Minuten / Episode</p>
                            <p>Erstaustrahlung: {releaseDate}</p>
                        </div>
                        <p>
                            <strong>Beschreibung</strong>
                            <br />
                            {serie.overview}
                        </p>

                    </div>
                </div>

                <br />

                <div className="information">
                    <h4>Besetzung</h4>
                    <div className="casts">

                        {this.state.cast && (
                            this.state.cast.sort().slice(0, 9).map((person: any) => (
                                <div key={person.id} className="castFrame">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                                        onError={this.imgError}
                                        alt="Movieposter"
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
            </div>
        );
    }
}
export default withRouter(SeriesDetails);
