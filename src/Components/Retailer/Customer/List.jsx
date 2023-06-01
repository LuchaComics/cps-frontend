import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getCustomerListAPI, deleteCustomerAPI } from "../../../API/customer";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { SUBMISSION_STATES } from "../../../Constants/FieldOptions";


function RetailerCustomerList() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [setErrors] = useState({});
    const [customers, setCustomers] = useState("");
    const [selectedCustomerForDeletion, setSelectedCustomerForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);

    ////
    //// API.
    ////

    function onCustomerListSuccess(response){
        console.log("onCustomerListSuccess: Starting...");
        if (response.results !== null) {
            setCustomers(response);
        }
    }

    function onCustomerListError(apiErr) {
        console.log("onCustomerListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onCustomerListDone() {
        console.log("onCustomerListDone: Starting...");
        setFetching(false);
    }

    function onCustomerDeleteSuccess(response){
        console.log("onCustomerDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Customer deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchList();
    }

    function onCustomerDeleteError(apiErr) {
        console.log("onCustomerDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onCustomerDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onCustomerDeleteDone() {
        console.log("onCustomerDeleteDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const fetchList = () => {
        setFetching(true);
        getCustomerListAPI(
            new Map(),
            onCustomerListSuccess,
            onCustomerListError,
            onCustomerListDone
        );
    }

    const onSelectCustomerForDeletion = (e, customer) => {
        console.log("onSelectCustomerForDeletion", customer);
        setSelectedCustomerForDeletion(customer);
    }

    const onDeselectCustomerForDeletion = (e) => {
        console.log("onDeselectCustomerForDeletion");
        setSelectedCustomerForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteCustomerAPI(
            selectedCustomerForDeletion.id,
            onCustomerDeleteSuccess,
            onCustomerDeleteError,
            onCustomerDeleteDone
        );
        setSelectedCustomerForDeletion("");

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
                            <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class={`modal ${selectedCustomerForDeletion ? 'is-active' : ''}`}>
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Are you sure?</p>
                                    <button class="delete" aria-label="close" onClick={onDeselectCustomerForDeletion}></button>
                                </header>
                                <section class="modal-card-body">
                                    You are about to delete this customer and all the data inside of it. This action is cannot be undone. Are you sure you would like to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                    <button class="button" onClick={onDeselectCustomerForDeletion}>Cancel</button>
                                </footer>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-1"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers</h1>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/customers/add`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/customers/add`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;Add
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

                        {!isFetching && customers && customers.results && customers.results.length > 0
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

                                                {customers && customers.results && customers.results.map(function(customer, i){
                                                    return <tr>
                                                        <td data-label="Title">{customer.name}</td>
                                                        <td data-label="Created">{customer.createdAt}</td>
                                                        <td class="is-actions-cell">
                                                            <div class="buttons is-right">
                                                                <Link to={`/customer/${customer.id}`} class="button is-small is-primary" type="button">
                                                                    <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                                                                </Link>
                                                                <Link to={`/customer/${customer.id}/edit`} class="button is-small is-warning" type="button">
                                                                    <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                                                </Link>
                                                                <button onClick={(e, ses) => onSelectCustomerForDeletion(e, customer)} class="button is-small is-danger" type="button">
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
                                            No customers. <b><Link to="/customers/add">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating a new submission.
                                        </div>
                                    </article>
                                </div>
                            }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerCustomerList;