import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './types';

const initialState = {
  streams: [],
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
        streams: payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
  }
};

export default streamDataReducer;
