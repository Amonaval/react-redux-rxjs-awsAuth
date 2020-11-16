import * as actions from './actionTypes';

export function fetchInitData(alias, data) {
    return {type: actions.LOAD_INIT_DATA, payload: data};
}

export function fetchInitDataSuccessful(data) {
    return {type: `${actions.LOAD_INIT_DATA}${actions.API_SUFFIX.SUCCESS}`, payload: data};
}

export function requestFailed(payload){
    return {type: actions.REQUEST_FAILED, payload: payload};
}
