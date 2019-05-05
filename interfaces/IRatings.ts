export interface IRatings {
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
