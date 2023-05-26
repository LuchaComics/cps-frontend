import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../Hooks/useLocalStorage";
import { getOrganizationDetailAPI, putOrganizationUpdateAPI } from "../../API/organization";
import FormErrorBox from "../Element/FormErrorBox";
import FormInputField from "../Element/FormInputField";
import FormTextareaField from "../Element/FormTextareaField";
import FormRadioField from "../Element/FormRadioField";
import FormMultiSelectField from "../Element/FormMultiSelectField";
import FormSelectField from "../Element/FormSelectField";
import FormCheckboxField from "../Element/FormCheckboxField";
import { topAlertMessageState, topAlertStatusState } from "../../AppState";


function OrganizationUpdate() {
    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [profile] = useLocalStorage("CPS_USER_PROFILE");
    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [name, setName] = useState("");


    ////
    //// Event handling.
    ////

    function onNameChange(e) {
        setName(e.target.value);
    }

    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        const org = {
            ID: profile.user.organizationId,
            Name: name,
        };
        console.log("onSubmitClick, org:", org);
        putOrganizationUpdateAPI(org, onOrganizationUpdateSuccess, onOrganizationUpdateError, onOrganizationUpdateDone);
    }

    function onOrganizationDetailSuccess(response){
        console.log("onOrganizationDetailSuccess: Starting...");
        setName(response.name);
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

    function onOrganizationUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onOrganizationUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Organization updated");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onOrganizationUpdateSuccess: Delayed for 2 seconds.");
            console.log("onOrganizationUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/organization");
    }

    function onOrganizationUpdateError(apiErr) {
        console.log("onOrganizationUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onOrganizationUpdateError: Delayed for 2 seconds.");
            console.log("onOrganizationUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrganizationUpdateDone() {
        console.log("onOrganizationUpdateDone: Starting...");
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
                profile.user.organizationId,
                onOrganizationDetailSuccess,
                onOrganizationDetailError,
                onOrganizationDetailDone
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
                            <li class=""><Link to="/organization" aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Organization</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-3"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Organization</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

                        {!isFetching && <div class="container">

                            <p class="subtitle is-4">Identification</p>
                            <FormInputField
                                label="Name"
                                name="name"
                                placeholder="Text input"
                                value={name}
                                errorText={errors && errors.name}
                                helpText=""
                                onChange={onNameChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <div class="columns">
                                <div class="column is-half">
                                    <Link class="button is-hidden-touch" to={"/organization"}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link class="button is-fullwidth is-hidden-desktop" to={"/organization"}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                </div>
                                <div class="column is-half has-text-right">
                                    <button class="button is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                    <button class="button is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                </div>
                            </div>

                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default OrganizationUpdate;
