import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { postSubmissionCreateAPI } from "../../../API/submission";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import { FINDING_OPTIONS } from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function RetailerSubmissionAddStep1() {
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
    const [seriesTitle, setSeriesTitle] = useState("");
    const [issueVol, setIssueVol] = useState("");
    const [issueNo, setIssueNo] = useState("");
    const [issueCoverDate, setIssueCoverDate] = useState("");
    const [publisherName, setPublisherName] = useState("");
    const [creasesFinding, setCreasesFinding] = useState("");
    const [tearsFinding, setTearsFinding] = useState("");
    const [missingPartsFinding, setMissingPartsFinding] = useState("");
    const [stainsFinding, setStainsFinding] = useState("");
    const [distortionFinding, setDistortionFinding] = useState("");
    const [paperQualityFinding, setPaperQualityFinding] = useState("");
    const [spineFinding, setSpineFinding] = useState("");
    const [coverFinding, setCoverFinding] = useState("");
    const [overallLetterGrade, setOverallLetterGrade] = useState("");

    ////
    //// Event handling.
    ////

    const onSeriesTitleChange = (e) => {
        setSeriesTitle(e.target.value);
    }

    const onIssueVolChange = (e) => {
        setIssueVol(e.target.value);
    }

    const onIssueNoChange = (e) => {
        setIssueNo(e.target.value);
    }

    const onIssueCoverDateChange = (e) => {
        setIssueCoverDate(e.target.value);
    }

    const onPublisherNameChange = (e) => {
        setPublisherName(e.target.value);
    }

    const onCreasesFindingChange = (e) => {
        setCreasesFinding(e.target.value);
    }

    const onTearsFindingChange = (e) => {
        setTearsFinding(e.target.value);
    }

    const onMissingPartsFindingChange = (e) => {
        setMissingPartsFinding(e.target.value);
    }

    const onStainsFindingdChange = (e) => {
        setStainsFinding(e.target.value);
    }

    const onStainsFindingChange = (e) => {
        setStainsFinding(e.target.value);
    }

    const onDistortionFindingChange = (e) => {
        setDistortionFinding(e.target.value);
    }

    const onPaperQualityFindingChange = (e) => {
        setPaperQualityFinding(e.target.value);
    }

    const onSpineFindingChange = (e) => {
        setSpineFinding(e.target.value);
    }

    const onCoverFindingChange = (e) => {
        setCoverFinding(e.target.value);
    }

    const onOverallLetterGradeChange = (e) => {
        setOverallLetterGrade(e.target.value);
    }

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        const submission = {
            SeriesTitle: seriesTitle,
            IssueVol: issueVol,
            IssueNo: issueNo,
            IssueCoverDate: issueCoverDate,
            PublisherName: publisherName,
            CreasesFinding: creasesFinding,
            TearsFinding: tearsFinding,
            MissingPartsFinding: missingPartsFinding,
            StainsFinding: stainsFinding,
            DistortionFinding: distortionFinding,
            PaperQualityFinding: paperQualityFinding,
            SpineFinding: spineFinding,
            CoverFinding: coverFinding,
            OverallLetterGrade: overallLetterGrade,
        };
        console.log("onSubmitClick, submission:", submission);
        postSubmissionCreateAPI(submission, onSubmissionCreateSuccess, onSubmissionCreateError, onSubmissionCreateDone);
    }

    ////
    //// API.
    ////

    function onSubmissionCreateSuccess(response){
        // For debugging purposes only.
        console.log("onSubmissionCreateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Submission created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onSubmissionCreateSuccess: Delayed for 2 seconds.");
            console.log("onSubmissionCreateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/submissions/add/"+response.id+"/confirmation");
    }

    function onSubmissionCreateError(apiErr) {
        console.log("onSubmissionCreateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onSubmissionCreateError: Delayed for 2 seconds.");
            console.log("onSubmissionCreateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onSubmissionCreateDone() {
        console.log("onSubmissionCreateDone: Starting...");
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
                            <li class=""><Link to="/submissions" aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add</Link></li>
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
                            <FormInputField
                                label="Series Title"
                                name="seriesTitle"
                                placeholder="Text input"
                                value={seriesTitle}
                                errorText={errors && errors.seriesTitle}
                                helpText=""
                                onChange={onSeriesTitleChange}
                                isRequired={true}
                                maxWidth="380px"
                            />

                            <FormInputField
                                label="Issue Vol"
                                name="issueVol"
                                placeholder="Text input"
                                value={issueVol}
                                errorText={errors && errors.issueVol}
                                helpText=""
                                onChange={onIssueVolChange}
                                isRequired={true}
                                maxWidth="180px"
                            />

                            <FormInputField
                                label="Issue No"
                                name="issueNo"
                                placeholder="Text input"
                                value={issueNo}
                                errorText={errors && errors.issueNo}
                                helpText=""
                                onChange={onIssueNoChange}
                                isRequired={true}
                                maxWidth="180px"
                            />

                            <FormInputField
                                label="Issue Cover Date"
                                name="issueCoverDate"
                                placeholder="Text input"
                                value={issueCoverDate}
                                errorText={errors && errors.issueCoverDate}
                                helpText=""
                                onChange={onIssueCoverDateChange}
                                isRequired={true}
                                maxWidth="180px"
                            />

                            <FormInputField
                                label="Publisher Name"
                                name="publisherName"
                                placeholder="Text input"
                                value={publisherName}
                                errorText={errors && errors.publisherName}
                                helpText=""
                                onChange={onPublisherNameChange}
                                isRequired={true}
                                maxWidth="280px"
                            />

                            <FormRadioField
                                label="Creases Finding"
                                name="creasesFinding"
                                value={creasesFinding}
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
                                errorText={errors && errors.creasesFinding}
                                onChange={onCreasesFindingChange}
                                maxWidth="180px"
                            />

                            <FormRadioField
                                label="Tears Finding"
                                name="tearsFinding"
                                value={tearsFinding}
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
                                errorText={errors && errors.tearsFinding}
                                onChange={onTearsFindingChange}
                                maxWidth="180px"
                            />

                            <FormRadioField
                                label="Missing Parts Finding"
                                name="missingPartsFinding"
                                value={missingPartsFinding}
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
                                errorText={errors && errors.missingPartsFinding}
                                onChange={onMissingPartsFindingChange}
                                maxWidth="180px"
                            />

                            <FormRadioField
                                label="Stains Finding"
                                name="stainsFinding"
                                value={stainsFinding}
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
                                errorText={errors && errors.stainsFinding}
                                onChange={onStainsFindingChange}
                                maxWidth="180px"
                            />

                            <FormRadioField
                                label="Distortion Finding"
                                name="distortionFinding"
                                value={distortionFinding}
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
                                errorText={errors && errors.distortionFinding}
                                onChange={onDistortionFindingChange}
                                maxWidth="180px"
                            />

                            <FormRadioField
                                label="Paper Quality Finding"
                                name="paperQualityFinding"
                                value={paperQualityFinding}
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
                                errorText={errors && errors.paperQualityFinding}
                                onChange={onPaperQualityFindingChange}
                                maxWidth="180px"
                            />

                            <FormRadioField
                                label="Spine Finding"
                                name="spineFinding"
                                value={spineFinding}
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
                                errorText={errors && errors.spineFinding}
                                onChange={onSpineFindingChange}
                                maxWidth="180px"
                            />

                            <FormRadioField
                                label="Cover Finding"
                                name="coverFinding"
                                value={coverFinding}
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
                                errorText={errors && errors.coverFinding}
                                onChange={onCoverFindingChange}
                                maxWidth="180px"
                            />

                            <FormSelectField
                                label="Overall Letter Grade"
                                name="overallLetterGrade"
                                placeholder="Overall Letter Grade"
                                selectedValue={overallLetterGrade}
                                errorText={errors && errors.overallLetterGrade}
                                helpText=""
                                onChange={onOverallLetterGradeChange}
                                options={FINDING_OPTIONS}
                            />


                            <div class="columns">
                                <div class="column is-half">
                                    <Link to={`/submissions`} class="button is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link to={`/submissions`} class="button is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                </div>
                                <div class="column is-half has-text-right">
                                    <button class="button is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                    <button class="button is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                </div>
                            </div>

                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerSubmissionAddStep1;
