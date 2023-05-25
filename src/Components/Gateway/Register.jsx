import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../Hooks/useLocalStorage";
import { postRegisterAPI } from "../../API/gateway";
import FormErrorBox from "../Element/FormErrorBox";
import FormInputField from "../Element/FormInputField";
import FormTextareaField from "../Element/FormTextareaField";
import FormRadioField from "../Element/FormRadioField";
import FormMultiSelectField from "../Element/FormMultiSelectField";
import FormSelectField from "../Element/FormSelectField";
import FormCheckboxField from "../Element/FormCheckboxField";
// import { OVERALL_LETTER_GRADE_OPTIONS } from "../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../AppState";


function Register() {
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
    const [agreeTOS, setAgreeTOS] = useState();

    ////
    //// Event handling.
    ////

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

    function onPasswordChange(e) {
        setPassword(e.target.value);
    }

    function onPasswordRepeatedChange(e) {
        setPasswordRepeated(e.target.value);
    }

    function onCompanyNameChange(e) {
        setCompanyName(e.target.value);
    }

    function onAddressLine1Change(e) {
        setAddressLine1(e.target.value);
    }

    function onAddressLine2Change(e) {
        setAddressLine2(e.target.value);
    }

    function onPostalCodeChange(e) {
        setPostalCode(e.target.value);
    }

    function onCityChange(e) {
        setCity(e.target.value);
    }

    function onRegionChange(e) {
        setRegion(e.target.value);
    }

    function onCountryChange(e) {
        setCountry(e.target.value);
    }

    function onAgreePromotionsEmailChange(e) {
        setHasPromotionalEmail(!agreePromotionsEmail);
    }

    function onAgreeTOSChange(e) {
        setAgreeTOS(!agreeTOS);
    }

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
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
            AgreeTOS: agreeTOS,
            AgreePromotionsEmail: agreePromotionsEmail,
        };
        console.log("onSubmitClick, submission:", submission);
        postRegisterAPI(submission, onRegisterSuccess, onRegisterError, onRegisterDone);
    }

    ////
    //// API.
    ////

    function onRegisterSuccess(response){
        // For debugging purposes only.
        console.log("onRegisterSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Submission created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onRegisterSuccess: Delayed for 2 seconds.");
            console.log("onRegisterSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/register-successful");
    }

    function onRegisterError(apiErr) {
        console.log("onRegisterError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onRegisterError: Delayed for 2 seconds.");
            console.log("onRegisterError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onRegisterDone() {
        console.log("onRegisterDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
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

                    <nav class="box">
                        <p class="title is-3"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Register</p>
                        <FormErrorBox errors={errors} />

                        {!isFetching && <div class="container">
                            <p class="subtitle is-4">Identification</p>

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
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Text input"
                                value={password}
                                errorText={errors && errors.password}
                                helpText=""
                                onChange={onPasswordChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="Password Repeated"
                                name="passwordRepeated"
                                type="password"
                                placeholder="Text input"
                                value={passwordRepeated}
                                errorText={errors && errors.passwordRepeated}
                                helpText=""
                                onChange={onPasswordRepeatedChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <p class="subtitle is-4">Contact Information</p>

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

                            <p class="subtitle is-4">Address</p>

                            <FormInputField
                                label="Country"
                                name="country"
                                placeholder="Text input"
                                value={country}
                                errorText={errors && errors.country}
                                helpText=""
                                onChange={onCountryChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="Region"
                                name="region"
                                placeholder="Text input"
                                value={region}
                                errorText={errors && errors.region}
                                helpText=""
                                onChange={onRegionChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="City"
                                name="city"
                                placeholder="Text input"
                                value={city}
                                errorText={errors && errors.city}
                                helpText=""
                                onChange={onCityChange}
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
                                onChange={onAddressLine1Change}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="Address Line 2 (Optional)"
                                name="addressLine2"
                                placeholder="Text input"
                                value={addressLine2}
                                errorText={errors && errors.addressLine2}
                                helpText=""
                                onChange={onAddressLine2Change}
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
                                onChange={onPostalCodeChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <p class="subtitle is-4">Company</p>

                            <FormInputField
                                label="Company Name"
                                name="companyName"
                                placeholder="Text input"
                                value={companyName}
                                errorText={errors && errors.companyName}
                                helpText=""
                                onChange={onCompanyNameChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormCheckboxField
                                label="I agree to receive updates from CPS and its partners via email"
                                name="agreePromotionsEmail"
                                checked={agreePromotionsEmail}
                                errorText={errors && errors.agreePromotionsEmail}
                                onChange={onAgreePromotionsEmailChange}
                                maxWidth="180px"
                            />

                            <FormCheckboxField
                                label="I agree to terms of service and privacy policy"
                                name="agreeTOS"
                                checked={agreeTOS}
                                errorText={errors && errors.agreeTos}
                                onChange={onAgreeTOSChange}
                                maxWidth="180px"
                            />

                            <div class="columns">
                                <div class="column is-half">
                                    <Link to={`/login`} class="button is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link to={`/login`} class="button is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                </div>
                                <div class="column is-half has-text-right">
                                    <button class="button is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Register</button>
                                    <button class="button is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Register</button>
                                </div>
                            </div>

                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default Register;
