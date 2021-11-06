import * as actionTypes from "./actionTypes";

export const login = (notify, loginInfo, history) => {
  return (dispatch) => {
    dispatch(waiting());
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/Account/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((response) => response.json())
      .then((result) => {
        const expires = new Date(new Date().getTime() + 3600 * 1000);
        const userInfo = {
          id: result.Id,
          username: result.Username,
          email: result.Email,
          name: result.Aame,
          address: result.Address,
          phone: result.Phone,
          birthday: result.Birthday,
          avatar: result.Avatar,
          roles: [...result.Role],
          token: result.Token,
        };
        localStorage.setItem("expire", expires);
        localStorage.setItem("token", result.Token);
        localStorage.setItem("idUser", result.Id);
        dispatch(loginSuccess(userInfo));
        dispatch(stopLoading());
        dispatch(checkAuthTimeOut(expires));
        notify("LOGIN SUCCESS", "Welcome to our store!", "success");
        setTimeout(() => {
          history.push("/");
        }, 3500);
      })
      .catch(() => {
        dispatch(handleError());
        notify("LOGIN FAILED", "Please try again!!!", "error");
      });
  };
};

const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: userInfo,
  };
};

const handleError = () => {
  return {
    type: actionTypes.AUTH_ERROR,
  };
};

const waiting = () => {
  return {
    type: actionTypes.AUTH_WAITING,
  };
};

const checkAuthTimeOut = (expire) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expire.getTime() - new Date().getTime());
  };
};

export const logout = () => {
  localStorage.removeItem("expire");
  localStorage.removeItem("token");
  localStorage.removeItem("idUser");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const stopLoading = () => {
  return {
    type: actionTypes.STOP_LOADING,
  };
};

export const register = (notify, { confirm, ...registerInfo }, history) => {
  return (dispatch) => {
    dispatch(waiting());
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/Account/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInfo),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(stopLoading());
          notify(
            "REGISTER SUCCESS",
            "Let 's log in to go shopping!",
            "success"
          );
          setTimeout(() => {
            history.push("/login");
          }, 3500);
        } else {
          return Promise.reject();
        }
      })
      .catch(() => {
        dispatch(handleError());
        notify("REGISTER FAILED", "Please try again!!!", "error");
      });
  };
};

export const reset = (notify, email) => {
  console.log(email);
  return (dispatch) => {
    dispatch(waiting());
    fetch(
      `${process.env.REACT_APP_HOST_DOMAIN}/api/Account/resetpassword?email=${email}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (response.ok) {
          dispatch(stopLoading());
          notify(
            "RESET SUCCESS",
            "We have already sent email to your email address.",
            "success"
          );
        } else {
          return new Promise.reject();
        }
      })
      .catch(() => {
        dispatch(handleError());
        notify(
          "RESET FAILED",
          "Something went wrong :( Please try again.",
          "error"
        );
      });
  };
};
