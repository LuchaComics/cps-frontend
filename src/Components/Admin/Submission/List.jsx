import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getSubmissionListAPI, deleteSubmissionAPI } from "../../../API/submission";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { SUBMISSION_STATES } from "../../../Constants/FieldOptions";


function AdminSubmissionList() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [setErrors] = useState({});
    const [submissions, setSubmissions] = useState("");
    const [selectedSubmissionForDeletion, setSelectedSubmissionForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);

    ////
    //// API.
    ////

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
        fetchList();
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
    //// Event handling.
    ////

    const fetchList = () => {
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
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            fetchList();
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
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

                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions List</h1>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/admin/submissions/add/search`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add Submission
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/admin/submissions/add/search`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add Submission
                                </Link>
                            </div>
                        </div>

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

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
                                                                <Link to={`/admin/submission/${submission.id}`} class="button is-small is-primary" type="button">
                                                                    <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                                                                </Link>
                                                                <Link to={`/admin/submission/${submission.id}/edit`} class="button is-small is-warning" type="button">
                                                                    <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
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
                            <section class="hero is-medium has-background-white-ter">
                              <div class="hero-body">
                                <p class="title">
                                    <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Submissions
                                </p>
                                <p class="subtitle">
                                    No submissions. <b><Link to="/admin/submissions/add/search">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first new submission.
                                </p>
                              </div>
                            </section>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminSubmissionList;
