import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faBook, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faBookOpen, faNewspaper, faArrowUpRightFromSquare, faRefresh, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getComicSubmissionListAPI, deleteComicSubmissionAPI } from "../../../../API/ComicSubmission";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../../AppState";
import { SUBMISSION_STATES, PAGE_SIZE_OPTIONS, SUBMISSION_STATUS_LIST_OPTIONS } from "../../../../Constants/FieldOptions";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputFieldWithButton from "../../../Reusable/FormInputFieldWithButton";
import FormSelectField from "../../../Reusable/FormSelectField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";


function AdminComicSubmissionList() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser] = useRecoilState(currentUserState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [submissions, setComicSubmissions] = useState("");
    const [selectedComicSubmissionForDeletion, setSelectedComicSubmissionForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);
    const [pageSize, setPageSize] = useState(10);                           // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);             // Pagination
    const [nextCursor, setNextCursor] = useState("");                       // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                 // Pagination
    const [showFilter, setShowFilter] = useState(true);                    // Filtering + Searching
    const [sortField, setSortField] = useState("created");                  // Sorting
    const [temporarySearchText, setTemporarySearchText] = useState("");     // Searching - The search field value as your writes their query.
    const [actualSearchText, setActualSearchText] = useState("");           // Searching - The actual search query value to submit to the API.
    const [status, setStatus] = useState("");                               // Filtering

    ////
    //// API.
    ////

    function onComicSubmissionListSuccess(response){
        // console.log("onComicSubmissionListSuccess: Starting...");
        // console.log("onComicSubmissionListSuccess: response:", response);
        if (response.results !== null) {
            setComicSubmissions(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onComicSubmissionListError(apiErr) {
        // console.log("onComicSubmissionListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onComicSubmissionListDone() {
        // console.log("onComicSubmissionListDone: Starting...");
        setFetching(false);
    }

    function onComicSubmissionDeleteSuccess(response){
        // console.log("onComicSubmissionDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("ComicSubmission deleted");
        setTimeout(() => {
            // console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchList(currentCursor, pageSize, actualSearchText, status);
    }

    function onComicSubmissionDeleteError(apiErr) {
        // console.log("onComicSubmissionDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            // console.log("onComicSubmissionDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onComicSubmissionDeleteDone() {
        // console.log("onComicSubmissionDeleteDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const fetchList = (cur, limit, keywords, s) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set("page_size", limit);     // Pagination
        params.set("sort_field", "created") // Sorting

        if (cur !== "") { // Pagination
            params.set("cursor", cur);
        }

        // Filtering
        if (keywords !== undefined && keywords !== null && keywords !== "") { // Searhcing
            params.set("search", keywords);
        }
        if (s !== undefined && s !== null && s !== "") {
            params.set("status", s);
        }

        getComicSubmissionListAPI(
            params,
            onComicSubmissionListSuccess,
            onComicSubmissionListError,
            onComicSubmissionListDone
        );
    }

    const onNextClicked = (e) => {
        let arr = [...previousCursors];
        arr.push(currentCursor);
        setPreviousCursors(arr);
        setCurrentCursor(nextCursor);
    }

    const onPreviousClicked = (e) => {
        let arr = [...previousCursors];
        const previousCursor = arr.pop();
        setPreviousCursors(arr);
        setCurrentCursor(previousCursor);
    }

    const onSearchButtonClick = (e) => { // Searching
        console.log("Search button clicked...");
        setActualSearchText(temporarySearchText);
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
            fetchList(currentCursor, pageSize, actualSearchText, status);
        }

        return () => { mounted = false; }
    }, [currentCursor, pageSize, actualSearchText, status]);

    ////
    //// Component rendering.
    ////

    console.log("state | previousCursors:", previousCursors);
    console.log("state | currentCursor:", currentCursor);
    console.log("state | nextCursor:", nextCursor);
    console.log();

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                            <li class=""><Link to="/admin/submissions" aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faBook} />&nbsp;Comics</Link></li>
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

                        <div class="columns is-mobile">
                            <div class="column">
                                <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Comic Submissions List</h1>
                            </div>
                            <div class="column has-text-right">
                                <button onClick={()=>fetchList(currentCursor, pageSize, actualSearchText, status)} class="button is-small is-info" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faRefresh} />
                                </button>
                                &nbsp;
                                <button onClick={(e)=>setShowFilter(!showFilter)} class="button is-small is-success" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faFilter} />&nbsp;Filter
                                </button>
                                &nbsp;
                                <Link to={`/admin/submissions/comics/add/search`} class="button is-small is-primary" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add Comic Submission
                                </Link>
                            </div>
                        </div>

                        {showFilter &&
                            <div class="columns has-background-white-bis" style={{borderRadius:"15px", padding:"20px"}}>
                                <div class="column">
                                    <FormInputFieldWithButton
                                        label={"Search"}
                                        name="temporarySearchText"
                                        type="text"
                                        placeholder="Search by name"
                                        value={temporarySearchText}
                                        helpText=""
                                        onChange={(e)=>setTemporarySearchText(e.target.value)}
                                        isRequired={true}
                                        maxWidth="100%"
                                        buttonLabel={<><FontAwesomeIcon className="fas" icon={faSearch} /></>}
                                        onButtonClick={onSearchButtonClick}
                                    />
                                </div>
                                <div class="column">
                                    <FormSelectField
                                        label="Status"
                                        name="status"
                                        placeholder="Pick status"
                                        selectedValue={status}
                                        helpText=""
                                        onChange={(e)=>setStatus(parseInt(e.target.value))}
                                        options={SUBMISSION_STATUS_LIST_OPTIONS}
                                        isRequired={true}
                                    />
                                </div>
                            </div>
                        }

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                {submissions && submissions.results && (submissions.results.length > 0 || previousCursors.length > 0)
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
                                                            {/*<th>Organization</th>*/}
                                                            <th>Customer</th>
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
                                                                {/*<td data-label="Organization">
                                                                    {submission.organizationId !== "000000000000000000000000" && <Link to={`/admin/organization/${submission.organizationId}`} target="_blank" rel="noreferrer" class="is-small">
                                                                        {submission.organizationName}&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                                                    </Link>}
                                                                </td>*/}
                                                                <td data-label="Customer">
                                                                    {submission.user !== undefined && submission.user !== null && submission.user !== ""
                                                                        ?
                                                                        <>
                                                                            {submission.user.id !== "000000000000000000000000" && <Link to={`/admin/user/${submission.user.id}`} target="_blank" rel="noreferrer" class="is-small">
                                                                                {submission.user.name}&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                                                            </Link>}
                                                                        </>
                                                                        :
                                                                        <>-</>
                                                                     }
                                                                </td>
                                                                <td data-label="Created">{submission.createdAt}</td>
                                                                <td class="is-actions-cell">
                                                                    <div class="buttons is-right">
                                                                        <Link to={`/admin/submissions/comic/${submission.id}`} class="button is-small is-primary" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                                                                        </Link>
                                                                        <Link to={`/admin/submissions/comic/${submission.id}/edit`} class="button is-small is-warning" type="button">
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
                                                        {submissions.hasNextPage && <>
                                                            <button class="button" onClick={onNextClicked}>Next</button>
                                                        </>}
                                                    </div>
                                                </div>

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
                                            No submissions. <b><Link to="/admin/submissions/comics/add/search">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first new submission.
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
