import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft, faFile } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../../../Hooks/useLocalStorage";
import { putAttachmentUpdateAPI, getAttachmentDetailAPI } from "../../../../API/Attachment";
import FormErrorBox from "../../../Element/FormErrorBox";
import FormInputField from "../../../Element/FormInputField";
import FormTextareaField from "../../../Element/FormTextareaField";
import FormRadioField from "../../../Element/FormRadioField";
import FormMultiSelectField from "../../../Element/FormMultiSelectField";
import FormSelectField from "../../../Element/FormSelectField";
import FormCheckboxField from "../../../Element/FormCheckboxField";
import FormCountryField from "../../../Element/FormCountryField";
import FormRegionField from "../../../Element/FormRegionField";
import PageLoadingContent from "../../../Element/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";


function RetailerCustomerAttachmentUpdate() {
    ////
    //// URL Parameters.
    ////

    const { id, aid } = useParams()

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
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [objectUrl, setObjectUrl] = useState("");

    ////
    //// Event handling.
    ////

    const onHandleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Starting...")
        setFetching(true);
        setErrors({});

        const formData = new FormData();
        formData.append('id', aid);
        formData.append('file', selectedFile);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('ownership_id', id);
        formData.append('ownership_type', 1); // 1=Customer or User.

        putAttachmentUpdateAPI(
            id,
            formData,
            onRetailerCustomerAttachmentUpdateSuccess,
            onRetailerCustomerAttachmentUpdateError,
            onRetailerCustomerAttachmentUpdateDone
        );
        console.log("onSubmitClick: Finished.")
    }

    ////
    //// API.
    ////

    function onRetailerCustomerAttachmentUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onRetailerCustomerAttachmentUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Customer created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onRetailerCustomerAttachmentUpdateSuccess: Delayed for 2 seconds.");
            console.log("onRetailerCustomerAttachmentUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to the customer attachments page.
        setForceURL("/customer/"+id+"/attachments");
    }

    function onRetailerCustomerAttachmentUpdateError(apiErr) {
        console.log("onRetailerCustomerAttachmentUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onRetailerCustomerAttachmentUpdateError: Delayed for 2 seconds.");
            console.log("onRetailerCustomerAttachmentUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onRetailerCustomerAttachmentUpdateDone() {
        console.log("onRetailerCustomerAttachmentUpdateDone: Starting...");
        setFetching(false);
    }

    function onRetailerCustomerAttachmentDetailSuccess(response){
        // For debugging purposes only.
        console.log("onRetailerCustomerAttachmentDetailSuccess: Starting...");
        console.log(response);
        setName(response.name);
        setDescription(response.description);
        setObjectUrl(response.objectUrl);
    }

    function onRetailerCustomerAttachmentDetailError(apiErr) {
        console.log("onRetailerCustomerAttachmentDetailError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onRetailerCustomerAttachmentDetailError: Delayed for 2 seconds.");
            console.log("onRetailerCustomerAttachmentDetailError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onRetailerCustomerAttachmentDetailDone() {
        console.log("onRetailerCustomerAttachmentDetailDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.

            getAttachmentDetailAPI(
                aid,
                onRetailerCustomerAttachmentDetailSuccess,
                onRetailerCustomerAttachmentDetailError,
                onRetailerCustomerAttachmentDetailDone
            );
        }

        return () => { mounted = false; }
    }, [aid]);
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
                            <li class=""><Link to={`/customer/${id}/attachments`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Attachments)</Link></li>
                            <li class=""><Link to={`/customer/${id}/attachment/${aid}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faFile} />&nbsp;Attachment</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-2"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit Attachment</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <div class="container">
                                    <article class="message is-warning">
                                      <div class="message-body">
                                        <strong>Warning:</strong> Submitting with new uploaded file will delete previous upload.
                                      </div>
                                    </article>

                                    <FormInputField
                                        label="Name"
                                        name="name"
                                        placeholder="Text input"
                                        value={name}
                                        errorText={errors && errors.name}
                                        helpText=""
                                        onChange={(e)=>setName(e.target.value)}
                                        isRequired={true}
                                        maxWidth="150px"
                                    />

                                    <FormInputField
                                        label="Description"
                                        name="description"
                                        type="text"
                                        placeholder="Text input"
                                        value={description}
                                        errorText={errors && errors.description}
                                        helpText=""
                                        onChange={(e)=>setDescription(e.target.value)}
                                        isRequired={true}
                                        maxWidth="485px"
                                    />

                                    <input name="file"type="file" onChange={onHandleFileChange} />
                                    <br />
                                    <br />


                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link to={`/customer/${id}/attachment/${aid}`} class="button is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link to={`/customer/${id}/attachment/${aid}`} class="button is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
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

export default RetailerCustomerAttachmentUpdate;
