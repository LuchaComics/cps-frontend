import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getUserDetailAPI, putUserUpdateAPI } from "../../../API/user";
import { getOrganizationSelectOptionListAPI } from "../../../API/organization";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormInputField from "../../Reusable/FormInputField";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormRadioField from "../../Reusable/FormRadioField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import FormCountryField from "../../Reusable/FormCountryField";
import FormRegionField from "../../Reusable/FormRegionField";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS } from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminUserUpdate() {
    ////
    //// URL Parameters.
    ////

    const { id } = useParams()

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
    const [organizationSelectOptions, setOrganizationSelectOptions] = useState([]);
    const [organizationID, setOrganizationID] = useState();
    const [role, setRole] = useState();
    const [status, setStatus] = useState();

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
        const user = {
            id: id,
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
            OrganizationID: organizationID,
            Role: role,
            Status: status,
        };
        console.log("onSubmitClick, user:", user);
        putUserUpdateAPI(user, onAdminUserUpdateSuccess, onAdminUserUpdateError, onAdminUserUpdateDone);
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
        setHowDidYouHearAboutUs(response.howDidYouHearAboutUs);
        setHowDidYouHearAboutUsOther(response.howDidYouHearAboutUsOther);
        setOrganizationID(response.organizationID);
        setRole(response.role);
        setStatus(response.status);
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

    function onAdminUserUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onAdminUserUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("User updated");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAdminUserUpdateSuccess: Delayed for 2 seconds.");
            console.log("onAdminUserUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/admin/user/"+response.id);
    }

    function onAdminUserUpdateError(apiErr) {
        console.log("onAdminUserUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminUserUpdateError: Delayed for 2 seconds.");
            console.log("onAdminUserUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminUserUpdateDone() {
        console.log("onAdminUserUpdateDone: Starting...");
        setFetching(false);
    }

    function onOrganizationOptionListSuccess(response){
        console.log("onOrganizationOptionListSuccess: Starting...");
        if (response !== null) {
            const selectOptions = [
                {"value": 0, "label": "Please select"}, // Add empty options.
                ...response
            ]
            setOrganizationSelectOptions(selectOptions);
        }
    }

    function onOrganizationOptionListError(apiErr) {
        console.log("onOrganizationOptionListError: Starting...");
        console.log("onOrganizationOptionListError: apiErr:", apiErr);
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrganizationOptionListDone() {
        console.log("onOrganizationOptionListDone: Starting...");
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
            getUserDetailAPI(
                id,
                onProfileDetailSuccess,
                onProfileDetailError,
                onProfileDetailDone
            );
            let params = new Map();
            getOrganizationSelectOptionListAPI(
                params,
                onOrganizationOptionListSuccess,
                onOrganizationOptionListError,
                onOrganizationOptionListDone
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
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                            <li class=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Users</Link></li>
                            <li class=""><Link to={`/admin/user/${id}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Update</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;User</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <div class="container">
                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Settings</p>
                                    <hr />

                                    <FormSelectField
                                        label="Organization ID"
                                        name="organizationID"
                                        placeholder="Pick"
                                        selectedValue={organizationID}
                                        errorText={errors && errors.organizationID}
                                        helpText="Pick the organization this user belongs to and will be limited by"
                                        isRequired={true}
                                        onChange={(e)=>setOrganizationID(e.target.value)}
                                        options={organizationSelectOptions}
                                        disabled={organizationSelectOptions.length === 0}
                                    />
                                    <FormRadioField
                                        label="Role"
                                        name="role"
                                        value={role}
                                        opt1Value={2}
                                        opt1Label="Staff"
                                        opt2Value={3}
                                        opt2Label="Customer"
                                        errorText={errors && errors.role}
                                        onChange={(e)=>setRole(parseInt(e.target.value))}
                                        maxWidth="180px"
                                    />
                                    <FormRadioField
                                        label="Status"
                                        name="status"
                                        value={status}
                                        opt1Value={1}
                                        opt1Label="Active"
                                        opt2Value={2}
                                        opt2Label="Archived"
                                        errorText={errors && errors.status}
                                        onChange={(e)=>setStatus(parseInt(e.target.value))}
                                        maxWidth="180px"
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Full Name</p>
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

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faContactCard} />&nbsp;Contact Information</p>
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

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faAddressBook} />&nbsp;Address</p>
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
                                        isRequired={true}
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
                                        isRequired={true}
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

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>
                                    <hr />

                                    <FormSelectField
                                        label="How did you hear about us?"
                                        name="howDidYouHearAboutUs"
                                        placeholder="Pick"
                                        selectedValue={howDidYouHearAboutUs}
                                        errorText={errors && errors.howDidYouHearAboutUs}
                                        helpText=""
                                        onChange={(e)=>setHowDidYouHearAboutUs(e.target.value)}
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
                                            <Link class="button is-hidden-touch" to={`/admin/user/${id}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/user/${id}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button class="button is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                            <button class="button is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                        </div>
                                    </div>

                                </div>
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminUserUpdate;
