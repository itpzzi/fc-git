import dayjs from 'dayjs';
import {
    Movie,
    User,
    BrazilianRatingSystem
} from './types';

export const listMovies = (movieList: Movie[]): string => {
    if (movieList.length === 0) return 'Nenhum filme disponível.';

    return movieList
        .map((movie) => {
            return [
                `🆔 ${movie.id}`,
                `🎬 Título: ${movie.title}`,
                `📝 Descrição: ${movie.description}`,
                `📅 Ano: ${movie.yearLaunched}`,
                `🔞 Classificação: ${movie.rating}`
            ].join('\n');
        })
        .join('\n\n');
};

export class CodeflixUser implements User {
    id: number;
    name: string;
    birthDate: string;

    constructor(id: number, name: string, birthDate: string) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
    }

    get age(): number {
        return dayjs().diff(dayjs(this.birthDate), 'year');
    }
}

export const isUserAllowedToWatchMovie = (
    user: CodeflixUser,
    movieRating: BrazilianRatingSystem
): boolean => {
    switch (movieRating) {
        case BrazilianRatingSystem.L:
            return true;
        case BrazilianRatingSystem.AGE_10:
            return user.age >= 10;
        case BrazilianRatingSystem.AGE_12:
            return user.age >= 12;
        case BrazilianRatingSystem.AGE_14:
            return user.age >= 14;
        case BrazilianRatingSystem.AGE_16:
            return user.age >= 16;
        case BrazilianRatingSystem.AGE_18:
            return user.age >= 18;
        default:
            return false;
    }
};

export const filterUserAllowedMoviesByRatings = (
    user: CodeflixUser,
    movies: Movie[]
): Movie[] => {
    return movies.filter((movie) =>
        isUserAllowedToWatchMovie(user, movie.rating as BrazilianRatingSystem)
    );
};