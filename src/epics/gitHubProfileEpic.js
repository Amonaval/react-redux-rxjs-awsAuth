import {map, switchMap, mergeMap, takeUntil} from 'rxjs/operators';
import {from as fromRxOperator} from 'rxjs';
import {camelCase, isEmpty} from 'lodash';
import * as actionTypes from '../actions/actionTypes';
import {fetchInitDataSuccessful} from '../actions/sampleAction';
import {combineEpics} from 'redux-observable';

const API_NAME = 'githubApi';

const {LOAD_INIT_DATA} = actionTypes;

const fetchGitHubProfileEpic = (action$, state$, {apis}) => {
    const action = LOAD_INIT_DATA;
    return action$
        .ofType(action)
        .pipe(
            switchMap((data) => {
                return apis[API_NAME].fetchSampleApi$(data.payload.user);
            }),
            map((result) => fetchInitDataSuccessful(result))
        );
};


// COMBINE ALL EPICS
const gitHubProfileEpic = () => {
    return combineEpics(
        fetchGitHubProfileEpic
    );
};

export default gitHubProfileEpic;