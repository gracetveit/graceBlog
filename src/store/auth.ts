import axios from "axios";
import Cookies from "js-cookie";

export enum Status {
  True,
  False,
  Pending,
}

// Constants
const SET_STATUS = "SET_STATUS";
// Actions
const setStatus = (status: Status) => ({
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
      dispatch(setStatus(Status.True));
    } catch (error) {
      console.error(error);
      dispatch(logout());
    }
  };

export const verify = () => async (dispatch) => {
  try {
    const token = Cookies.get("TOKEN");
    if (!token) {
      dispatch(setStatus(Status.False));
      return;
    }
    const { data } = await axios({
      method: "get",
      url: "/api/auth",
      headers: {
        authorization: Cookies.get("TOKEN"),
      },
    });
    dispatch(setStatus(Status.True));
  } catch (error) {
    console.error(error);
    dispatch(logout());
  }
};

export const logout = () => async (dispatch) => {
  try {
    Cookies.remove("TOKEN");
    await axios.delete("/api/auth");
    dispatch(setStatus(Status.False));
  } catch (error) {
    console.error(error);
    dispatch(setStatus(Status.False));
  }
};

// Reducer
export default (state: Status = Status.Pending, action): Status => {
  switch (action.type) {
    case SET_STATUS:
      return action.status;
    default:
      return state;
  }
};
