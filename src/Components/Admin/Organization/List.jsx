import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getOrganizationListAPI, deleteOrganizationAPI } from "../../../API/organization";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { SUBMISSION_STATES } from "../../../Constants/FieldOptions";


function AdminOrganizationList() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [setErrors] = useState({});
    const [organizations, setOrganizations] = useState("");
    const [selectedOrganizationForDeletion, setSelectedOrganizationForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);

    ////
    //// API.
    ////

    function onOrganizationListSuccess(response){
        console.log("onOrganizationListSuccess: Starting...");
        if (response.results !== null) {
            setOrganizations(response);
        }
    }

    function onOrganizationListError(apiErr) {
        console.log("onOrganizationListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrganizationListDone() {
        console.log("onOrganizationListDone: Starting...");
        setFetching(false);
    }

    function onOrganizationDeleteSuccess(response){
        console.log("onOrganizationDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Organization deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchList();
    }

    function onOrganizationDeleteError(apiErr) {
        console.log("onOrganizationDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onOrganizationDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrganizationDeleteDone() {
        console.log("onOrganizationDeleteDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const fetchList = () => {
        setFetching(true);
        let params = new Map();
        getOrganizationListAPI(
            params,
            onOrganizationListSuccess,
            onOrganizationListError,
            onOrganizationListDone
        );
    }

    const onSelectOrganizationForDeletion = (e, organization) => {
        console.log("onSelectOrganizationForDeletion", organization);
        setSelectedOrganizationForDeletion(organization);
    }

    const onDeselectOrganizationForDeletion = (e) => {
        console.log("onDeselectOrganizationForDeletion");
        setSelectedOrganizationForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteOrganizationAPI(
            selectedOrganizationForDeletion.id,
            onOrganizationDeleteSuccess,
            onOrganizationDeleteError,
            onOrganizationDeleteDone
        );
        setSelectedOrganizationForDeletion("");

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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organizations</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class={`modal ${selectedOrganizationForDeletion ? 'is-active' : ''}`}>
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Are you sure?</p>
                                    <button class="delete" aria-label="close" onClick={onDeselectOrganizationForDeletion}></button>
                                </header>
                                <section class="modal-card-body">
                                    You are about to <b>archive</b> this organization; it will no longer appear on your dashboard This action can be undone but you'll need to contact the system administrator. Are you sure you would like to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                    <button class="button" onClick={onDeselectOrganizationForDeletion}>Cancel</button>
                                </footer>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organizations List</h1>
                            </div>
                            {/* HIDDEN */}
                            <div class="is-hidden column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/admin/organizations/add`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add Organization
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/admin/organizations/add`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add Organization
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

                        {!isFetching && organizations && organizations.results && organizations.results.length > 0
                            ?
                            <div class="container">
                                <div class="b-table">
                                    <div class="table-wrapper has-mobile-cards">
                                        <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Created</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {organizations && organizations.results && organizations.results.map(function(organization, i){
                                                    return <tr>
                                                        <td data-label="Name">{organization.name}</td>
                                                        <td data-label="Created">{organization.createdAt}</td>
                                                        <td class="is-actions-cell">
                                                            <div class="buttons is-right">
                                                                <Link to={`/admin/organization/${organization.id}`} class="button is-small is-primary" type="button">
                                                                    <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                                                                </Link>
                                                                <Link to={`/admin/organization/${organization.id}/edit`} class="button is-small is-warning" type="button">
                                                                    <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                                                </Link>
                                                                <button onClick={(e, ses) => onSelectOrganizationForDeletion(e, organization)} class="button is-small is-danger" type="button">
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
                                        <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Organizations
                                    </p>
                                    <p class="subtitle">
                                        No organizations. <b><Link to="/admin/organizations/add">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first organization.
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

export default AdminOrganizationList;
