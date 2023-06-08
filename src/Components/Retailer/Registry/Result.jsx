import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faEye, faArrowLeft, faCheckCircle, faPencil, faGauge, faBook, faMagnifyingGlass, faBalanceScale, faUser, faArrowUpRightFromSquare, faDownload, faBarcode } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getRegistryAPI } from "../../../API/registry";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormCheckboxField from "../../Element/FormCheckboxField";
import FormSelectField from "../../Element/FormSelectField";
import FormDateField from "../../Element/FormDateField";
import {
    FINDING_OPTIONS,
    OVERALL_NUMBER_GRADE_OPTIONS,
    PUBLISHER_NAME_OPTIONS,
    CPS_PERCENTAGE_GRADE_OPTIONS,
    HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS
} from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function RetailerRegistryResult() {
    ////
    //// URL Parameters.
    ////

    const { cpsn } = useParams()

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [submission, setSubmission] = useState({});
    const [showCustomerEditOptions, setShowCustomerEditOptions] = useState(false);

    ////
    //// Event handling.
    ////


    ////
    //// API.
    ////

    function onSubmissionDetailSuccess(response){
        console.log("onSubmissionDetailSuccess: Starting...");
        setSubmission(response);
    }

    function onSubmissionDetailError(apiErr) {
        console.log("onSubmissionDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onSubmissionDetailDone() {
        console.log("onSubmissionDetailDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.

            setFetching(true);
            getRegistryAPI(
                cpsn,
                onSubmissionDetailSuccess,
                onSubmissionDetailError,
                onSubmissionDetailDone
            );
        }

        return () => { mounted = false; }
    }, [cpsn]);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/registry" aria-current="page"><FontAwesomeIcon className="fas" icon={faBarcode} />&nbsp;Registry</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-2"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submission</p>
                        <FormErrorBox errors={errors} />

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

                        {!isFetching && submission && <div class="container">


                            <p class="subtitle is-3 pt-4"><FontAwesomeIcon className="fas" icon={faBook} />&nbsp;Comic Book Information</p>
                            <hr />

                            {submission && <FormInputField
                                label="Series Title"
                                name="seriesTitle"
                                placeholder="Text input"
                                value={submission.seriesTitle}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />}

                            {submission && <FormInputField
                                label="Issue Vol"
                                name="issueVol"
                                placeholder="Text input"
                                value={submission.issueVol}
                                helpText=""
                                isRequired={true}
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormInputField
                                label="Issue No"
                                name="issueNo"
                                placeholder="Text input"
                                value={submission.issueNo}
                                helpText=""
                                isRequired={true}
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormDateField
                                label="Issue Cover Date"
                                name="issueCoverDate"
                                placeholder="Text input"
                                value={submission.issueCoverDate}
                                helpText=""
                                isRequired={true}
                                maxWidth="110px"
                                disabled={true}
                            />}

                            <FormSelectField
                                label="Publisher Name"
                                name="publisherName"
                                placeholder="Publisher Name"
                                selectedValue={submission.publisherName}
                                helpText=""
                                options={PUBLISHER_NAME_OPTIONS}
                                disabled={true}
                            />

                            {submission.publisherName === "Other" && <FormInputField
                                label="Publisher Name (Other)"
                                name="publisherNameOther"
                                placeholder="Text input"
                                value={submission.publisherNameOther}
                                helpText=""
                                isRequired={true}
                                maxWidth="280px"
                                disabled={true}
                            />}

                            <FormInputField
                                label="Special Note - Line 1 (Optional)"
                                name="specialNotesLine1"
                                placeholder="Text input"
                                value={submission.specialNotesLine1}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                                disabled={true}
                            />

                            <FormInputField
                                label="Special Note - Line 2 (Optional)"
                                name="specialNotesLine2"
                                placeholder="Text input"
                                value={submission.specialNotesLine2}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                                disabled={true}
                            />

                            <FormInputField
                                label="Special Note - Line 3 (Optional)"
                                name="specialNotesLine3"
                                placeholder="Text input"
                                value={submission.specialNotesLine3}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                                disabled={true}
                            />

                            <FormInputField
                                label="Special Note - Line 4 (Optional)"
                                name="specialNotesLine4"
                                placeholder="Text input"
                                value={submission.specialNotesLine4}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                                disabled={true}
                            />

                            <FormInputField
                                label="Special Note - Line 5 (Optional)"
                                name="specialNotesLine5"
                                placeholder="Text input"
                                value={submission.specialNotesLine5}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                                disabled={true}
                            />

                            <p class="subtitle is-3 pt-4"><FontAwesomeIcon className="fas" icon={faMagnifyingGlass} />&nbsp;Summary of Findings</p>
                            <hr />

                            <FormRadioField
                                label="Shows signs of tampering/restoration"
                                name="showsSignsOfTamperingOrRestoration"
                                value={submission.showsSignsOfTamperingOrRestoration}
                                opt1Value={"2"}
                                opt1Label="No"
                                opt2Value={"1"}
                                opt2Label="Yes"
                                maxWidth="180px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Grading Note - Line 1 (Optional)"
                                name="gradingNotesLine1"
                                placeholder="Text input"
                                value={submission.gradingNotesLine1}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                                disabled={true}
                            />

                            <FormInputField
                                label="Grading Note - Line 2 (Optional)"
                                name="gradingNotesLine2"
                                placeholder="Text input"
                                value={submission.gradingNotesLine2}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                                disabled={true}
                            />

                            <FormInputField
                                label="Grading Note - Line 3 (Optional)"
                                name="gradingNotesLine3"
                                placeholder="Text input"
                                value={submission.gradingNotesLine3}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                                disabled={true}
                            />

                            <FormInputField
                                label="Grading Note - Line 4 (Optional)"
                                name="gradingNotesLine4"
                                placeholder="Text input"
                                value={submission.gradingNotesLine4}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                                disabled={true}
                            />

                            <FormInputField
                                label="Grading Note - Line 5 (Optional)"
                                name="gradingNotesLine5"
                                placeholder="Text input"
                                value={submission.gradingNotesLine5}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                                disabled={true}
                            />

                            <p class="subtitle is-3 pt-4"><FontAwesomeIcon className="fas" icon={faBalanceScale} />&nbsp;Grading</p>
                            <hr />

                            <FormRadioField
                                label="Which type of grading scale would you prefer?"
                                name="gradingScale"
                                value={parseInt(submission.gradingScale)}
                                opt1Value={1}
                                opt1Label="Letter Grade (Poor-Near Mint)"
                                opt2Value={2}
                                opt2Label="Numbers (0.5-10.0)"
                                opt3Value={3}
                                opt3Label="CPS Percentage (5%-100%)"
                                maxWidth="180px"
                            />

                            {submission && submission.gradingScale === 1 && <FormSelectField
                                label="Overall Letter Grade"
                                name="overallLetterGrade"
                                placeholder="Overall Letter Grade"
                                selectedValue={submission.overallLetterGrade}
                                helpText=""
                                options={FINDING_OPTIONS}
                                disabled={true}
                            />}

                            {submission && submission.gradingScale === 2 && <FormSelectField
                                label="Overall Number Grade"
                                name="overallNumberGrade"
                                placeholder="Overall Number Grade"
                                selectedValue={submission.overallNumberGrade}
                                helpText=""
                                options={OVERALL_NUMBER_GRADE_OPTIONS}
                                disabled={true}
                            />}

                            {submission && submission.gradingScale === 3 && <FormSelectField
                                label="CPS Percentage Grade"
                                name="cpsPercentageGrade"
                                placeholder="CPS Percentage Grade"
                                selectedValue={submission.cpsPercentageGrade}
                                helpText=""
                                options={CPS_PERCENTAGE_GRADE_OPTIONS}
                                disabled={true}
                            />}

                            <div class="columns pt-4">
                                <div class="column is-half">
                                    <Link to={`/registry`} class="button is-medium is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link to={`/registry`} class="button is-medium is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                </div>
                                <div class="column is-half has-text-right">

                                </div>
                            </div>
                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerRegistryResult;
