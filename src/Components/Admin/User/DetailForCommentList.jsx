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
import { getUserDetailAPI, postUserCreateCommentOperationAPI } from "../../../API/user";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormCheckboxField from "../../Element/FormCheckboxField";
import FormSelectField from "../../Element/FormSelectField";
import FormDateField from "../../Element/FormDateField";
import PageLoadingContent from "../../Element/PageLoadingContent";
import {
    FINDING_OPTIONS,
    OVERALL_NUMBER_GRADE_OPTIONS,
    PUBLISHER_NAME_OPTIONS,
    CPS_PERCENTAGE_GRADE_OPTIONS,
    HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS
} from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminUserDetailForCommentList() {
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
    const [showUserEditOptions, setShowUserEditOptions] = useState(false);
    const [content, setContent] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");// Submit to the backend.
        console.log("onSubmitClick, user:", user);
        setErrors(null);
        postUserCreateCommentOperationAPI(id, content, onUserUpdateSuccess, onUserUpdateError, onUserUpdateDone);
    }

    ////
    //// API.
    ////

    function onUserDetailSuccess(response){
        console.log("onUserDetailSuccess: Starting...");
        setUser(response);
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

    function onUserUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onUserUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Comment created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onUserUpdateSuccess: Delayed for 2 seconds.");
            console.log("onUserUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Reset content.
        setContent("");

        // Fetch latest data.
        getUserDetailAPI(
            id,
            onUserDetailSuccess,
            onUserDetailError,
            onUserDetailDone
        );
    }

    function onUserUpdateError(apiErr) {
        console.log("onUserUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onUserUpdateError: Delayed for 2 seconds.");
            console.log("onUserUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onUserUpdateDone() {
        console.log("onUserUpdateDone: Starting...");
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
    }, [id]);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div class={`modal ${showUserEditOptions ? 'is-active' : ''}`}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">User Edit</p>
                        <button class="delete" aria-label="close" onClick={(e)=>setShowUserEditOptions(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        To edit the user, please select one of the following option:

                        {/*
                            <br /><br />
                            <Link to={`/user/${user.id}/edit-user`} class="button is-primary" disabled={true}>Edit Current User</Link> */}
                        <br /><br />
                        <Link to={`/admin/user/${user.id}/user/search`} class="button is-primary">Pick a Different User</Link>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" onClick={(e)=>setShowUserEditOptions(false)}>Close</button>
                    </footer>
                </div>
            </div>

            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                            <li class=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Users</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <p class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;User</p>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/admin/comic-submissions/pick-type-for-add?user_id=${id}&user_name=${user.name}`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/admin/comic-submissions/pick-type-for-add?user_id=${id}&user_name=${user.name}`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                            </div>
                        </div>
                        <FormErrorBox errors={errors} />

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                {user && <div class="container">
                                    <div class="tabs is-medium">
                                      <ul>
                                        <li>
                                            <Link to={`/admin/user/${id}`}>Detail</Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/user/${id}/comics`}>Comics</Link>
                                        </li>
                                        <li class="is-active">
                                            <Link><b>Comments</b></Link>
                                        </li>
                                      </ul>
                                    </div>

                                    <p class="subtitle is-3 pt-4"><FontAwesomeIcon className="fas" icon={faComments} />&nbsp;Comments</p>
                                    <hr />

                                    {user.comments && user.comments.length > 0 && <>
                                        {user.comments.map(function(comment, i){
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
                                            <Link to={`/admin/users`} class="button is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link to={`/admin/users`} class="button is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button onClick={onSubmitClick} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Comment</button>
                                            <button onClick={onSubmitClick} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Comment</button>
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

export default AdminUserDetailForCommentList;
