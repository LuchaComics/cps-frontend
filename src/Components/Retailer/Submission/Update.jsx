import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom'

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getSubmissionDetailAPI, putSubmissionUpdateAPI } from "../../../API/submission";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import { FINDING_OPTIONS } from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function RetailerSubmissionUpdate() {
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
    const [serviceType, setServiceType] = useState("");
    const [seriesTitle, setSeriesTitle] = useState("");
    const [issueVol, setIssueVol] = useState("");
    const [issueNo, setIssueNo] = useState("");
    const [issueCoverDate, setIssueCoverDate] = useState("");
    const [creasesFinding, setCreasesFinding] = useState("");
    const [tearsFinding, setTearsFinding] = useState("");
    const [missingPartsFinding, setMissingPartsFinding] = useState("");
    const [stainsFinding, setStainsFinding] = useState("");
    const [distortionFinding, setDistortionFinding] = useState("");
    const [paperQualityFinding, setPaperQualityFinding] = useState("");
    const [spineFinding, setSpineFinding] = useState("");
    const [otherFinding, setOtherFinding] = useState("");
    const [otherFindingText, setOtherFindingText] = useState("");
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

    const onCreasesFindingChange = (e) => {
        setCreasesFinding(e.target.value);
    }

    const onTearsFindingChange = (e) => {
        setTearsFinding(e.target.value);
    }

    const onMissingPartsFindingChange = (e) => {
        setMissingPartsFinding(e.target.value);
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

    const onOtherFindingChange = (e) => {
        setOtherFinding(e.target.value);
    }

    const onOtherFindingTextChange = (e) => {
        setOtherFindingText(e.target.value);
    }

    const onOverallLetterGradeChange = (e) => {
        setOverallLetterGrade(e.target.value);
    }


    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        const submission = {
            ID: id,
            ServiceType: serviceType,
            SeriesTitle: seriesTitle,
            IssueVol: issueVol,
            IssueNo: issueNo,
            IssueCoverDate: issueCoverDate,
            CreasesFinding: creasesFinding,
            TearsFinding: tearsFinding,
            MissingPartsFinding: missingPartsFinding,
            StainsFinding: stainsFinding,
            DistortionFinding: distortionFinding,
            PaperQualityFinding: paperQualityFinding,
            SpineFinding: spineFinding,
            OtherFinding: otherFinding,
            OtherFindingText: otherFindingText,
            OverallLetterGrade: overallLetterGrade,
        };
        console.log("onSubmitClick, submission:", submission);
        putSubmissionUpdateAPI(submission, onSubmissionUpdateSuccess, onSubmissionUpdateError, onSubmissionUpdateDone);
    }

    ////
    //// API.
    ////

    function onSubmissionDetailSuccess(response){
        console.log("onSubmissionDetailSuccess: Starting...");
        setServiceType(response.serviceType);
        setSeriesTitle(response.seriesTitle);
        setIssueVol(response.issueVol);
        setIssueNo(response.issueNo);
        setIssueCoverDate(response.issueCoverDate);
        setCreasesFinding(response.creasesFinding);
        setTearsFinding(response.tearsFinding);
        setMissingPartsFinding(response.missingPartsFinding);
        setStainsFinding(response.stainsFinding);
        setDistortionFinding(response.distortionFinding);
        setPaperQualityFinding(response.paperQualityFinding);
        setSpineFinding(response.spineFinding);
        setOtherFinding(response.otherFinding);
        setOtherFindingText(response.otherFindingText);
        setOverallLetterGrade(response.overallLetterGrade);

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

    function onSubmissionUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onSubmissionUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Submission created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onSubmissionUpdateSuccess: Delayed for 2 seconds.");
            console.log("onSubmissionUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/submission/"+response.id);
    }

    function onSubmissionUpdateError(apiErr) {
        console.log("onSubmissionUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onSubmissionUpdateError: Delayed for 2 seconds.");
            console.log("onSubmissionUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onSubmissionUpdateDone() {
        console.log("onSubmissionUpdateDone: Starting...");
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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Update</Link></li>
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
                                label="Other Finding"
                                name="otherFinding"
                                value={otherFinding}
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
                                errorText={errors && errors.otherFinding}
                                onChange={onOtherFindingChange}
                                maxWidth="180px"
                            />

                            {otherFinding !== "" &&
                            <FormInputField
                                label="Other Finding (Please specify)"
                                name="otherFindingText"
                                placeholder="Text input"
                                value={otherFindingText}
                                errorText={errors && errors.otherFindingText}
                                helpText=""
                                onChange={onOtherFindingTextChange}
                                isRequired={true}
                                maxWidth="180px"
                            />}

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

export default RetailerSubmissionUpdate;
