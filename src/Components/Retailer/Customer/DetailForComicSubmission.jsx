import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faArrowRight, faTrashCan, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { SUBMISSION_STATES } from "../../../Constants/FieldOptions";

import { getCustomerDetailAPI } from "../../../API/customer";
import { getComicSubmissionListAPI, deleteComicSubmissionAPI } from "../../../API/ComicSubmission";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import FormCheckboxField from "../../Element/FormCheckboxField";
import PageLoadingContent from "../../Element/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function RetailerCustomerDetailForComicSubmission() {
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
    const [tabIndex, setTabIndex] = useState(1);
    const [submissions, setComicSubmissions] = useState("");
    const [selectedComicSubmissionForDeletion, setSelectedComicSubmissionForDeletion] = useState("");

    ////
    //// Event handling.
    ////

    const fetchListByCustomerID = (customerID) => {
        setFetching(true);
        let params = new Map();
        params.set("user_id", id);
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

        deleteComicSubmissionAPI(
            selectedComicSubmissionForDeletion.id,
            onComicSubmissionDeleteSuccess,
            onComicSubmissionDeleteError,
            onComicSubmissionDeleteDone
        );
        setSelectedComicSubmissionForDeletion("");

    }

    ////
    //// API.
    ////

    // Customer details.

    function onCustomerDetailSuccess(response){
        console.log("onCustomerDetailSuccess: Starting...");
        setCustomer(response);
        fetchListByCustomerID(response.id);
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

    // ComicSubmission list.

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

    // ComicSubmission delete.

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
        fetchListByCustomerID(id);
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
                            <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/customers" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
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
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <p class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Customer</p>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/comic-submissions/pick-type-for-add?customer_id=${id}&customer_name=${customer.name}`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/comic-submissions/pick-type-for-add?customer_id=${id}&customer_name=${customer.name}`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                            </div>
                        </div>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                {customer && <div class="container">
                                    <div class="tabs is-medium">
                                      <ul>
                                        <li>
                                            <Link to={`/customer/${customer.id}`}>Detail</Link>
                                        </li>
                                        <li class="is-active">
                                            <Link><b>Comic Submissions</b></Link>
                                        </li>
                                        <li>
                                            <Link to={`/customer/${customer.id}/comments`}>Comments</Link>
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
                                                                    <td data-label="State">{SUBMISSION_STATES[submission.status]}</td>
                                                                    <td data-label="Created">{submission.createdAt}</td>
                                                                    <td class="is-actions-cell">
                                                                        <div class="buttons is-right">
                                                                            <Link to={`/comic-submission/${submission.id}`} target="_blank" rel="noreferrer" class="button is-small is-primary" type="button">
                                                                                View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                                                            </Link>
                                                                            <Link to={`/comic-submission/${submission.id}/edit`} target="_blank" rel="noreferrer" class="button is-small is-warning" type="button">
                                                                                Edit&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
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
                                        <div class="container">
                                            <article class="message is-dark">
                                                <div class="message-body">
                                                    No submissions. <b><Link to={`/comic-submissions/pick-type-for-add?customer_id=${id}&customer_name=${customer.name}`}>Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating a new submission.
                                                </div>
                                            </article>
                                        </div>
                                    }

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-hidden-touch" to={`/customers`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/customers`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={`/comic-submissions/pick-type-for-add?customer_id=${id}&customer_name=${customer.name}`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;CPS</Link>
                                            <Link to={`/comic-submissions/pick-type-for-add?customer_id=${id}&customer_name=${customer.name}`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;CPS</Link>
                                        </div>
                                    </div>

                                </div>}
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerCustomerDetailForComicSubmission;
