import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faEye, faArrowLeft, faCheckCircle, faPencil, faGauge, faBook, faMagnifyingGlass, faBalanceScale, faUser, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getSubmissionDetailAPI } from "../../../API/submission";
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


function AdminSubmissionDetailForCustomer() {
    ////
    //// URL Parameters.
    ////

    const { id } = useParams()

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
            getSubmissionDetailAPI(
                id,
                onSubmissionDetailSuccess,
                onSubmissionDetailError,
                onSubmissionDetailDone
            );
        }

        return () => { mounted = false; }
    }, [id]);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div class={`modal ${showCustomerEditOptions ? 'is-active' : ''}`}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Customer Edit</p>
                        <button class="delete" aria-label="close" onClick={(e)=>setShowCustomerEditOptions(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        To edit the customer, please select one of the following option:

                        {/*
                            <br /><br />
                            <Link to={`/submission/${submission.id}/edit-customer`} class="button is-primary" disabled={true}>Edit Current Customer</Link> */}
                        <br /><br />
                        <Link to={`/admin/submission/${submission.id}/cust/search`} class="button is-primary">Pick a Different Customer</Link>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" onClick={(e)=>setShowCustomerEditOptions(false)}>Close</button>
                    </footer>
                </div>
            </div>

            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                            <li class=""><Link to="/admin/submissions" aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
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
                            <div class="tabs is-medium">
                              <ul>
                                <li>
                                    <Link to={`/admin/submission/${id}`}>Detail</Link>
                                </li>
                                <li class="is-active">
                                    <Link><b>Customer</b></Link>
                                </li>
                                <li>
                                    <Link to={`/admin/submission/${id}/comments`}>Comments</Link>
                                </li>
                                <li>
                                    <Link to={`/admin/submission/${id}/file`}>File</Link>
                                </li>
                              </ul>
                            </div>
                            {submission && submission.user !== undefined && submission.user !== null && submission.user !== "" && <>
                                <p class="subtitle is-3 pt-4"><FontAwesomeIcon className="fas" icon={faUser} />&nbsp;Customer</p>
                                <hr />
                                <p class="pb-5"><Link to={`/admin/customer/${submission.user.id}`} target="_blank" rel="noreferrer">Click here&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} /></Link> to view the customer.</p>

                                <FormInputField
                                    label="Name"
                                    name="name"
                                    placeholder="Text input"
                                    value={submission.user.name}
                                    isRequired={true}
                                    maxWidth="280px"
                                    helpText={""}
                                    disabled={true}
                                />
                                <FormInputField
                                    label="Email"
                                    name="email"
                                    placeholder="Text input"
                                    value={submission.user.email}
                                    isRequired={true}
                                    maxWidth="280px"
                                    helpText={""}
                                    disabled={true}
                                />
                                <FormInputField
                                    label="Phone"
                                    name="phone"
                                    placeholder="Text input"
                                    value={submission.user.phone}
                                    isRequired={true}
                                    maxWidth="280px"
                                    helpText={""}
                                    disabled={true}
                                />
                                <FormInputField
                                    label="Country"
                                    name="country"
                                    placeholder="Text input"
                                    value={submission.user.country}
                                    isRequired={true}
                                    maxWidth="280px"
                                    helpText={""}
                                    disabled={true}
                                />
                                <FormInputField
                                    label="Region"
                                    name="region"
                                    placeholder="Text input"
                                    value={submission.user.region}
                                    isRequired={true}
                                    maxWidth="280px"
                                    helpText={""}
                                    disabled={true}
                                />
                                <FormInputField
                                    label="City"
                                    name="city"
                                    placeholder="Text input"
                                    value={submission.user.city}
                                    isRequired={true}
                                    maxWidth="280px"
                                    helpText={""}
                                    disabled={true}
                                />
                                <FormInputField
                                    label="Address Line 1"
                                    name="addressLine1"
                                    placeholder="Text input"
                                    value={submission.user.addressLine1}
                                    isRequired={true}
                                    maxWidth="280px"
                                    helpText={""}
                                    disabled={true}
                                />
                                <FormInputField
                                    label="Address Line 2"
                                    name="addressLine2"
                                    placeholder="Text input"
                                    value={submission.user.addressLine2}
                                    isRequired={true}
                                    maxWidth="280px"
                                    helpText={""}
                                    disabled={true}
                                />
                                <FormInputField
                                    label="Postal Code"
                                    name="postalCode"
                                    placeholder="Text input"
                                    value={submission.user.postalCode}
                                    isRequired={true}
                                    maxWidth="280px"
                                    helpText={""}
                                    disabled={true}
                                />
                                <FormSelectField
                                    label="How did you hear about us?"
                                    name="howDidYouHearAboutUs"
                                    placeholder="Pick"
                                    selectedValue={submission.user.howDidYouHearAboutUs}
                                    helpText=""
                                    options={HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS}
                                    disabled={true}
                                />
                                {submission.user.howDidYouHearAboutUs === 1 && <FormInputField
                                    label="Other (Please specify):"
                                    name="howDidYouHearAboutUsOther"
                                    placeholder="Text input"
                                    value={submission.user.howDidYouHearAboutUsOther}
                                    helpText=""
                                    isRequired={true}
                                    maxWidth="380px"
                                    disabled={true}
                                />}

                                <FormCheckboxField
                                    label="I agree to receive electronic updates from my local retailer and CPS"
                                    name="agreePromotionsEmail"
                                    checked={submission.user.agreePromotionsEmail}
                                    maxWidth="180px"
                                />

                                <div class="columns pt-5">
                                    <div class="column is-half">
                                        <Link to={`/admin/submissions`} class="button is-medium is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        <Link to={`/admin/submissions`} class="button is-medium is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    </div>
                                    <div class="column is-half has-text-right">
                                        <Link onClick={(e)=>setShowCustomerEditOptions(true)} class="button is-medium is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit Customer</Link>
                                        <Link onClick={(e)=>setShowCustomerEditOptions(true)} class="button is-medium is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit Customer</Link>
                                    </div>
                                </div>
                            </>}

                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminSubmissionDetailForCustomer;