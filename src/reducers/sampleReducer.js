import {LOAD_INIT_DATA, API_SUFFIX} from '../actions/actionTypes';

const {SUCCESS} = API_SUFFIX;

export default function sampleReducer(alias, initialState = {}) {
    return (state = initialState, action) => {
        switch (action.type) {
            case LOAD_INIT_DATA:
                return {
                    ...state,
                    loading:true
                };
            case `${LOAD_INIT_DATA}${SUCCESS}`:
                return Object.assign({}, {
                    ...state,
                    loading: false,
                    initData: action.payload
                });
            default:
                return state;
        }
    };
}