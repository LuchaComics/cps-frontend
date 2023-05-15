import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faEye, faArrowLeft, faCheckCircle, faPencil } from '@fortawesome/free-solid-svg-icons'
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


function RetailerSubmissionDetail() {
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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-3"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submission</p>
                        <FormErrorBox errors={errors} />

                        <p class="subtitle is-4">Details</p>

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

                        {!isFetching && <div class="container">
                            {submission && <FormInputField
                                label="Series Title"
                                name="seriesTitle"
                                placeholder="Text input"
                                value={submission.seriesTitle}
                                helpText=""
                                isRequired={true}
                                maxWidth="380px"
                                disabled={true}
                            />}

                            {submission && <FormInputField
                                label="Issue Vol"
                                name="issueVol"
                                placeholder="Text input"
                                value={submission.issueVol}
                                helpText=""
                                isRequired={true}
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormInputField
                                label="Issue No"
                                name="issueNo"
                                placeholder="Text input"
                                value={submission.issueNo}
                                helpText=""
                                isRequired={true}
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormInputField
                                label="Issue Cover Date"
                                name="issueCoverDate"
                                placeholder="Text input"
                                value={submission.issueCoverDate}
                                helpText=""
                                isRequired={true}
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormRadioField
                                label="Creases Finding"
                                name="creasesFinding"
                                value={submission.creasesFinding}
                                opt1Value="pr"
                                opt1Label="Poor"
                                opt2Value="fr"
                                opt2Label="Fair"
                                opt3Value="gd"
                                opt3Label="Good"
                                opt4Value="vg"
                                opt4Label="Very good"
                                opt5Value="fn"
                                opt5Label="Fine"
                                opt6Value="vf"
                                opt6Label="Very Fine"
                                opt7Value="nm"
                                opt7Label="Near Mint"
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormRadioField
                                label="Tears Finding"
                                name="tearsFinding"
                                value={submission.tearsFinding}
                                opt1Value="pr"
                                opt1Label="Poor"
                                opt2Value="fr"
                                opt2Label="Fair"
                                opt3Value="gd"
                                opt3Label="Good"
                                opt4Value="vg"
                                opt4Label="Very good"
                                opt5Value="fn"
                                opt5Label="Fine"
                                opt6Value="vf"
                                opt6Label="Very Fine"
                                opt7Value="nm"
                                opt7Label="Near Mint"
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormRadioField
                                label="Missing Parts Finding"
                                name="missingPartsFinding"
                                value={submission.missingPartsFinding}
                                opt1Value="pr"
                                opt1Label="Poor"
                                opt2Value="fr"
                                opt2Label="Fair"
                                opt3Value="gd"
                                opt3Label="Good"
                                opt4Value="vg"
                                opt4Label="Very good"
                                opt5Value="fn"
                                opt5Label="Fine"
                                opt6Value="vf"
                                opt6Label="Very Fine"
                                opt7Value="nm"
                                opt7Label="Near Mint"
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormRadioField
                                label="Stains Finding"
                                name="stainsFinding"
                                value={submission.stainsFinding}
                                opt1Value="pr"
                                opt1Label="Poor"
                                opt2Value="fr"
                                opt2Label="Fair"
                                opt3Value="gd"
                                opt3Label="Good"
                                opt4Value="vg"
                                opt4Label="Very good"
                                opt5Value="fn"
                                opt5Label="Fine"
                                opt6Value="vf"
                                opt6Label="Very Fine"
                                opt7Value="nm"
                                opt7Label="Near Mint"
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormRadioField
                                label="Distortion Finding"
                                name="distortionFinding"
                                value={submission.distortionFinding}
                                opt1Value="pr"
                                opt1Label="Poor"
                                opt2Value="fr"
                                opt2Label="Fair"
                                opt3Value="gd"
                                opt3Label="Good"
                                opt4Value="vg"
                                opt4Label="Very good"
                                opt5Value="fn"
                                opt5Label="Fine"
                                opt6Value="vf"
                                opt6Label="Very Fine"
                                opt7Value="nm"
                                opt7Label="Near Mint"
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormRadioField
                                label="Paper Quality Finding"
                                name="paperQualityFinding"
                                value={submission.paperQualityFinding}
                                opt1Value="pr"
                                opt1Label="Poor"
                                opt2Value="fr"
                                opt2Label="Fair"
                                opt3Value="gd"
                                opt3Label="Good"
                                opt4Value="vg"
                                opt4Label="Very good"
                                opt5Value="fn"
                                opt5Label="Fine"
                                opt6Value="vf"
                                opt6Label="Very Fine"
                                opt7Value="nm"
                                opt7Label="Near Mint"
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormRadioField
                                label="Spine Finding"
                                name="spineFinding"
                                value={submission.spineFinding}
                                opt1Value="pr"
                                opt1Label="Poor"
                                opt2Value="fr"
                                opt2Label="Fair"
                                opt3Value="gd"
                                opt3Label="Good"
                                opt4Value="vg"
                                opt4Label="Very good"
                                opt5Value="fn"
                                opt5Label="Fine"
                                opt6Value="vf"
                                opt6Label="Very Fine"
                                opt7Value="nm"
                                opt7Label="Near Mint"
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormRadioField
                                label="Other Finding"
                                name="otherFinding"
                                value={submission.otherFinding}
                                opt1Value="pr"
                                opt1Label="Poor"
                                opt2Value="fr"
                                opt2Label="Fair"
                                opt3Value="gd"
                                opt3Label="Good"
                                opt4Value="vg"
                                opt4Label="Very good"
                                opt5Value="fn"
                                opt5Label="Fine"
                                opt6Value="vf"
                                opt6Label="Very Fine"
                                opt7Value="nm"
                                opt7Label="Near Mint"
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && submission.otherFinding !== "" &&
                            <FormInputField
                                label="Other Finding (Please specify)"
                                name="otherFindingText"
                                placeholder="Text input"
                                value={submission.otherFindingText}
                                helpText=""
                                isRequired={true}
                                maxWidth="180px"
                                disabled={true}
                            />}

                            {submission && <FormSelectField
                                label="Overall Letter Grade"
                                name="overallLetterGrade"
                                placeholder="Overall Letter Grade"
                                selectedValue={submission.overallLetterGrade}
                                helpText=""
                                options={FINDING_OPTIONS}
                                disabled={true}
                            />}


                            <div class="columns">
                                <div class="column is-half">
                                    <Link to={`/submissions`} class="button is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link to={`/submissions`} class="button is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                </div>
                                <div class="column is-half has-text-right">
                                    <Link to={`/submission/${id}/edit`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                    <Link to={`/submission/${id}/edit`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                </div>
                            </div>

                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerSubmissionDetail;
