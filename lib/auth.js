

let isAuth = false;

export const setAuthenticated = (value) => {
    isAuth = value;
};

export const isAuthenticated = () => {
  return isAuth;
};
