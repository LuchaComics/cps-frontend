const HTTP_API_SERVER =  process.env.REACT_APP_API_PROTOCOL + "://" + process.env.REACT_APP_API_DOMAIN;
export const CPS_API_BASE_PATH = "/api/v1";
export const CPS_VERSION_ENDPOINT = "version";
export const CPS_LOGIN_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/login";
export const CPS_REGISTER_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/register";
export const CPS_REFRESH_TOKEN_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/refresh-token";
export const CPS_EMAIL_VERIFICATION_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/verify";
export const CPS_LOGOUT_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/logout";
export const CPS_SUBMISSIONS_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/submissions";
export const CPS_SUBMISSION_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/submission/{id}";
export const CPS_SUBMISSION_CUSTOMER_SWAP_OPERATION_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/submissions/operation/set-user";
export const CPS_PROFILE_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/profile";
export const CPS_CUSTOMERS_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/customers";
export const CPS_CUSTOMER_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/customer/{id}";
export const CPS_ORGANIZATIONS_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/organizations";
export const CPS_ORGANIZATION_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/organization/{id}";
