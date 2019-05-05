export interface IRatings {
    face: IRatingsFace;
    noice: {
        volume: number;
    };
    activity: {
        rating: number;
    };
    weather: {
        rating: number;
    };
    area: {
        rating: number;
    };
    trafic: {
        rating: number;
    };
    polution: {
        rating: number;
    };
}

export interface IRatingsFace {
    smile: number;
    gender: 'male' | 'female';
    age: 25;
    emotion: {
        anger: number;
        contempt: number;
        disgust: number;
        fear: number;
        happiness: number;
        neutral: number;
        sadness: number;
        surprise: number;
    };
}
