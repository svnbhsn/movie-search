
export interface Cast {
    character: string;
    credit_id: string;
    poster_path: string;
    id: number;
    video: boolean;
    vote_count: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}

export default interface MoviesOfActor {
    cast: Cast[];
    id: number;
}

