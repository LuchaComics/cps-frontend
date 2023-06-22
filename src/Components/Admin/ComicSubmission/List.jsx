import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faBookOpen, faNewspaper, } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getComicSubmissionListAPI, deleteComicSubmissionAPI } from "../../../API/ComicSubmission";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { SUBMISSION_STATES } from "../../../Constants/FieldOptions";
import FormErrorBox from "../../Element/FormErrorBox";
import PageLoadingContent from "../../Element/PageLoadingContent";


function AdminComicSubmissionList() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [submissions, setComicSubmissions] = useState("");
    const [selectedComicSubmissionForDeletion, setSelectedComicSubmissionForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);

    ////
    //// API.
    ////

    function onComicSubmissionListSuccess(response){
        console.log("onComicSubmissionListSuccess: Starting...");
        if (response.results !== null) {
            setComicSubmissions(response);
        }
    }

    function onComicSubmissionListError(apiErr) {
        console.log("onComicSubmissionListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onComicSubmissionListDone() {
        console.log("onComicSubmissionListDone: Starting...");
        setFetching(false);
    }

    function onComicSubmissionDeleteSuccess(response){
        console.log("onComicSubmissionDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("ComicSubmission deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchList();
    }

    function onComicSubmissionDeleteError(apiErr) {
        console.log("onComicSubmissionDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onComicSubmissionDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onComicSubmissionDeleteDone() {
        console.log("onComicSubmissionDeleteDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const fetchList = () => {
        setFetching(true);
        let params = new Map();
        getComicSubmissionListAPI(
            params,
            onComicSubmissionListSuccess,
            onComicSubmissionListError,
            onComicSubmissionListDone
        );
    }

    const onSelectComicSubmissionForDeletion = (e, submission) => {
        console.log("onSelectComicSubmissionForDeletion", submission);
        setSelectedComicSubmissionForDeletion(submission);
    }

    const onDeselectComicSubmissionForDeletion = (e) => {
        console.log("onDeselectComicSubmissionForDeletion");
        setSelectedComicSubmissionForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.
        setFetching(true);
        setErrors({});
        deleteComicSubmissionAPI(
            selectedComicSubmissionForDeletion.id,
            onComicSubmissionDeleteSuccess,
            onComicSubmissionDeleteError,
            onComicSubmissionDeleteDone
        );
        setSelectedComicSubmissionForDeletion("");

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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Comic Submissions</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class={`modal ${selectedComicSubmissionForDeletion ? 'is-active' : ''}`}>
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Are you sure?</p>
                                    <button class="delete" aria-label="close" onClick={onDeselectComicSubmissionForDeletion}></button>
                                </header>
                                <section class="modal-card-body">
                                    You are about to <b>archive</b> this submission; it will no longer appear on your dashboard This action can be undone but you'll need to contact the system administrator. Are you sure you would like to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                    <button class="button" onClick={onDeselectComicSubmissionForDeletion}>Cancel</button>
                                </footer>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Comic Submissions List</h1>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/admin/comic-submissions/add/search`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add Comic Submission
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/admin/comic-submissions/add/search`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add Comic Submission
                                </Link>
                            </div>
                        </div>
                        <FormErrorBox errors={errors} />

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                {submissions && submissions.results && submissions.results.length > 0
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
                                                                <td data-label="State">{SUBMISSION_STATES[submission.status]}</td>
                                                                <td data-label="Created">{submission.createdAt}</td>
                                                                <td class="is-actions-cell">
                                                                    <div class="buttons is-right">
                                                                        <Link to={`/admin/comic-submission/${submission.id}`} class="button is-small is-primary" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                                                                        </Link>
                                                                        <Link to={`/admin/comic-submission/${submission.id}/edit`} class="button is-small is-warning" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                                                        </Link>
                                                                        <button onClick={(e, ses) => onSelectComicSubmissionForDeletion(e, submission)} class="button is-small is-danger" type="button">
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
                                            <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Comic Submissions
                                        </p>
                                        <p class="subtitle">
                                            No submissions. <b><Link to="/admin/comic-submissions/add/search">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first new submission.
                                        </p>
                                      </div>
                                    </section>
                                }
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminComicSubmissionList;
