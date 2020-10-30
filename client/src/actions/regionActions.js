import axios from "axios";

import { GET_ERRORS, GET_REGION, GET_REGION_DONATION } from "./types";

export const listRegions = () => (dispatch) => {
  return axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}:3003/api/contract-creations/region`
    )
    .then((res) => res.data)
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const getRegion = (regionName) => (dispatch) => {
  console.log("Getting information about a region", regionName);
  axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}:3003/api/contract-creations/region/${regionName}`
    )
    .then((response) => {
      console.log(response);
      dispatch({
        type: GET_REGION,
        payload: response.data[0],
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};
export const postRegion = (regionData) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}:3003/api/contract-creations/region`,
      regionData
    )
    .then()
    .catch();
};

export const getTotalDonationsForRegion = (regionName) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}:3003/api/blockchain-requests/contract/get-balance`,
      { regionName }
    )
    .then((response) => {
      console.log("XXX", response);
      dispatch({
        type: GET_REGION_DONATION,
        payload: response,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
