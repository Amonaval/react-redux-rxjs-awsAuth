import {combineEpics} from 'redux-observable';
import {ajax} from 'rxjs/ajax';
import gitHubProfileEpic from './gitHubProfileEpic';

const rootEpic = (...args) => combineEpics(
    gitHubProfileEpic()
)(...args, {ajax});

export default rootEpic;