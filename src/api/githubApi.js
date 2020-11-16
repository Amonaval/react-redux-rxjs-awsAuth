import RxPhoenixHttp from './RxPhoenixHttp/RxPhoenixHttp';
import {simpleMapPipe} from './pipes.api';

const http = new RxPhoenixHttp();

const baseURL = 'https://api.github.com';

const fetchURL = `${baseURL}/users/`;

const fetchSampleApi$ = (user) => {
    return http.get(`${fetchURL}${user}`).pipe(simpleMapPipe);
};

export {
    fetchSampleApi$
};
