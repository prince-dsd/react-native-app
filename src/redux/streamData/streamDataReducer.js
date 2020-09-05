import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './types';

const initialState = {
  streamData: [],
  isLoading: false,
  error: {},
};

const streamDataReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        streamData: [...state.streamData, ...payload],
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default streamDataReducer;
