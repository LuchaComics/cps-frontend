import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../Hooks/useLocalStorage";
import { getProfileDetailAPI } from "../../API/profile";
import FormErrorBox from "../Element/FormErrorBox";
import FormInputField from "../Element/FormInputField";
import FormTextareaField from "../Element/FormTextareaField";
import FormRadioField from "../Element/FormRadioField";
import FormMultiSelectField from "../Element/FormMultiSelectField";
import FormSelectField from "../Element/FormSelectField";
import FormCheckboxField from "../Element/FormCheckboxField";
import { topAlertMessageState, topAlertStatusState } from "../../AppState";


function AccountDetail() {
    ////
    ////
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
    const [profile, setProfile] = useState({});

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onProfileDetailSuccess(response){
        console.log("onProfileDetailSuccess: Starting...");
        setProfile(response);
    }

    function onProfileDetailError(apiErr) {
        console.log("onProfileDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onProfileDetailDone() {
        console.log("onProfileDetailDone: Starting...");
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
            getProfileDetailAPI(
                onProfileDetailSuccess,
                onProfileDetailError,
                onProfileDetailDone
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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-3"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

                        {!isFetching && profile && <div class="container">

                            <p class="subtitle is-4">Identification</p>
                            <FormInputField
                                label="First Name"
                                name="firstName"
                                placeholder="Text input"
                                value={profile.firstName}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />
                            <FormInputField
                                label="Last Name"
                                name="lastName"
                                placeholder="Text input"
                                value={profile.lastName}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <p class="subtitle is-4">Contact Information</p>

                            <FormInputField
                                label="Email"
                                name="email"
                                placeholder="Text input"
                                value={profile.email}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Phone"
                                name="phone"
                                placeholder="Text input"
                                value={profile.phone}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <p class="subtitle is-4">Address</p>

                            <FormInputField
                                label="Country"
                                name="country"
                                placeholder="Text input"
                                value={profile.country}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Region"
                                name="region"
                                placeholder="Text input"
                                value={profile.region}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="City"
                                name="city"
                                placeholder="Text input"
                                value={profile.city}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Address Line 1"
                                name="addressLine1"
                                placeholder="Text input"
                                value={profile.addressLine1}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Address Line 2"
                                name="addressLine2"
                                placeholder="Text input"
                                value={profile.addressLine2}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Postal Code"
                                name="postalCode"
                                placeholder="Text input"
                                value={profile.postalCode}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <p class="subtitle is-4">Company</p>

                            <FormInputField
                                label="Company Name"
                                name="companyName"
                                placeholder="Text input"
                                value={profile.companyName}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormCheckboxField
                                label="I agree to receive updates from CPS and its partners via email"
                                name="agreePromotionsEmail"
                                checked={profile.agreePromotionsEmail}
                                maxWidth="180px"
                                disabled={true}
                            />


                            <div class="columns">
                                <div class="column is-half">
                                    <Link class="button is-hidden-touch" to={"/dashboard"}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link class="button is-fullwidth is-hidden-desktop" to={"/dashboard"}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                </div>
                                <div class="column is-half has-text-right">
                                    <Link to={"/account/update"} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                    <Link to={"/account/update"} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                </div>
                            </div>

                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AccountDetail;
