import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faDownload, faArrowLeft, faArrowRight, faCheckCircle, faCheck, faGauge, faArrowUpRightFromSquare, faSearch, faFilter  } from '@fortawesome/free-solid-svg-icons'
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


function RetailerSubmissionAddStep1WithSearch() {
    ////
    //// URL Parameters.
    ////

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
    const [hasCustomer, setHasCustomer] = useState(1);
    const [showCancelWarning, setShowCancelWarning] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    ////
    //// Event handling.
    ////

    const onSearchKeywordChange = (e) => {
        setSearchKeyword(e.target.value);
    }

    function onEmailChange(e) {
        setEmail(e.target.value);
    }

    function onPhoneChange(e) {
        setPhone(e.target.value);
    }

    function onFirstNameChange(e) {
        setFirstName(e.target.value);
    }

    function onLastNameChange(e) {
        setLastName(e.target.value);
    }

    const onSearchButtonClicked = (e) => {
        console.log("searchButtonClick: Starting...");
        let aURL = "/submissions/add/results";
        if (searchKeyword != "") {
            aURL += "?search="+searchKeyword;
        }
        if (firstName != "") {
            if (aURL.indexOf('?') > -1) {
                aURL += "&first_name="+firstName;
            } else {
                aURL += "?first_name="+firstName;
            }
        }
        if (lastName != "") {
            if (aURL.indexOf('?') > -1) {
                aURL += "&last_name="+lastName;
            } else {
                aURL += "?last_name="+lastName;
            }
        }
        if (email != "") {
            if (aURL.indexOf('?') > -1) {
                aURL += "&email="+email;
            } else {
                aURL += "?email="+email;
            }
        }
        if (phone != "") {
            if (aURL.indexOf('?') > -1) {
                aURL += "&phone="+phone;
            } else {
                aURL += "?phone="+phone;
            }
        }

        // Validate before proceeding further by checkign to see if we've either
        // searched or filtered and if we did not then error.
        if (aURL.indexOf('?') <= -1) {
            setErrors({"Validation": "Please input data before submitting search."});

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        } else {
            setForceURL(aURL);
        }
    }

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
                                    <button class="button" onClick={(e)=>setShowCancelWarning(false)}>No</button>
                                </footer>
                            </div>
                        </div>

                        <p class="title is-2"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Submission</p>
                        <p class="pb-4 has-text-grey">To begin, please select a customer for this submission. Otherwise you can <Link to="/submissions/add">click here to skip pick a customer&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link> or if you'd like to create a new customer then <Link to="/submissions/add" target="_blank" rel="noreferrer">click here to create a customer&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} /></Link>.</p>
                        <FormErrorBox errors={errors} />

                        <div class="container pb-5">
                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faSearch} />&nbsp;Search</p>

                            <FormInputField
                                label="Search Keywords"
                                name="searchKeyword"
                                placeholder="Text input"
                                value={searchKeyword}
                                errorText={errors && errors.searchKeyword}
                                helpText="SEARCH FIRST NAME, LAST NAME, EMAIL, ETC"
                                onChange={onSearchKeywordChange}
                                isRequired={true}
                                maxWidth="380px"
                            />
                        </div>

                        <div class="container pb-5">
                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faFilter} />&nbsp;Filter</p>

                            <FormInputField
                                label="First Name"
                                name="firstName"
                                placeholder="Text input"
                                value={firstName}
                                errorText={errors && errors.firstName}
                                helpText=""
                                onChange={onFirstNameChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="Last Name"
                                name="lastName"
                                placeholder="Text input"
                                value={lastName}
                                errorText={errors && errors.lastName}
                                helpText=""
                                onChange={onLastNameChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="Email"
                                name="email"
                                placeholder="Text input"
                                value={email}
                                errorText={errors && errors.email}
                                helpText=""
                                onChange={onEmailChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="Phone"
                                name="phone"
                                placeholder="Text input"
                                value={phone}
                                errorText={errors && errors.phone}
                                helpText=""
                                onChange={onPhoneChange}
                                isRequired={true}
                                maxWidth="380px"
                            />
                        </div>

                        <div class="columns pt-5">
                            <div class="column is-half">
                                <button class="button is-medium is-hidden-touch" onClick={(e)=>setShowCancelWarning(true)}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</button>
                                <button class="button is-medium is-fullwidth is-hidden-desktop" onClick={(e)=>setShowCancelWarning(true)}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</button>
                            </div>
                            <div class="column is-half has-text-right">
                                <button class="button is-medium is-primary is-hidden-touch" onClick={onSearchButtonClicked}><FontAwesomeIcon className="fas" icon={faSearch} />&nbsp;Search</button>
                                <button class="button is-medium is-primary is-fullwidth is-hidden-desktop" onClick={onSearchButtonClicked}><FontAwesomeIcon className="fas" icon={faSearch} />&nbsp;Search</button>
                            </div>
                        </div>

                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerSubmissionAddStep1WithSearch;
