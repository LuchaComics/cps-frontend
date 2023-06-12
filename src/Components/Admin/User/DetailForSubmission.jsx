import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faArrowRight, faTrashCan, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { SUBMISSION_STATES } from "../../../Constants/FieldOptions";

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getUserDetailAPI } from "../../../API/user";
import { getSubmissionListAPI, deleteSubmissionAPI } from "../../../API/submission";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import FormCheckboxField from "../../Element/FormCheckboxField";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminUserDetailForSubmission() {
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
    const [user, setUser] = useState({});
    const [tabIndex, setTabIndex] = useState(1);
    const [submissions, setSubmissions] = useState("");
    const [selectedSubmissionForDeletion, setSelectedSubmissionForDeletion] = useState("");

    ////
    //// Event handling.
    ////

    const fetchListByUserID = (userID) => {
        setFetching(true);
        getSubmissionListAPI(
            new Map(),
            onSubmissionListSuccess,
            onSubmissionListError,
            onSubmissionListDone
        );
    }

    const onSelectSubmissionForDeletion = (e, submission) => {
        console.log("onSelectSubmissionForDeletion", submission);
        setSelectedSubmissionForDeletion(submission);
    }

    const onDeselectSubmissionForDeletion = (e) => {
        console.log("onDeselectSubmissionForDeletion");
        setSelectedSubmissionForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteSubmissionAPI(
            selectedSubmissionForDeletion.id,
            onSubmissionDeleteSuccess,
            onSubmissionDeleteError,
            onSubmissionDeleteDone
        );
        setSelectedSubmissionForDeletion("");

    }

    ////
    //// API.
    ////

    // User details.

    function onUserDetailSuccess(response){
        console.log("onUserDetailSuccess: Starting...");
        setUser(response);
        fetchListByUserID(response.id);
    }

    function onUserDetailError(apiErr) {
        console.log("onUserDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onUserDetailDone() {
        console.log("onUserDetailDone: Starting...");
        setFetching(false);
    }

    // Submission list.

    function onSubmissionListSuccess(response){
        console.log("onSubmissionListSuccess: Starting...");
        if (response.results !== null) {
            setSubmissions(response);
        }
    }

    function onSubmissionListError(apiErr) {
        console.log("onSubmissionListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onSubmissionListDone() {
        console.log("onSubmissionListDone: Starting...");
        setFetching(false);
    }

    // Submission delete.

    function onSubmissionDeleteSuccess(response){
        console.log("onSubmissionDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Submission deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchListByUserID(id);
    }

    function onSubmissionDeleteError(apiErr) {
        console.log("onSubmissionDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onSubmissionDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onSubmissionDeleteDone() {
        console.log("onSubmissionDeleteDone: Starting...");
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
            getUserDetailAPI(
                id,
                onUserDetailSuccess,
                onUserDetailError,
                onUserDetailDone
            );
        }

        return () => { mounted = false; }
    }, []);
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
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                            <li class=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Users</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <div class={`modal ${selectedSubmissionForDeletion ? 'is-active' : ''}`}>
                        <div class="modal-background"></div>
                        <div class="modal-card">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Are you sure?</p>
                                <button class="delete" aria-label="close" onClick={onDeselectSubmissionForDeletion}></button>
                            </header>
                            <section class="modal-card-body">
                                You are about to <b>archive</b> this submission; it will no longer appear on your dashboard This action can be undone but you'll need to contact the system administrator. Are you sure you would like to continue?
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                <button class="button" onClick={onDeselectSubmissionForDeletion}>Cancel</button>
                            </footer>
                        </div>
                    </div>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <p class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;User</p>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/admin/submissions/add?user_id=${id}&user_name=${user.name}`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/admin/submissions/add?user_id=${id}&user_name=${user.name}`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                            </div>
                        </div>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

                        {!isFetching && user && <div class="container">
                            <div class="tabs is-medium">
                              <ul>
                                <li>
                                    <Link to={`/admin/user/${user.id}`}>Detail</Link>
                                </li>
                                <li class="is-active">
                                    <Link><b>Submissions</b></Link>
                                </li>
                                <li>
                                    <Link to={`/admin/user/${user.id}/comments`}>Comments</Link>
                                </li>
                              </ul>
                            </div>

                            {!isFetching && submissions && submissions.results && submissions.results.length > 0
                                ?
                                <div class="container">
                                    <div class="b-table">
                                        <div class="table-wrapper has-mobile-cards">
                                            <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Vol</th>
                                                        <th>No</th>
                                                        <th>State</th>
                                                        <th>Created</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {submissions && submissions.results && submissions.results.map(function(submission, i){
                                                        return <tr>
                                                            <td data-label="Title">{submission.seriesTitle}</td>
                                                            <td data-label="Vol">{submission.issueVol}</td>
                                                            <td data-label="No">{submission.issueNo}</td>
                                                            <td data-label="State">{SUBMISSION_STATES[submission.state]}</td>
                                                            <td data-label="Created">{submission.createdAt}</td>
                                                            <td class="is-actions-cell">
                                                                <div class="buttons is-right">
                                                                    <Link to={`/admin/submission/${submission.id}`} target="_blank" rel="noreferrer" class="button is-small is-primary" type="button">
                                                                        View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                                                    </Link>
                                                                    <Link to={`/admin/submission/${submission.id}/edit`} target="_blank" rel="noreferrer" class="button is-small is-warning" type="button">
                                                                        Edit&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                                                    </Link>
                                                                    <button onClick={(e, ses) => onSelectSubmissionForDeletion(e, submission)} class="button is-small is-danger" type="button">
                                                                        <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>;
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div class="container">
                                    <article class="message is-dark">
                                        <div class="message-body">
                                            No submissions. <b><Link to="/admin/submissions/add/search">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating a new submission.
                                        </div>
                                    </article>
                                </div>
                            }


                            <div class="columns pt-5">
                                <div class="column is-half">
                                    <Link class="button is-hidden-touch" to={`/admin/users`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/users`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                </div>
                                <div class="column is-half has-text-right">{/*
                                    <Link to={`/user/${id}/edit`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                    <Link to={`/user/${id}/edit`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                    */}
                                </div>
                            </div>


                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminUserDetailForSubmission;