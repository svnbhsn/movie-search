import React from "react";
import axios from "axios";
import TVCollection from "../models/Series";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
    series: TVCollection;
}

interface State {
    series: TVCollection;
    value: "";
}

class Series extends React.Component<any, State> {
    componentDidMount() {
        axios
            .get(
                "https://api.themoviedb.org/3/tv/popular?api_key=a69372d529161c3bf5f724875b197064&language=de&page=1"
            )
            .then(res => {
                this.setState({ series: res.data, value: "" });
            });
    }

    search = async (query: any) => {
        if (query.length >= 3) {
            let res = await axios.get(
                `https://api.themoviedb.org/3/search/tv?api_key=a69372d529161c3bf5f724875b197064&language=de&query=${query}&page=1`
            );
            let data = res.data;
            // debugger
            this.setState({ series: data });
        }
    };

    onChangeHandler = async (e: any) => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };

    imgError(e: any) {
        e.target.src = "https://i.imgur.com/J6B3d9H.jpg";
    }

    render() {
        if (!this.state) {
            return null;
        } else {
            return (
                <div className="content">
                    <div className="searchField">
                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    {this.state.series && (
                        <div className="searchResult">
                            {this.state.series.results.map((serie: any) => (
                                <div
                                    key={serie.id}
                                    className="moviePosterFrame"
                                    onClick={() =>
                                        this.props.history.push(
                                            `/series/${serie.id}`
                                        )
                                    }
                                >
                                    <img
                                        src={`http://image.tmdb.org/t/p/w185/${serie.poster_path}`}
                                        onError={this.imgError}
                                        alt="Seriesposter"
                                    />
                                    <p>{serie.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
    }
}

export default withRouter(Series);
