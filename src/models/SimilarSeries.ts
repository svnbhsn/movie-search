export interface Result {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
}

export default interface SimilarSeries {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

