const HTTP_API_SERVER =  process.env.REACT_APP_API_PROTOCOL + "://" + process.env.REACT_APP_API_DOMAIN;
export const CPS_API_BASE_PATH = "/api/v1";
export const CPS_VERSION_ENDPOINT = "version";
export const CPS_LOGIN_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/login";
export const CPS_REGISTER_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/register";
export const CPS_REFRESH_TOKEN_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/refresh-token";
export const CPS_SUBMISSIONS_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/submissions";
export const CPS_SUBMISSION_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/submission/{id}";
