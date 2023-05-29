import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faDownload, faArrowLeft, faArrowRight, faCheckCircle, faCheck, faGauge } from '@fortawesome/free-solid-svg-icons'
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


function RetailerSubmissionAddStep1() {
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

    ////
    //// Event handling.
    ////

    const onHasCustomerChange = (e) => {
        setHasCustomer(parseInt(e.target.value));
    }

    const onSearchKeywordChange = (e) => {
        setSearchKeyword(e.target.value);
    }

    const searchButtonClick = (e) => {
        console.log("searchButtonClick: Starting.");
        setFetching(true);
        let queryParams=new Map()
        queryParams.set("q", searchKeyword);
        getCustomerListAPI(
            queryParams,
            onCustomerListSuccess,
            onCustomerListError,
            onCustomerListDone
        );
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

                        <p class="title is-3"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Submission</p>
                        <p class="pb-4">Please fill out all the required fields before submitting this form.</p>
                        <FormErrorBox errors={errors} />

                        <div class="container">
                            <p class="subtitle is-4">Customer</p>
                            <FormRadioField
                                label="Do you have a customer for this submission?"
                                name="hasCustomer"
                                value={hasCustomer}
                                opt1Value={2}
                                opt1Label="No"
                                opt2Value={1}
                                opt2Label="Yes"
                                errorText={errors && errors.hasCustomer}
                                onChange={onHasCustomerChange}
                                maxWidth="180px"
                            />

                            {hasCustomer === 1 && <div>
                                <FormInputFieldWithButton
                                    label="Search"
                                    name="searchKeyword"
                                    placeholder="Find customers"
                                    value={searchKeyword}
                                    errorText={errors && errors.searchKeyword}
                                    helpText=""
                                    onChange={onSearchKeywordChange}
                                    isRequired={true}
                                    maxWidth="380px"
                                    onButtonClick={searchButtonClick}
                                    buttonLabel="Search"
                                />
                            </div>}

                        </div>

                        <div class="columns">
                            <div class="column is-half">
                                <button class="button is-hidden-touch" onClick={(e)=>setShowCancelWarning(true)}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</button>
                                <button class="button is-fullwidth is-hidden-desktop" onClick={(e)=>setShowCancelWarning(true)}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</button>
                            </div>
                            <div class="column is-half has-text-right">
                                <button class="button is-primary is-hidden-touch" onClick={null}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Next</button>
                                <button class="button is-primary is-fullwidth is-hidden-desktop" onClick={null}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Next</button>
                            </div>
                        </div>

                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerSubmissionAddStep1;
