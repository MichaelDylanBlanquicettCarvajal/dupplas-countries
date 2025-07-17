export interface Country {
    flags: {
        png: string,
        svg: string,
        alt?: string
    };
    name: {
        common: string;
        official?: string;
        nativeName?: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    population: number;
    region: string;
    subregion: string;
    capital: string;
    currencies?: {
        [key: string]: {
            symbol: string;
            name: string;
        };
    };
    languages?: {
        [key: string]: string;
    };
}