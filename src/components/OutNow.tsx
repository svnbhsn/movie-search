import React from "react";
import axios from "axios";
import MovieCollection from "../models/Upcoming";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
    movies: MovieCollection;
}

interface State {
    movies: MovieCollection;
    value: "";
}

class OutNow extends React.Component<any, State> {
    componentDidMount() {
        axios
            .get(
                "https://api.themoviedb.org/3/movie/now_playing?api_key=a69372d529161c3bf5f724875b197064&language=de&page=1"
            )
            .then(res => {
                this.setState({ movies: res.data, value: "" });
            });
    }

    imgError(e: any) {
        e.target.src = "https://i.imgur.com/J6B3d9H.jpg";
    }

    render() {
        if (!this.state) {
            return null;
        } else {
            return (
                <div className="content">
                    {this.state.movies && (
                        <div className="searchResult">
                            {this.state.movies.results.map((newMovie: any) => (
                                <div
                                    key={newMovie.id}
                                    className="moviePosterFrame"
                                    onClick={() =>
                                        this.props.history.push(
                                            `/movies/${newMovie.id}`
                                        )
                                    }
                                >
                                    <img
                                        src={`http://image.tmdb.org/t/p/w185/${newMovie.poster_path}`}
                                        onError={this.imgError}
                                        alt="Seriesposter"
                                    />
                                    <p>{newMovie.title}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
    }
}

export default withRouter(OutNow);
