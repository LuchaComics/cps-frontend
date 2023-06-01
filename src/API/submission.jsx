import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import {
    CPS_SUBMISSIONS_API_ENDPOINT,
    CPS_SUBMISSION_API_ENDPOINT,
    CPS_SUBMISSION_CUSTOMER_SWAP_OPERATION_API_ENDPOINT
} from "../Constants/API";

export function getSubmissionListAPI(filtersMap=new Map(), onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // The following code will generate the query parameters for the url based on the map.
    let aURL = CPS_SUBMISSIONS_API_ENDPOINT;
    filtersMap.forEach(
        (value, key) => {
            let decamelizedkey = decamelize(key)
            if (aURL.indexOf('?') > -1) {
                aURL += "&"+decamelizedkey+"="+value;
            } else {
                aURL += "?"+decamelizedkey+"="+value;
            }
        }
    )

    axios.get(aURL).then((successResponse) => {
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

export function postSubmissionCreateAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    // Minor bugfixes.
    decamelizedData.special_notes_line_1 = decamelizedData.special_notes_line1;
    decamelizedData.special_notes_line_2 = decamelizedData.special_notes_line2;
    decamelizedData.special_notes_line_3 = decamelizedData.special_notes_line3;
    decamelizedData.special_notes_line_4 = decamelizedData.special_notes_line4;
    decamelizedData.special_notes_line_5 = decamelizedData.special_notes_line5;
    delete decamelizedData.special_notes_line1;
    delete decamelizedData.special_notes_line2;
    delete decamelizedData.special_notes_line3;
    delete decamelizedData.special_notes_line4;
    delete decamelizedData.special_notes_line5;

    decamelizedData.user_id = decamelizedData.user_i_d;
    delete decamelizedData.user_i_d;

    decamelizedData.grading_notes_line_1 = decamelizedData.grading_notes_line1;
    decamelizedData.grading_notes_line_2 = decamelizedData.grading_notes_line2;
    decamelizedData.grading_notes_line_3 = decamelizedData.grading_notes_line3;
    decamelizedData.grading_notes_line_4 = decamelizedData.grading_notes_line4;
    decamelizedData.grading_notes_line_5 = decamelizedData.grading_notes_line5;
    delete decamelizedData.grading_notes_line1;
    delete decamelizedData.grading_notes_line2;
    delete decamelizedData.grading_notes_line3;
    delete decamelizedData.grading_notes_line4;
    delete decamelizedData.grading_notes_line5;

    axios.post(CPS_SUBMISSIONS_API_ENDPOINT, decamelizedData).then((successResponse) => {
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

export function getSubmissionDetailAPI(submissionID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.get(CPS_SUBMISSION_API_ENDPOINT.replace("{id}", submissionID)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Minor bugfix.
        data.showsSignsOfTamperingOrRestoration = String(data.showsSignsOfTamperingOrRestoration);

        // For debugging purposeso pnly.
        console.log(data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function putSubmissionUpdateAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    // Minor bugfixes.
    decamelizedData.id = data.ID;
    decamelizedData.special_notes_line_1 = decamelizedData.special_notes_line1;
    decamelizedData.special_notes_line_2 = decamelizedData.special_notes_line2;
    decamelizedData.special_notes_line_3 = decamelizedData.special_notes_line3;
    decamelizedData.special_notes_line_4 = decamelizedData.special_notes_line4;
    decamelizedData.special_notes_line_5 = decamelizedData.special_notes_line5;
    delete decamelizedData.special_notes_line1;
    delete decamelizedData.special_notes_line2;
    delete decamelizedData.special_notes_line3;
    delete decamelizedData.special_notes_line4;
    delete decamelizedData.special_notes_line5;
    decamelizedData.grading_notes_line_1 = decamelizedData.grading_notes_line1;
    decamelizedData.grading_notes_line_2 = decamelizedData.grading_notes_line2;
    decamelizedData.grading_notes_line_3 = decamelizedData.grading_notes_line3;
    decamelizedData.grading_notes_line_4 = decamelizedData.grading_notes_line4;
    decamelizedData.grading_notes_line_5 = decamelizedData.grading_notes_line5;
    delete decamelizedData.grading_notes_line1;
    delete decamelizedData.grading_notes_line2;
    delete decamelizedData.grading_notes_line3;
    delete decamelizedData.grading_notes_line4;
    delete decamelizedData.grading_notes_line5;

    axios.put(CPS_SUBMISSION_API_ENDPOINT.replace("{id}", decamelizedData.id), decamelizedData).then((successResponse) => {
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

export function deleteSubmissionAPI(id, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.delete(CPS_SUBMISSION_API_ENDPOINT.replace("{id}", id)).then((successResponse) => {
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

export function postSubmissionCustomerSwapOperationAPI(submissionID, customerID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    const data = {
        submission_id: submissionID,
        customer_id: customerID
    };
    axios.post(CPS_SUBMISSION_CUSTOMER_SWAP_OPERATION_API_ENDPOINT, data).then((successResponse) => {
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
