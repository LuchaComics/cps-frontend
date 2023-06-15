import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getCustomerDetailAPI, postCustomerCreateAPI } from "../../../API/customer";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import FormCheckboxField from "../../Element/FormCheckboxField";
import FormCountryField from "../../Element/FormCountryField";
import FormRegionField from "../../Element/FormRegionField";
import PageLoadingContent from "../../Element/PageLoadingContent";
import { HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS } from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function RetailerCustomerAdd() {
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
    const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState(0);
    const [howDidYouHearAboutUsOther, setHowDidYouHearAboutUsOther] = useState("");
    const [showCancelWarning, setShowCancelWarning] = useState(false);

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
        setErrors({});
        const customer = {
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
            HowDidYouHearAboutUs: howDidYouHearAboutUs,
            HowDidYouHearAboutUsOther: howDidYouHearAboutUsOther,
        };
        console.log("onSubmitClick, customer:", customer);
        postCustomerCreateAPI(customer, onRetailerCustomerAddSuccess, onRetailerCustomerAddError, onRetailerCustomerAddDone);
    }

    function onRetailerCustomerAddSuccess(response){
        // For debugging purposes only.
        console.log("onRetailerCustomerAddSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Customer created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onRetailerCustomerAddSuccess: Delayed for 2 seconds.");
            console.log("onRetailerCustomerAddSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/customer/"+response.id);
    }

    function onRetailerCustomerAddError(apiErr) {
        console.log("onRetailerCustomerAddError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onRetailerCustomerAddError: Delayed for 2 seconds.");
            console.log("onRetailerCustomerAddError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onRetailerCustomerAddDone() {
        console.log("onRetailerCustomerAddDone: Starting...");
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
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/customers" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers</Link></li>
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
                                    Your customer record will be cancelled and your work will be lost. This cannot be undone. Do you want to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    <Link class="button is-medium is-success" to={`/customers`}>Yes</Link>
                                    <button class="button is-medium" onClick={(e)=>setShowCancelWarning(false)}>No</button>
                                </footer>
                            </div>
                        </div>

                        <p class="title is-2"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Customer</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

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
                                label="Country (Optional)"
                                name="country"
                                placeholder="Text input"
                                selectedCountry={country}
                                errorText={errors && errors.country}
                                helpText=""
                                onChange={(value)=>setCountry(value)}
                                isRequired={false}
                                maxWidth="160px"
                            />

                            <FormRegionField
                                label="Province/Territory (Optional)"
                                name="region"
                                placeholder="Text input"
                                selectedCountry={country}
                                selectedRegion={region}
                                errorText={errors && errors.region}
                                helpText=""
                                onChange={(value)=>setRegion(value)}
                                isRequired={false}
                                maxWidth="280px"
                            />

                            <FormInputField
                                label="City (Optional)"
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
                                label="Address Line 1 (Optional)"
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
                                label="Postal Code (Optional)"
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

                            <div class="columns pt-5">
                                <div class="column is-half">
                                    <button class="button is-medium is-hidden-touch" onClick={(e)=>setShowCancelWarning(true)}><FontAwesomeIcon className="fas" icon={faTimesCircle} />&nbsp;Cancel</button>
                                    <button class="button is-medium is-fullwidth is-hidden-desktop" onClick={(e)=>setShowCancelWarning(true)}><FontAwesomeIcon className="fas" icon={faTimesCircle} />&nbsp;Cancel</button>
                                </div>
                                <div class="column is-half has-text-right">
                                    <button class="button is-medium is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                    <button class="button is-medium is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                </div>
                            </div>

                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerCustomerAdd;
