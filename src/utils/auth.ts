export const getToken = () => {
  return localStorage.getItem("sgs_token");
};

export const isAuthenticated = () => {
  return !!getToken();
};
