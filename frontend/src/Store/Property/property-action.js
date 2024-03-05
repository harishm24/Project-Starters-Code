// Importing Axios for making HTTP requests
import axios from "axios";
// Importing action creator from property slice
import { propertyAction } from "./property-slice";

// Async action creator to fetch properties
export const getAllProperties = () => async (dispatch, getState) => {
  try {
    // Dispatching getRequest action to set loading state
    dispatch(propertyAction.getRequest());
    // Extracting searchParams from current state
    const { searchParams } = getState().properties;
    // Making HTTP GET request to fetch properties
    const response = await axios.get(`/api/v1/rent/listing`, {
      params: { ...searchParams }, // Passing search parameters as query params
    });
    // Handling successful response
    if (!response) {
      throw new Error("Could not fetch any properties");
    }
    const { data } = response;
    // Dispatching getProperties action with fetched data
    dispatch(propertyAction.getProperties(data));
  } catch (error) {
    // Dispatching getErrors action with error message
    dispatch(propertyAction.getErrors(error.message));
  }
};