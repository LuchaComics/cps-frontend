import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getUserDetailAPI } from "../../../API/user";
import { getOrganizationSelectOptionListAPI } from "../../../API/organization";
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
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminUserDetail() {
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
    const [user, setUser] = useState({});
    const [tabIndex, setTabIndex] = useState(1);
    const [organizationSelectOptions, setOrganizationSelectOptions] = useState([]);

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onUserDetailSuccess(response){
        console.log("onUserDetailSuccess: Starting...");
        setUser(response);
    }

    function onUserDetailError(apiErr) {
        console.log("onUserDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onUserDetailDone() {
        console.log("onUserDetailDone: Starting...");
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
                onUserDetailSuccess,
                onUserDetailError,
                onUserDetailDone
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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        {user && <div class="columns">
                            <div class="column">
                                <p class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;User</p>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/admin/submissions/pick-type-for-add?user_id=${id}&user_name=${user.name}`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/admin/submissions/pick-type-for-add?user_id=${id}&user_name=${user.name}`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                            </div>
                        </div>}
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                {user && <div class="container">
                                    <div class="tabs is-medium">
                                      <ul>
                                        <li class="is-active">
                                            <Link><b>Detail</b></Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/user/${user.id}/comics`}>Comics</Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/user/${user.id}/comments`}>Comments</Link>
                                        </li>
                                      </ul>
                                    </div>

                                    <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Settings</p>
                                    <hr />

                                    <FormSelectField
                                        label="Organization ID"
                                        name="organizationID"
                                        placeholder="Pick"
                                        selectedValue={user.organizationID}
                                        errorText={errors && errors.organizationID}
                                        helpText="Pick the organization this user belongs to and will be limited by"
                                        isRequired={true}
                                        options={organizationSelectOptions}
                                        disabled={true}
                                    />
                                    <FormRadioField
                                        label="Role"
                                        name="role"
                                        value={user.role}
                                        opt1Value={2}
                                        opt1Label="Staff"
                                        opt2Value={3}
                                        opt2Label="Customer"
                                        maxWidth="180px"
                                        disabled={true}
                                    />
                                    <FormRadioField
                                        label="Status"
                                        name="status"
                                        value={user.status}
                                        opt1Value={1}
                                        opt1Label="Active"
                                        opt2Value={2}
                                        opt2Label="Archived"
                                        maxWidth="180px"
                                        disabled={true}
                                    />

                                    <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Full Name</p>
                                    <hr />

                                    <FormInputField
                                        label="First Name"
                                        name="firstName"
                                        placeholder="Text input"
                                        value={user.firstName}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />
                                    <FormInputField
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Text input"
                                        value={user.lastName}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faContactCard} />&nbsp;Contact Information</p>
                                    <hr />

                                    <FormInputField
                                        label="Email"
                                        name="email"
                                        placeholder="Text input"
                                        value={user.email}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Phone"
                                        name="phone"
                                        placeholder="Text input"
                                        value={user.phone}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="150px"
                                        disabled={true}
                                    />

                                    <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faAddressBook} />&nbsp;Address</p>
                                    <hr />

                                    <FormCountryField
                                        priorityOptions={["CA","US","MX"]}
                                        label="Country"
                                        name="country"
                                        placeholder="Text input"
                                        selectedCountry={user.country}
                                        errorText={errors && errors.country}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="160px"
                                        disabled={true}
                                    />

                                    <FormRegionField
                                        label="Province/Territory"
                                        name="region"
                                        placeholder="Text input"
                                        selectedCountry={user.country}
                                        selectedRegion={user.region}
                                        errorText={errors && errors.region}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="280px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="City"
                                        name="city"
                                        placeholder="Text input"
                                        value={user.city}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Address Line 1"
                                        name="addressLine1"
                                        placeholder="Text input"
                                        value={user.addressLine1}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Address Line 2"
                                        name="addressLine2"
                                        placeholder="Text input"
                                        value={user.addressLine2}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Postal Code"
                                        name="postalCode"
                                        placeholder="Text input"
                                        value={user.postalCode}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="80px"
                                        disabled={true}
                                    />

                                    <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>
                                    <hr />

                                    <FormCheckboxField
                                        label="I agree to receive electronic updates from my local retailer and CPS"
                                        name="agreePromotionsEmail"
                                        checked={user.agreePromotionsEmail}
                                        maxWidth="180px"
                                        disabled={true}
                                    />

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-hidden-touch" to={`/admin/users`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/users`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={`/admin/user/${id}/edit`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                            <Link to={`/admin/user/${id}/edit`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                        </div>
                                    </div>


                                </div>}
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminUserDetail;
