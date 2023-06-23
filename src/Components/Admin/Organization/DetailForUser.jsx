import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faArrowRight, faTrashCan, faArrowUpRightFromSquare, faBuilding } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { USER_ROLES, PAGE_SIZE_OPTIONS } from "../../../Constants/FieldOptions";

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getOrganizationDetailAPI } from "../../../API/organization";
import { getUserListAPI, deleteUserAPI } from "../../../API/user";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import FormCheckboxField from "../../Element/FormCheckboxField";
import PageLoadingContent from "../../Element/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminOrganizationDetailForUserList() {
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
    const [tabIndex, setTabIndex] = useState(1);
    const [users, setUsers] = useState("");
    const [selectedUserForDeletion, setSelectedUserForDeletion] = useState("");
    const [pageSize, setPageSize] = useState(10);

    ////
    //// Event handling.
    ////

    const fetchUserList = (organizationID, limit) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set('organization_id', id);
        params.set("page_size", limit);

        getUserListAPI(
            params,
            onUserListSuccess,
            onUserListError,
            onUserListDone
        );
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
    //// API.
    ////

    // Organization details.

    function onOrganizationDetailSuccess(response){
        console.log("onOrganizationDetailSuccess: Starting...");
        setOrganization(response);
        fetchUserList(response.id, pageSize);
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

    // User list.

    function onUserListSuccess(response){
        console.log("onUserListSuccess: Starting...");
        if (response.results !== null) {
            setUsers(response);
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

    // User delete.

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
        fetchUserList(id, pageSize);
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

            fetchUserList(id, pageSize);
        }

        return () => { mounted = false; }
    }, [id, pageSize]);

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
                            <li class=""><Link to="/admin/organizations" aria-current="page"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organizations</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
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
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <p class="title is-2"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organization</p>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/admin/users/add?organization_id=${id}&organization_name=${organization.name}`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add User
                                </Link>
                                {/*  Desktop Specific */}
                                <Link to={`/admin/users/add?organization_id=${id}&organization_name=${organization.name}`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add User
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
                                {organization && <div class="container">
                                    <div class="tabs is-medium">
                                      <ul>
                                        <li>
                                            <Link to={`/admin/organization/${organization.id}`}>Detail</Link>
                                        </li>
                                        <li class="is-active">
                                            <Link><b>Users</b></Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/organization/${organization.id}/comics`}>Comics</Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/organization/${organization.id}/comments`}>Comments</Link>
                                        </li>
                                      </ul>
                                    </div>

                                    <p class="subtitle is-3 pt-4"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Users</p>
                                    <hr />

                                    {!isFetching && users && users.results && users.results.length > 0
                                        ?
                                        <div class="container">
                                            <div class="b-table">
                                                <div class="table-wrapper has-mobile-cards">
                                                    <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Email</th>
                                                                <th>Role</th>
                                                                <th>Created</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {users && users.results && users.results.map(function(user, i){
                                                                return <tr>
                                                                <td data-label="Name">{user.name}</td>
                                                                <td data-label="Email"><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                                                <td data-label="Role">{USER_ROLES[user.role]}</td>
                                                                <td data-label="Created">{user.createdAt}</td>
                                                                    <td class="is-actions-cell">
                                                                        <div class="buttons is-right">
                                                                            <Link to={`/admin/submissions/pick-type-for-add?user_id=${user.id}&user_name=${user.name}`} target="_blank" rel="noreferrer" class="button is-small is-success" type="button">
                                                                                <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                                                            </Link>
                                                                            <Link to={`/admin/user/${user.id}`} target="_blank" rel="noreferrer" class="button is-small is-primary" type="button">
                                                                                View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                                                            </Link>
                                                                            <Link to={`/admin/user/${user.id}/edit`} target="_blank" rel="noreferrer" class="button is-small is-warning" type="button">
                                                                                Edit&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
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
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div class="container">
                                            <article class="message is-dark">
                                                <div class="message-body">
                                                    No users. <b><Link to={`/admin/users/add?organization_id=${id}&organization_name=${organization.name}`}>Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating a new user.
                                                </div>
                                            </article>
                                        </div>
                                    }

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-hidden-touch" to={`/admin/organizations`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/organizations`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={`/admin/users/add?organization_id=${id}&organization_name=${organization.name}`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add User</Link>
                                            <Link to={`/admin/users/add?organization_id=${id}&organization_name=${organization.name}`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add User</Link>
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

export default AdminOrganizationDetailForUserList;
