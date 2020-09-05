import {combineReducers} from 'redux';
import streamDataReducer from './streamData/streamDataReducer';

const rootReducer = combineReducers({
  streams: streamDataReducer,
});

export default rootReducer;
