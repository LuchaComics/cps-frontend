import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faIdCard, faAddressBook, faContactCard, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getProfileDetailAPI, putProfileUpdateAPI } from "../../API/profile";
import FormErrorBox from "../Element/FormErrorBox";
import FormInputField from "../Element/FormInputField";
import FormTextareaField from "../Element/FormTextareaField";
import FormRadioField from "../Element/FormRadioField";
import FormMultiSelectField from "../Element/FormMultiSelectField";
import FormSelectField from "../Element/FormSelectField";
import FormCheckboxField from "../Element/FormCheckboxField";
import FormCountryField from "../Element/FormCountryField";
import FormRegionField from "../Element/FormRegionField";
import PageLoadingContent from "../Element/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../AppState";


function ProfileUpdate() {
    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");
    const [agreePromotionsEmail, setHasPromotionalEmail] = useState(true);

    ////
    //// Event handling.
    ////

    function onAgreePromotionsEmailChange(e) {
        setHasPromotionalEmail(!agreePromotionsEmail);
    }

    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        setFetching(true);

        const submission = {
            Email: email,
            Phone: phone,
            FirstName: firstName,
            LastName: lastName,
            Password: password,
            PasswordRepeated: passwordRepeated,
            CompanyName: companyName,
            PostalCode: postalCode,
            AddressLine1: addressLine1,
            AddressLine2: addressLine2,
            City: city,
            Region: region,
            Country: country,
            AgreePromotionsEmail: agreePromotionsEmail,
        };
        console.log("onSubmitClick, submission:", submission);
        putProfileUpdateAPI(submission, onProfileUpdateSuccess, onProfileUpdateError, onProfileUpdateDone);
    }

    function onProfileDetailSuccess(response){
        console.log("onProfileDetailSuccess: Starting...");
        setEmail(response.email);
        setPhone(response.phone);
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setCompanyName(response.companyName);
        setPostalCode(response.postalCode);
        setAddressLine1(response.addressLine1);
        setAddressLine2(response.addressLine2);
        setCity(response.city);
        setRegion(response.region);
        setCountry(response.country);
        setHasPromotionalEmail(response.agreePromotionsEmail);
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

    function onProfileUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onProfileUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Profile updated");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onProfileUpdateSuccess: Delayed for 2 seconds.");
            console.log("onProfileUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/account");
    }

    function onProfileUpdateError(apiErr) {
        console.log("onProfileUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onProfileUpdateError: Delayed for 2 seconds.");
            console.log("onProfileUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onProfileUpdateDone() {
        console.log("onProfileUpdateDone: Starting...");
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
                        <p class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching && <PageLoadingContent displayMessage={"Submitting..."} />}

                        {!isFetching && <div class="container">

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Full Name</p>
                            <hr />

                            <FormInputField
                                label="First Name"
                                name="firstName"
                                placeholder="Text input"
                                value={firstName}
                                errorText={errors && errors.firstName}
                                helpText=""
                                onChange={(e)=>setFirstName(e.target.value)}
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
                                onChange={(e)=>setLastName(e.target.value)}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faContactCard} />&nbsp;Contact Information</p>
                            <hr />

                            <FormInputField
                                label="Email"
                                name="email"
                                placeholder="Text input"
                                value={email}
                                errorText={errors && errors.email}
                                helpText=""
                                onChange={(e)=>setEmail(e.target.value)}
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
                                onChange={(e)=>setPhone(e.target.value)}
                                isRequired={true}
                                maxWidth="150px"
                            />

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faAddressBook} />&nbsp;Address</p>
                            <hr />

                            <FormCountryField
                                priorityOptions={["CA","US","MX"]}
                                label="Country"
                                name="country"
                                placeholder="Text input"
                                selectedCountry={country}
                                errorText={errors && errors.country}
                                helpText=""
                                onChange={(value)=>setCountry(value)}
                                isRequired={true}
                                maxWidth="160px"
                            />

                            <FormRegionField
                                label="Province/Territory"
                                name="region"
                                placeholder="Text input"
                                selectedCountry={country}
                                selectedRegion={region}
                                errorText={errors && errors.region}
                                helpText=""
                                onChange={(value)=>setRegion(value)}
                                isRequired={true}
                                maxWidth="280px"
                            />

                            <FormInputField
                                label="City"
                                name="city"
                                placeholder="Text input"
                                value={city}
                                errorText={errors && errors.city}
                                helpText=""
                                onChange={(e)=>setCity(e.target.value)}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="Address Line 1"
                                name="addressLine1"
                                placeholder="Text input"
                                value={addressLine1}
                                errorText={errors && errors.addressLine1}
                                helpText=""
                                onChange={(e)=>setAddressLine1(e.target.value)}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="Address Line 2"
                                name="addressLine2"
                                placeholder="Text input"
                                value={addressLine2}
                                errorText={errors && errors.addressLine2}
                                helpText=""
                                onChange={(e)=>setAddressLine2(e.target.value)}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="Postal Code"
                                name="postalCode"
                                placeholder="Text input"
                                value={postalCode}
                                errorText={errors && errors.postalCode}
                                helpText=""
                                onChange={(e)=>setPostalCode(e.target.value)}
                                isRequired={true}
                                maxWidth="80px"
                            />

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>
                            <hr />

                            <FormCheckboxField
                                label="I agree to receive electronic updates from my local retailer and CPS"
                                name="agreePromotionsEmail"
                                checked={agreePromotionsEmail}
                                errorText={errors && errors.agreePromotionsEmail}
                                onChange={onAgreePromotionsEmailChange}
                                maxWidth="180px"
                            />

                            <div class="columns pt-5">
                                <div class="column is-half">
                                    <Link class="button is-hidden-touch" to={"/account"}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link class="button is-fullwidth is-hidden-desktop" to={"/account"}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
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

export default ProfileUpdate;
