import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faDownload, faArrowLeft, faTable, faCheckCircle, faCheck, faGauge, faUsers } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getSubmissionDetailAPI } from "../../../API/submission";
import { getCustomerListAPI } from "../../../API/customer";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import FormInputFieldWithButton from "../../Element/FormInputFieldWithButton";
import { FINDING_OPTIONS } from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function RetailerSubmissionAddStep1WithResult() {
    ////
    //// URL Parameters.
    ////

    const [searchParams] = useSearchParams(); // Special thanks via https://stackoverflow.com/a/65451140

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
    const [customers, setCustomers] = useState({});
    const [showCancelWarning, setShowCancelWarning] = useState(false);

    ////
    //// Event handling.
    ////

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

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            console.log("useEffect: Starting.");

            window.scrollTo(0, 0);  // Start the page at the top of the page.
            setFetching(true); // Let user knows that we are making an API endpoint.

            let queryParams=new Map(); // Create the URL map we'll be using when calling the backend.

            // CASE 1: Search
            const searchKeyword = searchParams.get("search");
            if (searchKeyword !== undefined && searchKeyword !== null && searchKeyword !== "") {
                queryParams.set("search", searchKeyword);
            }

            // CASE 2: First name.
            const firstName = searchParams.get("first_name");
            if (firstName !== undefined && firstName !== null && firstName !== "") {
                queryParams.set("first_name", firstName);
            }

            // CASE 3: Last name.
            const lastName = searchParams.get("last_name");
            if (lastName !== undefined && lastName !== null && lastName !== "") {
                queryParams.set("last_name", lastName);
            }

            // CASE 4: Phone.
            const phone = searchParams.get("phone");
            if (phone !== undefined && phone !== null && phone !== "") {
                queryParams.set("phone", phone);
            }

            // CASE 5: Email.
            const email = searchParams.get("email");
            if (email !== undefined && email !== null && email !== "") {
                queryParams.set("email", email);
            }

            // Submit the list request to our backend.
            getCustomerListAPI(
                queryParams,
                onCustomerListSuccess,
                onCustomerListError,
                onCustomerListDone
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
                            <li class=""><Link to="/submissions" aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add</Link></li>
                        </ul>
                    </nav>

                    <nav class="box">
                        <div class={`modal ${showCancelWarning ? 'is-active' : ''}`}>
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Are you sure?</p>
                                    <button class="delete" aria-label="close" onClick={(e)=>setShowCancelWarning(false)}></button>
                                </header>
                                <section class="modal-card-body">
                                    Your submission will be cancelled and your work will be lost. This cannot be undone. Do you want to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    <Link class="button is-success" to={`/dashboard`}>Yes</Link>
                                    <button class="button" onClick={(e)=>null}>No</button>
                                </footer>
                            </div>
                        </div>

                        <p class="title is-2"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Submission</p>
                        <p class="pb-4 has-text-grey">Please select the customer from the following results.</p>
                        <FormErrorBox errors={errors} />

                        <div class="container pb-5">
                            <p class="subtitle is-2"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Results</p>

                            {customers && customers.results && customers.results.length > 0
                                ?
                                <div class="columns">
                                    {customers.results.map(function(customer, i){
                                        return <div class="column is-one-quarter" key={customer.id}>
                                        <article class="message is-primary">
                                            <div class="message-body">
                                                <p><b>{customer.name}</b></p>
                                                <p>{customer.country}&nbsp;{customer.region}&nbsp;{customer.city}</p>
                                                <p>{customer.addressLine1}, {customer.postalCode}</p>
                                                <p><a href={`mailto:${customer.email}`}>{customer.email}</a></p>
                                                <p><a href={`tel:${customer.phone}`}>{customer.phone}</a></p>
                                                <br />
                                                <Link class="button is-medium is-primary" to={`/submissions/add?customer_id=${customer.id}`}>
                                                    <FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Pick
                                                </Link>
                                            </div>
                                        </article>
                                        </div>;
                                    })}
                                </div>
                                :
                                <section class="hero is-medium has-background-white-ter">
                                  <div class="hero-body">
                                    <p class="title">
                                        <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Customers
                                    </p>
                                    <p class="subtitle">
                                        No results were found in the search.
                                    </p>
                                  </div>
                                </section>
                            }
                        </div>

                        <div class="columns pt-5">
                            <div class="column is-half">
                                <Link class="button is-medium is-hidden-touch" to="/submissions/add/search"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                <Link class="button is-medium is-fullwidth is-hidden-desktop" to="/submissions/add/search"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                            </div>
                            <div class="column is-half has-text-right">
                                {/*
                                <button class="button is-primary is-hidden-touch" onClick={null}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Next</button>
                                <button class="button is-primary is-fullwidth is-hidden-desktop" onClick={null}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Next</button>
                                */}
                            </div>
                        </div>

                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerSubmissionAddStep1WithResult;
