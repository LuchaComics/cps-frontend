import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faArrowRight, faTrashCan, faArrowUpRightFromSquare, faFile, faDownload } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { ATTACHMENT_STATES, PAGE_SIZE_OPTIONS } from "../../../Constants/FieldOptions";

import { getCustomerDetailAPI } from "../../../API/customer";
import { getAttachmentListAPI, deleteAttachmentAPI } from "../../../API/Attachment";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormInputField from "../../Reusable/FormInputField";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormRadioField from "../../Reusable/FormRadioField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function RetailerCustomerDetailForAttachment() {
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
    const [attachments, setAttachments] = useState("");
    const [selectedAttachmentForDeletion, setSelectedAttachmentForDeletion] = useState("");
    const [pageSize, setPageSize] = useState(10);               // Pagination
    const [previousCursors, setPreviousCursors] = useState([]); // Pagination
    const [nextCursor, setNextCursor] = useState("");           // Pagination
    const [currentCursor, setCurrentCursor] = useState("");     // Pagination

    ////
    //// Event handling.
    ////

    const fetchAttachmentList = (cur, customerID, limit) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set('ownership_id', id);
        params.set('ownership_role', 1); // 1=Customer or User.
        params.set("page_size", limit);
        if (cur !== "") {
            params.set("cursor", cur);
        }

        getAttachmentListAPI(
            params,
            onAttachmentListSuccess,
            onAttachmentListError,
            onAttachmentListDone
        );
    }

    const onNextClicked = (e) => {
        console.log("onNextClicked");
        let arr = [...previousCursors];
        arr.push(currentCursor);
        setPreviousCursors(arr);
        setCurrentCursor(nextCursor);
    }

    const onPreviousClicked = (e) => {
        console.log("onPreviousClicked");
        let arr = [...previousCursors];
        const previousCursor = arr.pop();
        setPreviousCursors(arr);
        setCurrentCursor(previousCursor);
    }

    const onSelectAttachmentForDeletion = (e, attachment) => {
        console.log("onSelectAttachmentForDeletion", attachment);
        setSelectedAttachmentForDeletion(attachment);
    }

    const onDeselectAttachmentForDeletion = (e) => {
        console.log("onDeselectAttachmentForDeletion");
        setSelectedAttachmentForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteAttachmentAPI(
            selectedAttachmentForDeletion.id,
            onAttachmentDeleteSuccess,
            onAttachmentDeleteError,
            onAttachmentDeleteDone
        );
        setSelectedAttachmentForDeletion("");
    }

    ////
    //// API.
    ////

    // Customer details.

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

    // Attachment list.

    function onAttachmentListSuccess(response){
        console.log("onAttachmentListSuccess: Starting...");
        if (response.results !== null) {
            setAttachments(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onAttachmentListError(apiErr) {
        console.log("onAttachmentListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAttachmentListDone() {
        console.log("onAttachmentListDone: Starting...");
        setFetching(false);
    }

    // Attachment delete.

    function onAttachmentDeleteSuccess(response){
        console.log("onAttachmentDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Attachment deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchAttachmentList(currentCursor, id, pageSize);
    }

    function onAttachmentDeleteError(apiErr) {
        console.log("onAttachmentDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onAttachmentDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAttachmentDeleteDone() {
        console.log("onAttachmentDeleteDone: Starting...");
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
            fetchAttachmentList(currentCursor, id, pageSize);
        }

        return () => { mounted = false; }
    }, [currentCursor, id, pageSize]);
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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Attachments)</Link></li>
                        </ul>
                    </nav>
                    <div class={`modal ${selectedAttachmentForDeletion ? 'is-active' : ''}`}>
                        <div class="modal-background"></div>
                        <div class="modal-card">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Are you sure?</p>
                                <button class="delete" aria-label="close" onClick={onDeselectAttachmentForDeletion}></button>
                            </header>
                            <section class="modal-card-body">
                                You are about to <b>archive</b> this attachment; it will no longer appear on your dashboard This action can be undone but you'll need to contact the system administrator. Are you sure you would like to continue?
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                <button class="button" onClick={onDeselectAttachmentForDeletion}>Cancel</button>
                            </footer>
                        </div>
                    </div>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Customer</p>
                            </div>
                            {customer && <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/customer/${id}/attachments/add`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New Attachment
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/customer/${id}/attachments/add`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New Attachment
                                </Link>
                            </div>}
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
                                        <li>
                                            <Link to={`/customer/${customer.id}/comics`}>Comics</Link>
                                        </li>
                                        <li>
                                            <Link to={`/customer/${customer.id}/comments`}>Comments</Link>
                                        </li>
                                        <li class="is-active">
                                            <Link to={`/customer/${customer.id}/attachments`}><b>Attachments</b></Link>
                                        </li>
                                      </ul>
                                    </div>

                                    {!isFetching && attachments && attachments.results && (attachments.results.length > 0 || previousCursors.length > 0)
                                        ?
                                        <div class="container">

                                            <p class="subtitle is-6 pt-4"><FontAwesomeIcon className="fas" icon={faFile} />&nbsp;Attachments</p>
                                            <hr />

                                            <div class="b-table">
                                                <div class="table-wrapper has-mobile-cards">
                                                    <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>State</th>
                                                                <th>Created</th>
                                                                <th>File</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {attachments && attachments.results && attachments.results.map(function(attachment, i){
                                                                return <tr>
                                                                    <td data-label="Title">{attachment.name}</td>
                                                                    <td data-label="State">{ATTACHMENT_STATES[attachment.status]}</td>
                                                                    <td data-label="Created">{attachment.createdAt}</td>
                                                                    <td data-label="File">
                                                                        <a href={attachment.objectUrl} target="_blank" rel="noreferrer" class="">
                                                                            <FontAwesomeIcon className="mdi" icon={faDownload} />&nbsp;Download File
                                                                        </a>
                                                                    </td>
                                                                    <td class="is-actions-cell">
                                                                        <div class="buttons is-right">
                                                                            <Link to={`/customer/${customer.id}/attachment/${attachment.id}`} class="button is-small is-primary" type="button">
                                                                                View
                                                                            </Link>
                                                                            <Link to={`/customer/${customer.id}/attachment/${attachment.id}/edit`} class="button is-small is-warning" type="button">
                                                                                Edit
                                                                            </Link>
                                                                            <button onClick={(e, ses) => onSelectAttachmentForDeletion(e, attachment)} class="button is-small is-danger" type="button">
                                                                                <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>;
                                                            })}
                                                        </tbody>
                                                    </table>

                                                    <div class="columns">
                                                        <div class="column is-half">
                                                            <span class="select">
                                                                <select class={`input has-text-grey-light`}
                                                                         name="pageSize"
                                                                     onChange={(e)=>setPageSize(parseInt(e.target.value))}>
                                                                    {PAGE_SIZE_OPTIONS.map(function(option, i){
                                                                        return <option selected={pageSize === option.value} value={option.value}>{option.label}</option>;
                                                                    })}
                                                                </select>
                                                            </span>

                                                        </div>
                                                        <div class="column is-half has-text-right">
                                                            {previousCursors.length > 0 &&
                                                                <button class="button" onClick={onPreviousClicked}>Previous</button>
                                                            }
                                                            {attachments.hasNextPage && <>
                                                                <button class="button" onClick={onNextClicked}>Next</button>
                                                            </>}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div class="container">
                                            <article class="message is-dark">
                                                <div class="message-body">
                                                    No attachments. <b><Link to={`/customer/${id}/attachments/add`}>Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating a new attachment.
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
                                            <Link to={`/customer/${id}/attachments/add`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New Attachment</Link>
                                            <Link to={`/customer/${id}/attachments/add`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New Attachment</Link>
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

export default RetailerCustomerDetailForAttachment;
