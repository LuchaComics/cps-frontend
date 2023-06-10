import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getCustomerDetailAPI } from "../../../API/customer";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import FormCheckboxField from "../../Element/FormCheckboxField";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminCustomerDetail() {
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
    const [customer, setCustomer] = useState({});
    const [tabIndex, setTabIndex] = useState(1);

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onCustomerDetailSuccess(response){
        console.log("onCustomerDetailSuccess: Starting...");
        setCustomer(response);
    }

    function onCustomerDetailError(apiErr) {
        console.log("onCustomerDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onCustomerDetailDone() {
        console.log("onCustomerDetailDone: Starting...");
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
            getCustomerDetailAPI(
                id,
                onCustomerDetailSuccess,
                onCustomerDetailError,
                onCustomerDetailDone
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
                            <li class=""><Link to="/admin/customers" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        {customer && <div class="columns">
                            <div class="column">
                                <p class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Customer</p>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/admin/submissions/add?customer_id=${id}&customer_name=${customer.name}`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/admin/submissions/add?customer_id=${id}&customer_name=${customer.name}`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                            </div>
                        </div>}
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

                        {!isFetching && customer && <div class="container">
                            <div class="tabs is-medium">
                              <ul>
                                <li class="is-active">
                                    <Link><b>Detail</b></Link>
                                </li>
                                <li>
                                    <Link to={`/admin/customer/${customer.id}/sub`}>Submissions</Link>
                                </li>
                                <li>
                                    <Link to={`/admin/customer/${customer.id}/comments`}>Comments</Link>
                                </li>
                              </ul>
                            </div>

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Full Name</p>
                            <hr />

                            <FormInputField
                                label="First Name"
                                name="firstName"
                                placeholder="Text input"
                                value={customer.firstName}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />
                            <FormInputField
                                label="Last Name"
                                name="lastName"
                                placeholder="Text input"
                                value={customer.lastName}
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
                                value={customer.email}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Phone"
                                name="phone"
                                placeholder="Text input"
                                value={customer.phone}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faAddressBook} />&nbsp;Address</p>
                            <hr />

                            <FormInputField
                                label="Country"
                                name="country"
                                placeholder="Text input"
                                value={customer.country}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Region"
                                name="region"
                                placeholder="Text input"
                                value={customer.region}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="City"
                                name="city"
                                placeholder="Text input"
                                value={customer.city}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Address Line 1"
                                name="addressLine1"
                                placeholder="Text input"
                                value={customer.addressLine1}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Address Line 2"
                                name="addressLine2"
                                placeholder="Text input"
                                value={customer.addressLine2}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <FormInputField
                                label="Postal Code"
                                name="postalCode"
                                placeholder="Text input"
                                value={customer.postalCode}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>
                            <hr />

                            <FormCheckboxField
                                label="I agree to receive electronic updates from my local retailer and CPS"
                                name="agreePromotionsEmail"
                                checked={customer.agreePromotionsEmail}
                                maxWidth="180px"
                                disabled={true}
                            />

                            <div class="columns pt-5">
                                <div class="column is-half">
                                    <Link class="button is-hidden-touch" to={`/admin/customers`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/customers`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                </div>
                                <div class="column is-half has-text-right">
                                    <Link to={`/admin/customer/${id}/edit`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                    <Link to={`/admin/customer/${id}/edit`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                </div>
                            </div>


                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminCustomerDetail;
