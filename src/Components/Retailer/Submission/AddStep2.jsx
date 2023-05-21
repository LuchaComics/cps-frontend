import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faDownload, faArrowLeft, faCheckCircle, faCheck } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getSubmissionDetailAPI } from "../../../API/submission";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import { FINDING_OPTIONS } from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function RetailerSubmissionAddStep2() {
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
    const [submission, setSubmission] = useState({});

    ////
    //// Event handling.
    ////


    ////
    //// API.
    ////

    function onSubmissionDetailSuccess(response){
        console.log("onSubmissionDetailSuccess: Starting...");
        setSubmission(response);
    }

    function onSubmissionDetailError(apiErr) {
        console.log("onSubmissionDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onSubmissionDetailDone() {
        console.log("onSubmissionDetailDone: Starting...");
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
            getSubmissionDetailAPI(
                id,
                onSubmissionDetailSuccess,
                onSubmissionDetailError,
                onSubmissionDetailDone
            );
        }

        return () => { mounted = false; }
    }, [id]);

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
                            <li class=""><Link to="/submissions" aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add</Link></li>
                        </ul>
                    </nav>

                    <nav class="box">
                        <p class="title is-3"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submission - Confirmation</p>
                        <FormErrorBox errors={errors} />


                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

                        {!isFetching && <div class="container">

                            <article class="message is-success">
                                <div class="message-body">
                                <p><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;PDF is ready for download.</p>
                                </div>
                            </article>
                            <article>
                                <p>
                                We're excited to inform you that your PDF is now ready for download. Simply click the provided link, and you'll have access to your PDF file.
                                </p>
                                <div class="column is-half">
                                    <a href={submission.fileUploadDownloadableFileURL} target="_blank" rel="noreferrer" class="button is-success is-hidden-touch"><FontAwesomeIcon className="fas" icon={faDownload} />&nbsp;Download PDF</a>
                                    <a href={submission.fileUploadDownloadableFileURL} target="_blank" rel="noreferrer" class="button is-success is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faDownload} />&nbsp;Download PDF</a>
                                </div>
                                <p class="pb-3">Once you've downloaded the PDF, we kindly request that you sign it with your signature. This adds a personal touch and ensures the authenticity of the document.</p>

                                <p class="pb-3">After signing, we ask you to attach the signed PDF to the comic book you wish to have encapsulated. Safely packaging your comic book helps protect it during transit and ensures its safe arrival at our facility.</p>

                                <p class="pb-3">Next, please send the encapsulation order, including the signed PDF and your comic book, to the address provided below:</p>

                                <article class="message pb-3" style={{width:"300px"}}>
                                  <div class="message-body">
                                  <p class="pb-1">[Sample Address]</p>
                                  <p class="pb-1">1234 Comic Street</p>
                                  <p class="pb-1">Cityville, State 56789</p>
                                  <p class="pb-1">United States</p>
                                  </div>
                                </article>

                                <p class="pb-3">Once completed, please wait a few weeks for us to receive and process your request.</p>
                            </article>

                            <div class="columns">
                                <div class="column is-half">
                                </div>
                                <div class="column is-half has-text-right">
                                    <Link to={`/submissions`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Dashboard</Link>
                                    <Link to={`/submissions`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Dashboard</Link>
                                </div>
                            </div>

                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerSubmissionAddStep2;