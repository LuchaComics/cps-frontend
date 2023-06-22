import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faEye, faArrowLeft, faCheckCircle, faPencil, faGauge, faBook, faMagnifyingGlass, faBalanceScale, faUser, faArrowUpRightFromSquare, faComments } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { DateTime } from "luxon";

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getComicSubmissionDetailAPI, postComicSubmissionCreateCommentOperationAPI } from "../../../API/ComicSubmission";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormCheckboxField from "../../Element/FormCheckboxField";
import FormSelectField from "../../Element/FormSelectField";
import FormDateField from "../../Element/FormDateField";
import PageLoadingContent from "../../Element/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminComicSubmissionDetailForCommentList() {
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
    const [submission, setComicSubmission] = useState({});
    const [showCustomerEditOptions, setShowCustomerEditOptions] = useState(false);
    const [content, setContent] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");// Submit to the backend.
        console.log("onSubmitClick, submission:", submission);
        setErrors(null);
        setFetching(true);
        postComicSubmissionCreateCommentOperationAPI(id, content, onComicSubmissionUpdateSuccess, onComicSubmissionUpdateError, onComicSubmissionUpdateDone);
    }

    ////
    //// API.
    ////

    function onComicSubmissionDetailSuccess(response){
        console.log("onComicSubmissionDetailSuccess: Starting...");
        setComicSubmission(response);
    }

    function onComicSubmissionDetailError(apiErr) {
        console.log("onComicSubmissionDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onComicSubmissionDetailDone() {
        console.log("onComicSubmissionDetailDone: Starting...");
        setFetching(false);
    }

    function onComicSubmissionUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onComicSubmissionUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Comment submitted");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onComicSubmissionUpdateSuccess: Delayed for 2 seconds.");
            console.log("onComicSubmissionUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Reset content.
        setContent("");

        // Fetch latest data.
        getComicSubmissionDetailAPI(
            id,
            onComicSubmissionDetailSuccess,
            onComicSubmissionDetailError,
            onComicSubmissionDetailDone
        );
    }

    function onComicSubmissionUpdateError(apiErr) {
        console.log("onComicSubmissionUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onComicSubmissionUpdateError: Delayed for 2 seconds.");
            console.log("onComicSubmissionUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onComicSubmissionUpdateDone() {
        console.log("onComicSubmissionUpdateDone: Starting...");
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
            getComicSubmissionDetailAPI(
                id,
                onComicSubmissionDetailSuccess,
                onComicSubmissionDetailError,
                onComicSubmissionDetailDone
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
                            <Link to={`/submissions/comic/${submission.id}/edit-customer`} class="button is-primary" disabled={true}>Edit Current Customer</Link> */}
                        <br /><br />
                        <Link to={`/admin/submissions/comic/${submission.id}/customer/search`} class="button is-primary">Pick a Different Customer</Link>
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
                            <li class=""><Link to="/admin/submissions/comics" aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Comic Submissions</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Comments)</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-2"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Comic Submission</p>
                        <FormErrorBox errors={errors} />

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                {submission && <div class="container">
                                    <div class="tabs is-medium">
                                      <ul>
                                        <li>
                                            <Link to={`/admin/submissions/comic/${id}`}>Detail</Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/submissions/comic/${id}/cust`}>Customer</Link>
                                        </li>
                                        <li class="is-active">
                                            <Link><b>Comments</b></Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/submissions/comic/${id}/file`}>File</Link>
                                        </li>
                                      </ul>
                                    </div>

                                    <p class="subtitle is-3 pt-4"><FontAwesomeIcon className="fas" icon={faComments} />&nbsp;Comments</p>
                                    <hr />

                                    {submission.comments && submission.comments.length > 0 && <>
                                        {submission.comments.map(function(comment, i){
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

                                    <div class="mt-4 block has-background-white-ter p-3">
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
                                            <Link to={`/admin/submissions/comics`} class="button is-medium is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link to={`/admin/submissions/comics`} class="button is-medium is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button onClick={onSubmitClick} class="button is-medium is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Comment</button>
                                            <button onClick={onSubmitClick} class="button is-medium is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Comment</button>
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

export default AdminComicSubmissionDetailForCommentList;
