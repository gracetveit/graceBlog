import axios from "axios";
import Cookies from "js-cookie";

// Constants
const SET_STATUS = "SET_STATUS";
// Actions
const setStatus = (status: Boolean) => ({
  type: SET_STATUS,
  status,
});
// Thunks
export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/auth",
        data: {
          username,
          password,
        },
      });
      Cookies.set("TOKEN", data);
      dispatch(setStatus(true));
    } catch (error) {
      console.error(error);
      dispatch(setStatus(false));
    }
  };

export const verify = () => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "get",
      url: "/api/auth",
      headers: {
        authorization: Cookies.get("TOKEN"),
      },
    });
    dispatch(setStatus(data));
  } catch (error) {
    console.error(error);
    dispatch(setStatus(false));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.delete("/api/auth");
    dispatch(setStatus(false));
  } catch (error) {
    console.error(error);
    dispatch(setStatus(false));
  }
};

// Reducer
export default (state: Boolean = false, action): Boolean => {
  switch (action.type) {
    case SET_STATUS:
      return action.status;
    default:
      return state;
  }
};
