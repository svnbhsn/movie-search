export interface KnownFor {
    poster_path: string;
    vote_count: number;
    video: boolean;
    media_type: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}

export interface Result {
    popularity: number;
    known_for_department: string;
    name: string;
    id: number;
    profile_path: string;
    adult: boolean;
    known_for: KnownFor[];
    gender: number;
}

export default interface Actors {
    page: number;
    total_results: number;
    total_pages: number;
    results: Result[];
}

