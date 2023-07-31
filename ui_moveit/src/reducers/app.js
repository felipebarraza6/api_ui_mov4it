export const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.access_token)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "profile",
        JSON.stringify(action.payload.profile_data)
      );

      return {
        ...state,
        isAuth: true,
        token: action.payload.access_token,
        user: action.payload.user,
        profile: action.payload.profile_data,
      };

    case "UPDATE_COUNT":
      return {
        ...state,
        update_count: state.update_count + 1,
      };
    case "UPDATE":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "profile",
        JSON.stringify(action.payload.profile_data)
      );
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
        profile: action.payload.profile_data,
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        token: null,
        user: null,
        profile: null,
      };

    default:
      return state;
  }
};
