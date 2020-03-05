import React from "react";
import axios from "axios";
import ActorCollection from "../models/Actors";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
    actors: ActorCollection;
}

interface State {
    actors: ActorCollection;
    value: "";
}

class Actors extends React.Component<any, State> {
    componentDidMount() {
        axios
            .get(
                "https://api.themoviedb.org/3/person/popular?api_key=a69372d529161c3bf5f724875b197064&language=de&page=1"
            )
            .then(res => {
                this.setState({ actors: res.data, value: "" });
            });
    }

    search = async (query: any) => {
        if (query.length >= 3) {
            let res = await axios.get(
                `https://api.themoviedb.org/3/search/person?api_key=a69372d529161c3bf5f724875b197064&language=de&query=${query}&page=1&include_adult=false`
            );
            let data = res.data;
            // debugger
            this.setState({ actors: data });
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
                    {this.state.actors && (
                        <div className="searchResult">
                            {this.state.actors.results.map((actor: any) => (
                                <div
                                    key={actor.id}
                                    className="moviePosterFrame"
                                    onClick={() =>
                                        this.props.history.push(
                                            `/actors/${actor.id}`
                                        )
                                    }
                                >
                                    <img
                                        src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                                        onError={this.imgError}
                                        alt="Seriesposter"
                                    />
                                    <p>{actor.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
    }
}

export default withRouter(Actors);
