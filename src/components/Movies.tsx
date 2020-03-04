import React from 'react';
import axios from 'axios';
import MovieCollection from '../Movie';
import { RouteComponentProps, withRouter } from 'react-router-dom';


interface Props extends RouteComponentProps {
    movies: MovieCollection
}

interface State {
    movies: MovieCollection,
    value: ''
}

class Movies extends React.Component<any, State> {

    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=a69372d529161c3bf5f724875b197064&language=en-US&page=1')
            .then((res) => {
                this.setState({ movies: res.data, value: '' });
            })
    }

    search = async (query: any) => {
        if (query.length >= 3) {
            let res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a69372d529161c3bf5f724875b197064&language=de&query=${query}&page=1&include_adult=false`);
            let data = res.data;
            // debugger
            this.setState({ movies: data });
        } else {
            //TODO
        }

    };


    onChangeHandler = async (e: any) => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };

    imgError(e: any) {
        e.target.src = 'https://i.imgur.com/D9uRjkB.jpg'
    }

    render() {
        if (!this.state) { return null }
        return (
            <div className="content" >
                <div className="searchField">
                    <input type="text" value={this.state.value} onChange={this.onChangeHandler} />
                </div>
                {this.state.movies && (
                    <div className="searchResult">

                        {this.state.movies.results.map((movie: any) => (
                            <div key={movie.id} className="moviePosterFrame"
                                onClick={() => this.props.history.push(`/movies/${movie.id}`)}>
                                <img
                                    src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                                    onError={this.imgError}
                                    alt="Movieposter"
                                />
                                <p>{movie.title}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        );
    }
}




export default withRouter(Movies)