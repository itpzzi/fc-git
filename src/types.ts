export type Movie = {
    id: number;
    title: string;
    description: string;
    yearLaunched: string;
    rating: string;
};

export interface User {
    id: number;
    name: string;
    birthDate: string;
};

/* eslint-disable no-unused-vars */
// Está sendo utilizado, o ESLint não reconhece o uso em outros arquivos.
export enum BrazilianRatingSystem {
    L = 'L',
    AGE_10 = '10',
    AGE_12 = '12',
    AGE_14 = '14',
    AGE_16 = '16',
    AGE_18 = '18'
}
/* eslint-enable no-unused-vars */