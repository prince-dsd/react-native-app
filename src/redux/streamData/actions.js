import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './types';

import api from '../../utils/api';

export const getStreamData = (page) => async (dispatch) => {
  try {
    dispatch(fetchDataRequest());
    const response = await api.post(
      'https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed',
      {page: page},
    );

    const streamData = await response.data;
    dispatch(fetchDataSucces(streamData));
  } catch (err) {
    dispatch(fetchDataFailure(err.message));
  }
};

export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};
export const fetchDataSucces = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};
