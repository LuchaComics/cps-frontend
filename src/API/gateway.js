import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys } from 'humps';
import {
    CPS_LOGIN_API_ENDPOINT,
    CPS_VERSION_ENDPOINT,
    CPS_REGISTER_API_ENDPOINT
} from "../Constants/API";

import {
    setAccessTokenInLocalStorage,
    setRefreshTokenInLocalStorage
} from '../Helpers/jwtUtility';

export function postLoginAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    axios.post(CPS_LOGIN_API_ENDPOINT, decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        let profile = camelizeKeys(responseData);

        // SAVE OUR CREDENTIALS IN PERSISTENT STORAGE. THIS IS AN IMPORTANT
        // STEP BECAUSE OUR TOKEN UTILITY HELPER NEEDS THIS.
        setAccessTokenInLocalStorage(profile.accessToken);
        setRefreshTokenInLocalStorage(profile.refreshToken);

        // Return the callback data.
        onSuccessCallback(profile);
    }).catch( (exception) => {
        let responseData = null;
        if (exception.response !== undefined && exception.response !== null) {
            if (exception.response.data !== undefined && exception.response.data !== null) {
                responseData = exception.response.data;
            } else {
                responseData = exception.response;
            }
        } else {
            responseData = exception;
        }
        let errors = camelizeKeys(responseData);

        // Check for incorrect password and enter our own custom error.
        let errorsStr = JSON.stringify(errors);
        if (errorsStr.includes("Incorrect email or password")) { // NOTE: This is the exact error from backend on incorrect email/pass.
            errors = {
                "auth": "Incorrect email or password",
            };
        }

        onErrorCallback(errors);
    }).then(onDoneCallback);
}


export function postRegisterAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    // Minor fixes.
    decamelizedData.agree_tos = data.AgreeTOS;
    decamelizedData.address_line_1 = data.AddressLine1;
    decamelizedData.address_line_2= data.AddressLine2;

    axios.post(CPS_REGISTER_API_ENDPOINT, decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        let profile = camelizeKeys(responseData);

        // SAVE OUR CREDENTIALS IN PERSISTENT STORAGE. THIS IS AN IMPORTANT
        // STEP BECAUSE OUR TOKEN UTILITY HELPER NEEDS THIS.
        if (profile.accessToken) {
            setAccessTokenInLocalStorage(profile.accessToken);
        }
        if (profile.refreshToken) {
            setRefreshTokenInLocalStorage(profile.refreshToken);
        }

        // Return the callback data.
        onSuccessCallback(profile);
    }).catch( (exception) => {
        let responseData = null;
        if (exception.response !== undefined && exception.response !== null) {
            if (exception.response.data !== undefined && exception.response.data !== null) {
                responseData = exception.response.data;
            } else {
                responseData = exception.response;
            }
        } else {
            responseData = exception;
        }
        let errors = camelizeKeys(responseData);

        // Check for incorrect password and enter our own custom error.
        let errorsStr = JSON.stringify(errors);
        if (errorsStr.includes("Incorrect email or password")) { // NOTE: This is the exact error from backend on incorrect email/pass.
            errors = {
                "auth": "Incorrect email or password",
            };
        }

        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function getVersionAPI(onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.get(CPS_VERSION_ENDPOINT).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}
