import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faEye, faArrowLeft, faCheckCircle, faPencil, faGauge, faBook, faMagnifyingGlass, faBalanceScale, faUser, faArrowUpRightFromSquare, faComments, faUsers, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { DateTime } from "luxon";

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getCustomerDetailAPI, postCustomerCreateCommentOperationAPI } from "../../../API/customer";
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


function RetailerCustomerDetailForCommentList() {
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
    const [customer, setCustomer] = useState({});
    const [showCustomerEditOptions, setShowCustomerEditOptions] = useState(false);
    const [content, setContent] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");// Submit to the backend.
        console.log("onSubmitClick, customer:", customer);
        setErrors(null);
        postCustomerCreateCommentOperationAPI(id, content, onCustomerUpdateSuccess, onCustomerUpdateError, onCustomerUpdateDone);
    }

    ////
    //// API.
    ////

    function onCustomerDetailSuccess(response){
        console.log("onCustomerDetailSuccess: Starting...");
        setCustomer(response);
    }

    function onCustomerDetailError(apiErr) {
        console.log("onCustomerDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onCustomerDetailDone() {
        console.log("onCustomerDetailDone: Starting...");
        setFetching(false);
    }

    function onCustomerUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onCustomerUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Comment created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onCustomerUpdateSuccess: Delayed for 2 seconds.");
            console.log("onCustomerUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Reset content.
        setContent("");

        // Fetch latest data.
        getCustomerDetailAPI(
            id,
            onCustomerDetailSuccess,
            onCustomerDetailError,
            onCustomerDetailDone
        );
    }

    function onCustomerUpdateError(apiErr) {
        console.log("onCustomerUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onCustomerUpdateError: Delayed for 2 seconds.");
            console.log("onCustomerUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onCustomerUpdateDone() {
        console.log("onCustomerUpdateDone: Starting...");
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
            getCustomerDetailAPI(
                id,
                onCustomerDetailSuccess,
                onCustomerDetailError,
                onCustomerDetailDone
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
                            <Link to={`/customer/${customer.id}/edit-customer`} class="button is-primary" disabled={true}>Edit Current Customer</Link> */}
                        <br /><br />
                        <Link to={`/customer/${customer.id}/customer/search`} class="button is-primary">Pick a Different Customer</Link>
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
                            <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/customers" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <p class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Customer</p>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/submissions/add?customer_id=${id}&customer_name=${customer.name}`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/submissions/add?customer_id=${id}&customer_name=${customer.name}`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                            </div>
                        </div>
                        <FormErrorBox errors={errors} />

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

                        {!isFetching && customer && <div class="container">
                            <div class="tabs is-medium">
                              <ul>
                                <li>
                                    <Link to={`/customer/${id}`}>Detail</Link>
                                </li>
                                <li>
                                    <Link to={`/customer/${id}/sub`}>Submissions</Link>
                                </li>
                                <li class="is-active">
                                    <Link><b>Comments</b></Link>
                                </li>
                              </ul>
                            </div>

                            <p class="subtitle is-3 pt-4"><FontAwesomeIcon className="fas" icon={faComments} />&nbsp;Comments</p>

                            {customer.comments && customer.comments.length > 0 && <>
                                {customer.comments.map(function(comment, i){
                                    console.log(comment); // For debugging purposes only.
                                    return <div className="pb-3">
                                        <span class="is-pulled-right has-text-grey-light">{comment.createdByName} at <b>{DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_MED)}</b></span>
                                        <br />
                                        <article class="message">
                                            <div class="message-body">{comment.content}</div>
                                        </article>
                                    </div>
                                })}
                            </>}

                            <div class="mt-4 block has-background-success-light p-3">
                                    <FormTextareaField
                                        label="Write your comment here:"
                                        name="content"
                                        placeholder="Text input"
                                        value={content}
                                        errorText={errors && errors.content}
                                        helpText=""
                                        onChange={(e)=>setContent(e.target.value)}
                                        isRequired={true}
                                        maxWidth="180px"
                                    />
                                </div>




                            <div class="columns pt-4">
                                <div class="column is-half">
                                    <Link to={`/customers`} class="button is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link to={`/customers`} class="button is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                </div>
                                <div class="column is-half has-text-right">
                                    <button onClick={onSubmitClick} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Comment</button>
                                    <button onClick={onSubmitClick} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Comment</button>
                                </div>
                            </div>


                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerCustomerDetailForCommentList;
