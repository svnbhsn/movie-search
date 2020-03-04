import React from 'react';
import axios from 'axios';
import Movie from '../Movie';
import { RouteComponentProps, withRouter } from 'react-router-dom';


interface Props extends RouteComponentProps {
    movies: Movie[]
}

interface State {
    movies: Movie[],
    value: ''
}

class Movies extends React.Component<any, State> {

    componentDidMount() {
        /*         axios.get(`https://api.themoviedb.org/3/search/movie?query=${val}&api_key=a69372d529161c3bf5f724875b197064`) */
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a69372d529161c3bf5f724875b197064&language=de&query=Highlander&page=1&include_adult=false`)
            .then((res) => {
                this.setState({ movies: res.data });
            })
    }

    onChangeHandler = async (e: any) => {
        this.setState({ value: e.target.value });
    };

    render() {
        if (!this.state) { return null }
        return (
            <div className="content" >
                <input
                    value={this.state.value}
                    onChange={e => this.onChangeHandler(e)}
                    placeholder="Nach Titel suchen"
                />

                {this.state.movies.map((movie: any) => (
                    <div key={movie.id} className="coinFrame"
                        onClick={() => this.props.history.push(`/coins/${movie.id}`)}>
                        <p><img src={movie.image.thumb} alt="" /> {movie.original_title}</p>
                    </div>
                ))}
            </div>

        );
    }
}




export default withRouter(Movies)