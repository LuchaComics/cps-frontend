import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faArrowUpRightFromSquare, faRefresh, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getUserListAPI, deleteUserAPI } from "../../../API/user";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";
import FormErrorBox from "../../Reusable/FormErrorBox";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormInputFieldWithButton from "../../Reusable/FormInputFieldWithButton";
import FormSelectField from "../../Reusable/FormSelectField";
import FormDateField from "../../Reusable/FormDateField";
import { USER_ROLES, PAGE_SIZE_OPTIONS, USER_STATUS_LIST_OPTIONS, USER_ROLE_LIST_OPTIONS } from "../../../Constants/FieldOptions";


function AdminUserList() {

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
    const [users, setUsers] = useState("");
    const [selectedUserForDeletion, setSelectedUserForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);
    const [pageSize, setPageSize] = useState(10);                           // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);             // Pagination
    const [nextCursor, setNextCursor] = useState("");                       // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                 // Pagination
    const [showFilter, setShowFilter] = useState(false);                    // Filtering + Searching
    const [sortField, setSortField] = useState("created");                  // Sorting
    const [temporarySearchText, setTemporarySearchText] = useState("");     // Searching - The search field value as your writes their query.
    const [actualSearchText, setActualSearchText] = useState("");           // Searching - The actual search query value to submit to the API.
    const [status, setStatus] = useState("");                               // Filtering
    const [role, setRole] = useState("");                                   // Filtering
    const [createdAtGTE, setCreatedAtGTE] = useState(null);                 // Filtering

    ////
    //// API.
    ////

    function onUserListSuccess(response){
        console.log("onUserListSuccess: Starting...");
        if (response.results !== null) {
            setUsers(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onUserListError(apiErr) {
        console.log("onUserListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onUserListDone() {
        console.log("onUserListDone: Starting...");
        setFetching(false);
    }

    function onUserDeleteSuccess(response){
        console.log("onUserDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("User deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchList(currentCursor, pageSize, actualSearchText, status, role, createdAtGTE);
    }

    function onUserDeleteError(apiErr) {
        console.log("onUserDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onUserDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onUserDeleteDone() {
        console.log("onUserDeleteDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const fetchList = (cur, limit, keywords, s, r, j) => {
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
        if (r !== undefined && r !== null && r !== "") {
            params.set("role", r);
        }
        if (j !== undefined && j !== null && j !== "") {
            const jStr = j.getTime();
            params.set("created_at_gte", jStr);
        }

        getUserListAPI(
            params,
            onUserListSuccess,
            onUserListError,
            onUserListDone
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

    const onSelectUserForDeletion = (e, user) => {
        console.log("onSelectUserForDeletion", user);
        setSelectedUserForDeletion(user);
    }

    const onDeselectUserForDeletion = (e) => {
        console.log("onDeselectUserForDeletion");
        setSelectedUserForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteUserAPI(
            selectedUserForDeletion.id,
            onUserDeleteSuccess,
            onUserDeleteError,
            onUserDeleteDone
        );
        setSelectedUserForDeletion("");

    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            fetchList(currentCursor, pageSize, actualSearchText, status, role, createdAtGTE);
        }

        return () => { mounted = false; }
    }, [currentCursor, pageSize, actualSearchText, status, role, createdAtGTE]);

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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Users</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class={`modal ${selectedUserForDeletion ? 'is-active' : ''}`}>
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Are you sure?</p>
                                    <button class="delete" aria-label="close" onClick={onDeselectUserForDeletion}></button>
                                </header>
                                <section class="modal-card-body">
                                    You are about to <b>archive</b> this user; it will no longer appear on your dashboard This action can be undone but you'll need to contact the system administrator. Are you sure you would like to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                    <button class="button" onClick={onDeselectUserForDeletion}>Cancel</button>
                                </footer>
                            </div>
                        </div>

                        <div class="columns is-mobile">
                            <div class="column">
                                <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Users List</h1>
                            </div>
                            <div class="column has-text-right">
                                <button onClick={()=>fetchList(currentCursor, pageSize, actualSearchText, status, createdAtGTE)} class="button is-small is-info" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faRefresh} />
                                </button>
                                &nbsp;
                                <button onClick={(e)=>setShowFilter(!showFilter)} class="button is-small is-success" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faFilter} />&nbsp;Filter
                                </button>
                                &nbsp;
                                <Link to={`/admin/users/add`} class="button is-small is-primary" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New User
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
                                        options={USER_STATUS_LIST_OPTIONS}
                                        isRequired={true}
                                    />
                                </div>
                                <div class="column">
                                    <FormSelectField
                                        label="Role"
                                        name="role"
                                        placeholder="Pick role"
                                        selectedValue={role}
                                        helpText=""
                                        onChange={(e)=>setRole(parseInt(e.target.value))}
                                        options={USER_ROLE_LIST_OPTIONS}
                                        isRequired={true}
                                    />
                                </div>
                                <div class="column">
                                    <FormDateField
                                        label="Joined After"
                                        name="createdAtGTE"
                                        placeholder="Text input"
                                        value={createdAtGTE}
                                        helpText=""
                                        onChange={(date)=>setCreatedAtGTE(date)}
                                        isRequired={true}
                                        maxWidth="120px"
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
                                {users && users.results && (users.results.length > 0 || previousCursors.length > 0)
                                    ?
                                    <div class="container">
                                        <div class="b-table">
                                            <div class="table-wrapper has-mobile-cards">
                                                <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Organization</th>
                                                            <th>Role</th>
                                                            <th>Joined</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {users && users.results && users.results.map(function(user, i){
                                                            return <tr>
                                                                <td data-label="Name">{user.name}</td>

                                                                <td data-label="Organization">
                                                                    {user.organizationId !== "000000000000000000000000" && <Link to={`/admin/organization/${user.organizationId}`} target="_blank" rel="noreferrer" class="is-small">
                                                                        {user.organizationName}&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                                                    </Link>}
                                                                </td>
                                                                <td data-label="Role">{USER_ROLES[user.role]}</td>
                                                                <td data-label="Joined">{user.createdAt}</td>
                                                                <td class="is-actions-cell">
                                                                    <div class="buttons is-right">
                                                                        <Link to={`/admin/submissions/pick-type-for-add?user_id=${user.id}&user_name=${user.name}`} class="button is-small is-success" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                                                        </Link>
                                                                        <Link to={`/admin/user/${user.id}`} class="button is-small is-primary" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                                                                        </Link>
                                                                        <Link to={`/admin/user/${user.id}/edit`} class="button is-small is-warning" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                                                        </Link>
                                                                        <button onClick={(e, ses) => onSelectUserForDeletion(e, user)} class="button is-small is-danger" type="button">
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
                                                        {users.hasNextPage && <>
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
                                                <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Users
                                            </p>
                                            <p class="subtitle">
                                                No users. <b><Link to="/admin/users/add">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first user.
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

export default AdminUserList;
