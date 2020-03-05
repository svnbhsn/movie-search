export interface Cast {
    credit_id: string;
    original_name: string;
    original_language: string;
    id: number;
    character: string;
    name: string;
    origin_country: string[];
    vote_count: number;
    backdrop_path: string;
    popularity: number;
    episode_count: number;
    genre_ids: number[];
    first_air_date: string;
    vote_average: number;
    overview: string;
    poster_path: string;
}

export default interface SeriesOfActor {
    cast: Cast[];
    crew: any[];
    id: number;
}


