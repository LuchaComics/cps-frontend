import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faBuilding, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft, faFile } from '@fortawesome/free-solid-svg-icons'
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


function AdminOrganizationAttachmentUpdate() {
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
        formData.append('ownership_type', 3); // 3=Organization.

        putAttachmentUpdateAPI(
            id,
            formData,
            onAdminOrganizationAttachmentUpdateSuccess,
            onAdminOrganizationAttachmentUpdateError,
            onAdminOrganizationAttachmentUpdateDone
        );
        console.log("onSubmitClick: Finished.")
    }

    ////
    //// API.
    ////

    function onAdminOrganizationAttachmentUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onAdminOrganizationAttachmentUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Attachment updated");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAdminOrganizationAttachmentUpdateSuccess: Delayed for 2 seconds.");
            console.log("onAdminOrganizationAttachmentUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the organization to the organization attachments page.
        setForceURL("/admin/organization/"+id+"/attachments");
    }

    function onAdminOrganizationAttachmentUpdateError(apiErr) {
        console.log("onAdminOrganizationAttachmentUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminOrganizationAttachmentUpdateError: Delayed for 2 seconds.");
            console.log("onAdminOrganizationAttachmentUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminOrganizationAttachmentUpdateDone() {
        console.log("onAdminOrganizationAttachmentUpdateDone: Starting...");
        setFetching(false);
    }

    function onAdminOrganizationAttachmentDetailSuccess(response){
        // For debugging purposes only.
        console.log("onAdminOrganizationAttachmentDetailSuccess: Starting...");
        console.log(response);
        setName(response.name);
        setDescription(response.description);
        setObjectUrl(response.objectUrl);
    }

    function onAdminOrganizationAttachmentDetailError(apiErr) {
        console.log("onAdminOrganizationAttachmentDetailError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminOrganizationAttachmentDetailError: Delayed for 2 seconds.");
            console.log("onAdminOrganizationAttachmentDetailError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminOrganizationAttachmentDetailDone() {
        console.log("onAdminOrganizationAttachmentDetailDone: Starting...");
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
                onAdminOrganizationAttachmentDetailSuccess,
                onAdminOrganizationAttachmentDetailError,
                onAdminOrganizationAttachmentDetailDone
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
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                            <li class=""><Link to="/admin/organizations" aria-current="page"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organizations</Link></li>
                            <li class=""><Link to={`/admin/organization/${id}/attachments`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Attachments)</Link></li>
                            <li class=""><Link to={`/admin/organization/${id}/attachment/${aid}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faFile} />&nbsp;Attachment</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-2"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit Attachment</p>

                        {/* <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
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
                                            <Link to={`/admin/organization/${id}/attachment/${aid}`} class="button is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link to={`/admin/organization/${id}/attachment/${aid}`} class="button is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
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

export default AdminOrganizationAttachmentUpdate;
