import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faBuilding, faEye } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getUserDetailAPI, postUserCreateAPI } from "../../../API/user";
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
import {
    HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS,
} from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminUserAdd() {
    ////
    //// URL Parameters.
    ////

    const [searchParams] = useSearchParams(); // Special thanks via https://stackoverflow.com/a/65451140
    const orgID = searchParams.get("organization_id");
    const orgName = searchParams.get("organization_name");

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
    const [organizationSelectOptions, setOrganizationSelectOptions] = useState([]);
    const [organizationID, setOrganizationID] = useState(orgID);
    const [role, setRole] = useState();

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
            OrganizationID: organizationID,
            Role: role,
            Status: 1, // 1 = UserActiveStatus
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
        console.log("onSubmitClick, user:", user);
        postUserCreateAPI(user, onAdminUserAddSuccess, onAdminUserAddError, onAdminUserAddDone);
    }

    function onAdminUserAddSuccess(response){
        // For debugging purposes only.
        console.log("onAdminUserAddSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("User created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAdminUserAddSuccess: Delayed for 2 seconds.");
            console.log("onAdminUserAddSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        if (orgName !== undefined && orgName !== null && orgName !== "") {
            // Redirect the user to a new page.
            setForceURL("/admin/organization/"+orgID+"/users");
        } else {
            // Redirect the user to a new page.
            setForceURL("/admin/user/"+response.id);
        }
    }

    function onAdminUserAddError(apiErr) {
        console.log("onAdminUserAddError: Starting...");
        console.log("onAdminUserAddError: apiErr:", apiErr);
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            // console.log("onAdminUserAddError: Delayed for 2 seconds.");
            // console.log("onAdminUserAddError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminUserAddDone() {
        console.log("onAdminUserAddDone: Starting...");
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
            let params = new Map();
            getOrganizationSelectOptionListAPI(
                params,
                onOrganizationOptionListSuccess,
                onOrganizationOptionListError,
                onOrganizationOptionListDone
            );
            setFetching(true);
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
                        {orgName !== undefined && orgName !== null && orgName !== ""
                            ?
                            <ul>
                                <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                                <li class=""><Link to="/admin/organizations" aria-current="page"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organizations</Link></li>
                                <li class=""><Link to={`/admin/organization/${orgID}/users`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Users)</Link></li>
                                <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add User</Link></li>
                            </ul>
                            :
                            <ul>
                                <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                                <li class=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Users</Link></li>
                                <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add</Link></li>
                            </ul>
                        }
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
                                    Your user record will be cancelled and your work will be lost. This cannot be undone. Do you want to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    {orgName !== undefined && orgName !== null && orgName !== ""
                                        ?
                                        <Link class="button is-medium is-success" to={`/admin/organization/${orgID}/users`}>Yes</Link>
                                        :
                                        <Link class="button is-medium is-success" to={`/admin/users`}>Yes</Link>
                                    }
                                    <button class="button is-medium" onClick={(e)=>setShowCancelWarning(false)}>No</button>
                                </footer>
                            </div>
                        </div>

                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add User</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

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

                                    <FormInputField
                                        label="Password (Optional)"
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
                                        label="Password Repeated (Optional)"
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

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>
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
                                        errorText={(e)=>setHowDidYouHearAboutUsOther(e.target.value)}
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

                                </div>
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminUserAdd;
