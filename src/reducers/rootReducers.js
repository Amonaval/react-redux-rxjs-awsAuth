import {combineReducers} from 'redux';
import sampleReducer from './sampleReducer';

import {enableBatching} from 'redux-batched-actions';

const rootReducer = combineReducers({
    sampleReducer: sampleReducer('', {})
});

export default enableBatching((rootReducer));