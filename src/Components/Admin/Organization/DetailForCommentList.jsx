import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faEye, faArrowLeft, faCheckCircle, faPencil, faGauge, faBook, faMagnifyingGlass, faBalanceScale, faUser, faArrowUpRightFromSquare, faComments, faUsers, faUserCircle, faBuilding } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { DateTime } from "luxon";

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getOrganizationDetailAPI, postOrganizationCreateCommentOperationAPI } from "../../../API/organization";
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


function AdminOrganizationDetailForCommentList() {
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
    const [organization, setOrganization] = useState({});
    const [showOrganizationEditOptions, setShowOrganizationEditOptions] = useState(false);
    const [content, setContent] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");// Submit to the backend.
        console.log("onSubmitClick, organization:", organization);
        setErrors(null);
        postOrganizationCreateCommentOperationAPI(id, content, onOrganizationUpdateSuccess, onOrganizationUpdateError, onOrganizationUpdateDone);
    }

    ////
    //// API.
    ////

    function onOrganizationDetailSuccess(response){
        console.log("onOrganizationDetailSuccess: Starting...");
        setOrganization(response);
    }

    function onOrganizationDetailError(apiErr) {
        console.log("onOrganizationDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrganizationDetailDone() {
        console.log("onOrganizationDetailDone: Starting...");
        setFetching(false);
    }

    function onOrganizationUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onOrganizationUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Comment created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onOrganizationUpdateSuccess: Delayed for 2 seconds.");
            console.log("onOrganizationUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Reset content.
        setContent("");

        // Fetch latest data.
        getOrganizationDetailAPI(
            id,
            onOrganizationDetailSuccess,
            onOrganizationDetailError,
            onOrganizationDetailDone
        );
    }

    function onOrganizationUpdateError(apiErr) {
        console.log("onOrganizationUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onOrganizationUpdateError: Delayed for 2 seconds.");
            console.log("onOrganizationUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrganizationUpdateDone() {
        console.log("onOrganizationUpdateDone: Starting...");
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
            getOrganizationDetailAPI(
                id,
                onOrganizationDetailSuccess,
                onOrganizationDetailError,
                onOrganizationDetailDone
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
            <div class={`modal ${showOrganizationEditOptions ? 'is-active' : ''}`}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Organization Edit</p>
                        <button class="delete" aria-label="close" onClick={(e)=>setShowOrganizationEditOptions(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        To edit the organization, please select one of the following option:

                        {/*
                            <br /><br />
                            <Link to={`/organization/${organization.id}/edit-organization`} class="button is-primary" disabled={true}>Edit Current Organization</Link> */}
                        <br /><br />
                        <Link to={`/admin/organization/${organization.id}/organization/search`} class="button is-primary">Pick a Different Organization</Link>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" onClick={(e)=>setShowOrganizationEditOptions(false)}>Close</button>
                    </footer>
                </div>
            </div>

            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                            <li class=""><Link to="/admin/organizations" aria-current="page"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organizations</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <p class="title is-2"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organization</p>
                            </div>
                            {/* HIDDEN */}
                            <div class="is-hidden column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/admin/submissions/add?organization_id=${id}&organization_name=${organization.name}`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/admin/submissions/add?organization_id=${id}&organization_name=${organization.name}`} class="button is-small is-success is-hidden-touch" type="button">
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

                        {!isFetching && organization && <div class="container">
                            <div class="tabs is-medium">
                              <ul>
                                <li>
                                    <Link to={`/admin/organization/${id}`}>Detail</Link>
                                </li>
                                <li>
                                    <Link to={`/admin/organization/${organization.id}/users`}>Users</Link>
                                </li>
                                <li>
                                    <Link to={`/admin/organization/${organization.id}/sub`}>Submissions</Link>
                                </li>
                                <li class="is-active">
                                    <Link><b>Comments</b></Link>
                                </li>
                              </ul>
                            </div>

                            <p class="subtitle is-3 pt-4"><FontAwesomeIcon className="fas" icon={faComments} />&nbsp;Comments</p>
                            <hr />

                            {organization.comments && organization.comments.length > 0 && <>
                                {organization.comments.map(function(comment, i){
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
                                    <Link to={`/admin/organizations`} class="button is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link to={`/admin/organizations`} class="button is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
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

export default AdminOrganizationDetailForCommentList;
