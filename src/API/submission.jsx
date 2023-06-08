import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { DateTime } from "luxon";

import {
    CPS_SUBMISSIONS_API_ENDPOINT,
    CPS_SUBMISSION_API_ENDPOINT,
    CPS_SUBMISSION_CUSTOMER_SWAP_OPERATION_API_ENDPOINT,
    CPS_SUBMISSION_CREATE_COMMENT_OPERATION_API_ENDPOINT
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

        // Bugfixes.
        console.log("getSubmissionListAPI | pre-fix | results:", data);
        if (data.results !== undefined && data.results !== null && data.results.length > 0) {
            data.results.forEach(
                (item, index) => {
                    item.issueCoverDate = DateTime.fromISO(item.issueCoverDate).toLocaleString(DateTime.DATETIME_MED);
                    item.createdAt = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED);
                    console.log(item, index);
                }
            )
        }
        console.log("getSubmissionListAPI | post-fix | results:", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postSubmissionCreateAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    console.log("postSubmissionCreateAPI | pre-modified | data:", data);

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    // Minor bugfixes.
    decamelizedData.special_notes_line_1 = decamelizedData.special_notes_line1;
    decamelizedData.special_notes_line_2 = decamelizedData.special_notes_line2;
    decamelizedData.special_notes_line_3 = decamelizedData.special_notes_line3;
    decamelizedData.special_notes_line_4 = decamelizedData.special_notes_line4;
    decamelizedData.special_notes_line_5 = decamelizedData.special_notes_line5;
    decamelizedData.special_notes_line_6 = decamelizedData.special_notes_line6;
    decamelizedData.special_notes_line_7 = decamelizedData.special_notes_line7;
    decamelizedData.special_notes_line_8 = decamelizedData.special_notes_line8;
    decamelizedData.special_notes_line_9 = decamelizedData.special_notes_line9;
    decamelizedData.special_notes_line_10 = decamelizedData.special_notes_line10;
    decamelizedData.special_notes_line_11 = decamelizedData.special_notes_line11;
    decamelizedData.special_notes_line_12 = decamelizedData.special_notes_line12;
    decamelizedData.special_notes_line_13 = decamelizedData.special_notes_line13;
    delete decamelizedData.special_notes_line1;
    delete decamelizedData.special_notes_line2;
    delete decamelizedData.special_notes_line3;
    delete decamelizedData.special_notes_line4;
    delete decamelizedData.special_notes_line5;
    delete decamelizedData.special_notes_line6;
    delete decamelizedData.special_notes_line7;
    delete decamelizedData.special_notes_line8;
    delete decamelizedData.special_notes_line9;
    delete decamelizedData.special_notes_line10;
    delete decamelizedData.special_notes_line11;
    delete decamelizedData.special_notes_line12;
    delete decamelizedData.special_notes_line13;

    decamelizedData.user_id = decamelizedData.user_i_d;
    delete decamelizedData.user_i_d;

    decamelizedData.grading_notes_line_1 = decamelizedData.grading_notes_line1;
    decamelizedData.grading_notes_line_2 = decamelizedData.grading_notes_line2;
    decamelizedData.grading_notes_line_3 = decamelizedData.grading_notes_line3;
    decamelizedData.grading_notes_line_4 = decamelizedData.grading_notes_line4;
    decamelizedData.grading_notes_line_5 = decamelizedData.grading_notes_line5;
    decamelizedData.grading_notes_line_6 = decamelizedData.grading_notes_line6;
    decamelizedData.grading_notes_line_7 = decamelizedData.grading_notes_line7;
    decamelizedData.grading_notes_line_8 = decamelizedData.grading_notes_line8;
    decamelizedData.grading_notes_line_9 = decamelizedData.grading_notes_line9;
    decamelizedData.grading_notes_line_10 = decamelizedData.grading_notes_line10;
    decamelizedData.grading_notes_line_11 = decamelizedData.grading_notes_line11;
    decamelizedData.grading_notes_line_12 = decamelizedData.grading_notes_line12;
    decamelizedData.grading_notes_line_13 = decamelizedData.grading_notes_line13;
    delete decamelizedData.grading_notes_line1;
    delete decamelizedData.grading_notes_line2;
    delete decamelizedData.grading_notes_line3;
    delete decamelizedData.grading_notes_line4;
    delete decamelizedData.grading_notes_line5;
    delete decamelizedData.grading_notes_line6;
    delete decamelizedData.grading_notes_line7;
    delete decamelizedData.grading_notes_line8;
    delete decamelizedData.grading_notes_line9;
    delete decamelizedData.grading_notes_line10;
    delete decamelizedData.grading_notes_line11;
    delete decamelizedData.grading_notes_line12;
    delete decamelizedData.grading_notes_line13;

    // if (data.issueCoverDate !==undefined && data.issueCoverDate !==null && data.issueCoverDate !=="") {
    //     decamelizedData.issue_cover_date = new Date(data.issueCoverDate).toISOString();
    // }

    console.log("postSubmissionCreateAPI | post-modified | data:", decamelizedData);

    axios.post(CPS_SUBMISSIONS_API_ENDPOINT, decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Minor bugfix.
        data.showsSignsOfTamperingOrRestoration = parseInt(data.showsSignsOfTamperingOrRestoration);
        // data.issueCoverDate = DateTime.fromISO(data.issueCoverDate).toJSDate();

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
        data.showsSignsOfTamperingOrRestoration = parseInt(data.showsSignsOfTamperingOrRestoration);
        // data.issueCoverDate = DateTime.fromISO(data.issueCoverDate).toJSDate();

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

    console.log("putSubmissionUpdateAPI | pre-edited | decamelizedData:", decamelizedData); // For debugging purposes only.

    // Minor bugfixes.
    decamelizedData.special_notes_line_1 = decamelizedData.special_notes_line1;
    decamelizedData.special_notes_line_2 = decamelizedData.special_notes_line2;
    decamelizedData.special_notes_line_3 = decamelizedData.special_notes_line3;
    decamelizedData.special_notes_line_4 = decamelizedData.special_notes_line4;
    decamelizedData.special_notes_line_5 = decamelizedData.special_notes_line5;
    decamelizedData.special_notes_line_6 = decamelizedData.special_notes_line6;
    decamelizedData.special_notes_line_7 = decamelizedData.special_notes_line7;
    decamelizedData.special_notes_line_8 = decamelizedData.special_notes_line8;
    decamelizedData.special_notes_line_9 = decamelizedData.special_notes_line9;
    decamelizedData.special_notes_line_10 = decamelizedData.special_notes_line10;
    decamelizedData.special_notes_line_11 = decamelizedData.special_notes_line11;
    decamelizedData.special_notes_line_12 = decamelizedData.special_notes_line12;
    decamelizedData.special_notes_line_13 = decamelizedData.special_notes_line13;
    delete decamelizedData.special_notes_line1;
    delete decamelizedData.special_notes_line2;
    delete decamelizedData.special_notes_line3;
    delete decamelizedData.special_notes_line4;
    delete decamelizedData.special_notes_line5;
    delete decamelizedData.special_notes_line6;
    delete decamelizedData.special_notes_line7;
    delete decamelizedData.special_notes_line8;
    delete decamelizedData.special_notes_line9;
    delete decamelizedData.special_notes_line10;
    delete decamelizedData.special_notes_line11;
    delete decamelizedData.special_notes_line12;
    delete decamelizedData.special_notes_line13;

    decamelizedData.grading_notes_line_1 = decamelizedData.grading_notes_line1;
    decamelizedData.grading_notes_line_2 = decamelizedData.grading_notes_line2;
    decamelizedData.grading_notes_line_3 = decamelizedData.grading_notes_line3;
    decamelizedData.grading_notes_line_4 = decamelizedData.grading_notes_line4;
    decamelizedData.grading_notes_line_5 = decamelizedData.grading_notes_line5;
    decamelizedData.grading_notes_line_6 = decamelizedData.grading_notes_line6;
    decamelizedData.grading_notes_line_7 = decamelizedData.grading_notes_line7;
    decamelizedData.grading_notes_line_8 = decamelizedData.grading_notes_line8;
    decamelizedData.grading_notes_line_9 = decamelizedData.grading_notes_line9;
    decamelizedData.grading_notes_line_10 = decamelizedData.grading_notes_line10;
    decamelizedData.grading_notes_line_11 = decamelizedData.grading_notes_line11;
    decamelizedData.grading_notes_line_12 = decamelizedData.grading_notes_line12;
    decamelizedData.grading_notes_line_13 = decamelizedData.grading_notes_line13;
    delete decamelizedData.grading_notes_line1;
    delete decamelizedData.grading_notes_line2;
    delete decamelizedData.grading_notes_line3;
    delete decamelizedData.grading_notes_line4;
    delete decamelizedData.grading_notes_line5;
    delete decamelizedData.grading_notes_line6;
    delete decamelizedData.grading_notes_line7;
    delete decamelizedData.grading_notes_line8;
    delete decamelizedData.grading_notes_line9;
    delete decamelizedData.grading_notes_line10;
    delete decamelizedData.grading_notes_line11;
    delete decamelizedData.grading_notes_line12;
    delete decamelizedData.grading_notes_line13;

    // if (data.issueCoverDate !==undefined && data.issueCoverDate !==null && data.issueCoverDate !=="") {
    //     decamelizedData.issue_cover_date = new Date(data.issueCoverDate).toISOString();
    // }

    console.log("putSubmissionUpdateAPI | post-edited | decamelizedData:", decamelizedData);

    axios.put(CPS_SUBMISSION_API_ENDPOINT.replace("{id}", decamelizedData.id), decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Minor bugfix.
        data.showsSignsOfTamperingOrRestoration = parseInt(data.showsSignsOfTamperingOrRestoration);
        // data.issueCoverDate = DateTime.fromISO(data.issueCoverDate).toJSDate();

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

export function postSubmissionCreateCommentOperationAPI(submissionID, content, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    const data = {
        submission_id: submissionID,
        content: content,
    };
    axios.post(CPS_SUBMISSION_CREATE_COMMENT_OPERATION_API_ENDPOINT, data).then((successResponse) => {
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
