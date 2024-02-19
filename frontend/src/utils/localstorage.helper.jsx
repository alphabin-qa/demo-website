export const setAuthToken = (authToken) =>
  localStorage.setItem("admin_auth_token", authToken);
export const getAuthToken = () => localStorage.getItem("admin_auth_token");
export const removeAuthToken = () =>
  localStorage.removeItem("admin_auth_token");

export const setUserAccessToken = (accessToken) =>
  localStorage.setItem("user_access_token", accessToken);
export const getUserAccessToken = () =>
  localStorage.getItem("user_access_token");
export const removeUserAccessToken = () =>
  localStorage.removeItem("user_access_token");
export const setUserData = (userData) => localStorage.setItem("user", userData);
