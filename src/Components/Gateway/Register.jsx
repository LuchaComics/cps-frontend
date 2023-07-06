import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../Hooks/useLocalStorage";
import { postRegisterAPI } from "../../API/gateway";
import FormErrorBox from "../Reusable/FormErrorBox";
import FormInputField from "../Reusable/FormInputField";
import PageLoadingContent from "../Reusable/PageLoadingContent";
import FormTextareaField from "../Reusable/FormTextareaField";
import FormRadioField from "../Reusable/FormRadioField";
import FormMultiSelectField from "../Reusable/FormMultiSelectField";
import FormSelectField from "../Reusable/FormSelectField";
import FormCheckboxField from "../Reusable/FormCheckboxField";
import FormCountryField from "../Reusable/FormCountryField";
import FormRegionField from "../Reusable/FormRegionField";
import { HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS } from "../../Constants/FieldOptions";
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
    const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState(0);
    const [howDidYouHearAboutUsOther, setHowDidYouHearAboutUsOther] = useState("");

    ////
    //// Event handling.
    ////

    function onAgreePromotionsEmailChange(e) {
        setHasPromotionalEmail(!agreePromotionsEmail);
    }

    function onAgreeTOSChange(e) {
        setAgreeTOS(!agreeTOS);
    }

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        setFetching(true);
        setErrors({});

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
            HowDidYouHearAboutUs: howDidYouHearAboutUs,
            HowDidYouHearAboutUsOther: howDidYouHearAboutUsOther,
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
                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Register</p>
                        <FormErrorBox errors={errors} />

                        {isFetching && <PageLoadingContent displayMessage={"Submitting..."} />}

                        {!isFetching && <div class="container">
                            <p class="subtitle is-6">Details</p>

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

                            <FormInputField
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Text input"
                                value={password}
                                errorText={errors && errors.password}
                                helpText=""
                                onChange={(e)=>setPassword(e.target.value)}
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
                                onChange={(e)=>setPasswordRepeated(e.target.value)}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <p class="subtitle is-6">Contact Information</p>

                            <FormInputField
                                label="Email"
                                name="email"
                                type="email"
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

                            <p class="subtitle is-6">Address</p>

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
                                label="Address Line 2 (Optional)"
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

                            <p class="subtitle is-6">Company & Misc.</p>

                            <FormInputField
                                label="Company Name"
                                name="companyName"
                                placeholder="Text input"
                                value={companyName}
                                errorText={errors && errors.companyName}
                                helpText=""
                                onChange={(e)=>setCompanyName(e.target.value)}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormSelectField
                                label="How did you hear about us?"
                                name="howDidYouHearAboutUs"
                                placeholder="Pick"
                                selectedValue={howDidYouHearAboutUs}
                                errorText={errors && errors.howDidYouHearAboutUs}
                                helpText=""
                                onChange={(e)=>setHowDidYouHearAboutUs(parseInt(e.target.value))}
                                options={HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS}
                            />

                            {howDidYouHearAboutUs === 1 && <FormInputField
                                label="Other (Please specify):"
                                name="howDidYouHearAboutUsOther"
                                placeholder="Text input"
                                value={howDidYouHearAboutUsOther}
                                errorText={errors && errors.howDidYouHearAboutUsOther}
                                helpText=""
                                onChange={(e)=>setHowDidYouHearAboutUsOther(e.target.value)}
                                isRequired={true}
                                maxWidth="380px"
                            />}

                            <FormCheckboxField
                                label="I agree to receive electronic updates from my local retailer and CPS"
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
                                    <Link to={`/login`} class="button is-medium is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link to={`/login`} class="button is-medium is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                </div>
                                <div class="column is-half has-text-right">
                                    <button class="button is-medium is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Register</button>
                                    <button class="button is-medium is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Register</button>
                                </div>
                            </div>
                        </div>}
                    </nav>
                    <span className="is-pulled-right has-text-grey">
                        Already have an account? <Link to="/login">Click here&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link> to sign in.
                    </span>
                </section>
                <div className="has-text-centered">
                    <br />
                    <p>Need help?</p>
                    <p><Link to="Support@cpscapsule.com">Support@cpscapsule.com</Link></p>
                    <p><a href="tel:+15199142685">(519) 914-2685</a></p>
                    <p><Link to="/cpsrn-registry" className="">CPSRN Registry&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link></p>
                </div>
            </div>
        </>
    );
}

export default Register;
