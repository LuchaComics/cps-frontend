import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faPencil, faEye, faGauge, faBook, faMagnifyingGlass, faBalanceScale, } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { DateTime } from "luxon";

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getSubmissionDetailAPI, putSubmissionUpdateAPI } from "../../../API/submission";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import FormDateField from "../../Element/FormDateField";
import {
    FINDING_OPTIONS,
    OVERALL_NUMBER_GRADE_OPTIONS,
    PUBLISHER_NAME_OPTIONS,
    CPS_PERCENTAGE_GRADE_OPTIONS
} from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function RetailerSubmissionUpdateForSubmission() {
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
    const [seriesTitle, setSeriesTitle] = useState("");
    const [issueVol, setIssueVol] = useState("");
    const [issueNo, setIssueNo] = useState("");
    const [issueCoverDate, setIssueCoverDate] = useState(null);
    const [publisherName, setPublisherName] = useState(0);
    const [publisherNameOther, setPublisherNameOther] = useState("");
    const [creasesFinding, setCreasesFinding] = useState("");
    const [tearsFinding, setTearsFinding] = useState("");
    const [missingPartsFinding, setMissingPartsFinding] = useState("");
    const [stainsFinding, setStainsFinding] = useState("");
    const [distortionFinding, setDistortionFinding] = useState("");
    const [paperQualityFinding, setPaperQualityFinding] = useState("");
    const [spineFinding, setSpineFinding] = useState("");
    const [coverFinding, setCoverFinding] = useState("");
    const [gradingScale, setGradingScale] = useState(0);
    const [overallLetterGrade, setOverallLetterGrade] = useState("");
    const [overallNumberGrade, setOverallNumberGrade] = useState("");
    const [cpsPercentageGrade, setCpsPercentageGrade] = useState("");
    const [specialNotesLine1, setSpecialNotesLine1] = useState("");
    const [specialNotesLine2, setSpecialNotesLine2] = useState("");
    const [specialNotesLine3, setSpecialNotesLine3] = useState("");
    const [specialNotesLine4, setSpecialNotesLine4] = useState("");
    const [specialNotesLine5, setSpecialNotesLine5] = useState("");
    const [gradingNotesLine1, setGradingNotesLine1] = useState("");
    const [gradingNotesLine2, setGradingNotesLine2] = useState("");
    const [gradingNotesLine3, setGradingNotesLine3] = useState("");
    const [gradingNotesLine4, setGradingNotesLine4] = useState("");
    const [gradingNotesLine5, setGradingNotesLine5] = useState("");
    const [showsSignsOfTamperingOrRestoration, setShowsSignsOfTamperingOrRestoration] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");

        // Generate the payload.
        const submission = {
            id: id,
            seriesTitle: seriesTitle,
            issueVol: issueVol,
            issueNo: issueNo,
            issueCoverDate: issueCoverDate,
            publisherName: publisherName,
            publisherNameOther: publisherNameOther,
            specialNotesLine1: specialNotesLine1,
            specialNotesLine2: specialNotesLine2,
            specialNotesLine3: specialNotesLine3,
            specialNotesLine4: specialNotesLine4,
            specialNotesLine5: specialNotesLine5,
            gradingNotesLine1: gradingNotesLine1,
            gradingNotesLine2: gradingNotesLine2,
            gradingNotesLine3: gradingNotesLine3,
            gradingNotesLine4: gradingNotesLine4,
            gradingNotesLine5: gradingNotesLine5,
            creasesFinding: creasesFinding,
            tearsFinding: tearsFinding,
            missingPartsFinding: missingPartsFinding,
            stainsFinding: stainsFinding,
            distortionFinding: distortionFinding,
            paperQualityFinding: paperQualityFinding,
            spineFinding: spineFinding,
            coverFinding: coverFinding,
            gradingScale: parseInt(gradingScale),
            overallLetterGrade: overallLetterGrade,
            overallNumberGrade: parseFloat(overallNumberGrade),
            cpsPercentageGrade: parseFloat(cpsPercentageGrade),
            showsSignsOfTamperingOrRestoration: parseInt(showsSignsOfTamperingOrRestoration),
        };

        // Submit to the backend.
        console.log("onSubmitClick, submission:", submission);
        putSubmissionUpdateAPI(submission, onSubmissionUpdateSuccess, onSubmissionUpdateError, onSubmissionUpdateDone);
    }

    ////
    //// API.
    ////

    function onSubmissionDetailSuccess(response){
        console.log("onSubmissionDetailSuccess: Starting...");
        setSeriesTitle(response.seriesTitle);
        setIssueVol(response.issueVol);
        setIssueNo(response.issueNo);
        setIssueCoverDate(response.issueCoverDate);
        setPublisherName(response.publisherName);
        setPublisherNameOther(response.publisherNameOther);
        setCreasesFinding(response.creasesFinding);
        setTearsFinding(response.tearsFinding);
        setMissingPartsFinding(response.missingPartsFinding);
        setStainsFinding(response.stainsFinding);
        setDistortionFinding(response.distortionFinding);
        setPaperQualityFinding(response.paperQualityFinding);
        setSpineFinding(response.spineFinding);
        setCoverFinding(response.coverFinding);
        setGradingScale(parseInt(response.gradingScale));
        setOverallLetterGrade(response.overallLetterGrade);
        setOverallNumberGrade(response.overallNumberGrade);
        setSpecialNotesLine1(response.specialNotesLine1);
        setSpecialNotesLine2(response.specialNotesLine2);
        setSpecialNotesLine3(response.specialNotesLine3);
        setSpecialNotesLine4(response.specialNotesLine4);
        setSpecialNotesLine5(response.specialNotesLine5);
        setShowsSignsOfTamperingOrRestoration(response.showsSignsOfTamperingOrRestoration);
        setGradingNotesLine1(response.gradingNotesLine1);
        setGradingNotesLine2(response.gradingNotesLine2);
        setGradingNotesLine3(response.gradingNotesLine3);
        setGradingNotesLine4(response.gradingNotesLine4);
        setGradingNotesLine5(response.gradingNotesLine5);

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
                            <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/submissions" aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
                            <li class=""><Link to={`/submission/${id}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Update (Submission)</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-2"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submission</p>
                        <FormErrorBox errors={errors} />

                        <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p>

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

                        {!isFetching && <div class="container">

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faBook} />&nbsp;Comic Book Information</p>

                            <FormInputField
                                label="Series Title"
                                name="seriesTitle"
                                placeholder="Text input"
                                value={seriesTitle}
                                errorText={errors && errors.seriesTitle}
                                helpText=""
                                onChange={(e)=>setSeriesTitle(e.target.value)}
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
                                onChange={(e)=>setIssueVol(e.target.value)}
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
                                onChange={(e)=>setIssueNo(e.target.value)}
                                isRequired={true}
                                maxWidth="180px"
                            />

                            <FormDateField
                                label="Issue Cover Date"
                                name="issueCoverDate"
                                placeholder="Text input"
                                value={issueCoverDate}
                                errorText={errors && errors.issueCoverDate}
                                helpText=""
                                onChange={setIssueCoverDate}
                                isRequired={true}
                                maxWidth="110px"
                            />

                            <FormSelectField
                                label="Publisher Name"
                                name="publisherName"
                                placeholder="Publisher Name"
                                selectedValue={publisherName}
                                errorText={errors && errors.publisherName}
                                helpText=""
                                onChange={(e)=>setPublisherName(parseInt(e.target.value))}
                                options={PUBLISHER_NAME_OPTIONS}
                            />

                            {publisherName === 1 && <FormInputField
                                label="Publisher Name (Other)"
                                name="publisherNameOther"
                                placeholder="Text input"
                                value={publisherNameOther}
                                errorText={errors && errors.publisherNameOther}
                                helpText=""
                                onChange={(e)=>setPublisherNameOther(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                            />}

                            <FormInputField
                                label="Special Note - Line 1 (Optional)"
                                name="specialNotesLine1"
                                placeholder="Text input"
                                value={specialNotesLine1}
                                errorText={errors && errors.specialNotesLine1}
                                helpText=""
                                onChange={(e)=>setSpecialNotesLine1(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                            />

                            <FormInputField
                                label="Special Note - Line 2 (Optional)"
                                name="specialNotesLine2"
                                placeholder="Text input"
                                value={specialNotesLine2}
                                errorText={errors && errors.specialNotesLine2}
                                helpText=""
                                onChange={(e)=>setSpecialNotesLine2(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                            />

                            <FormInputField
                                label="Special Note - Line 3 (Optional)"
                                name="specialNotesLine3"
                                placeholder="Text input"
                                value={specialNotesLine3}
                                errorText={errors && errors.specialNotesLine3}
                                helpText=""
                                onChange={(e)=>setSpecialNotesLine3(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                            />

                            <FormInputField
                                label="Special Note - Line 4 (Optional)"
                                name="specialNotesLine4"
                                placeholder="Text input"
                                value={specialNotesLine4}
                                errorText={errors && errors.specialNotesLine4}
                                helpText=""
                                onChange={(e)=>setSpecialNotesLine4(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                            />

                            <FormInputField
                                label="Special Note - Line 5 (Optional)"
                                name="specialNotesLine5"
                                placeholder="Text input"
                                value={specialNotesLine5}
                                errorText={errors && errors.specialNotesLine5}
                                helpText=""
                                onChange={(e)=>setSpecialNotesLine5(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                            />

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faMagnifyingGlass} />&nbsp;Summary of Findings</p>

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
                                onChange={(e)=>setCreasesFinding(e.target.value)}
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
                                onChange={(e)=>setTearsFinding(e.target.value)}
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
                                onChange={(e)=>setMissingPartsFinding(e.target.value)}
                                maxWidth="180px"
                            />

                            <FormRadioField
                                label="Stains/Marks/Substances"
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
                                onChange={(e)=>setStainsFinding(e.target.value)}
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
                                onChange={(e)=>setDistortionFinding(e.target.value)}
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
                                onChange={(e)=>setPaperQualityFinding(e.target.value)}
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
                                onChange={(e)=>setSpineFinding(e.target.value)}
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
                                onChange={(e)=>setCoverFinding(e.target.value)}
                                maxWidth="180px"
                            />

                            <FormRadioField
                                label="Shows signs of tampering/restoration"
                                name="showsSignsOfTamperingOrRestoration"
                                value={showsSignsOfTamperingOrRestoration}
                                opt1Value={"2"}
                                opt1Label="No"
                                opt2Value={"1"}
                                opt2Label="Yes"
                                errorText={errors && errors.showsSignsOfTamperingOrRestoration}
                                onChange={(e)=>setShowsSignsOfTamperingOrRestoration(e.target.value)}
                                maxWidth="180px"
                            />

                            <FormInputField
                                label="Grading Note - Line 1 (Optional)"
                                name="gradingNotesLine1"
                                placeholder="Text input"
                                value={gradingNotesLine1}
                                errorText={errors && errors.gradingNotesLine1}
                                helpText=""
                                onChange={(e)=>setGradingNotesLine1(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                            />

                            <FormInputField
                                label="Grading Note - Line 2 (Optional)"
                                name="gradingNotesLine2"
                                placeholder="Text input"
                                value={gradingNotesLine2}
                                errorText={errors && errors.gradingNotesLine2}
                                helpText=""
                                onChange={(e)=>setGradingNotesLine2(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                            />

                            <FormInputField
                                label="Grading Note - Line 3 (Optional)"
                                name="gradingNotesLine3"
                                placeholder="Text input"
                                value={gradingNotesLine3}
                                errorText={errors && errors.gradingNotesLine3}
                                helpText=""
                                onChange={(e)=>setGradingNotesLine3(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                            />

                            <FormInputField
                                label="Grading Note - Line 4 (Optional)"
                                name="gradingNotesLine4"
                                placeholder="Text input"
                                value={gradingNotesLine4}
                                errorText={errors && errors.gradingNotesLine4}
                                helpText=""
                                onChange={(e)=>setGradingNotesLine4(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                            />

                            <FormInputField
                                label="Grading Note - Line 5 (Optional)"
                                name="gradingNotesLine5"
                                placeholder="Text input"
                                value={gradingNotesLine5}
                                errorText={errors && errors.gradingNotesLine5}
                                helpText=""
                                onChange={(e)=>setGradingNotesLine5(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 35 characters"}
                            />

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faBalanceScale} />&nbsp;Grading</p>

                            <FormRadioField
                                label="Which type of grading scale would you prefer?"
                                name="gradingScale"
                                value={gradingScale}
                                opt1Value={1}
                                opt1Label="Letter Grade (Poor-Near Mint)"
                                opt2Value={2}
                                opt2Label="Numbers (0.5-10.0)"
                                opt3Value={3}
                                opt3Label="CPS Percentage (5%-100%)"
                                errorText={errors && errors.gradingScale}
                                onChange={(e)=>setGradingScale(parseInt(e.target.value))}
                                maxWidth="180px"
                            />

                            {gradingScale === 1 && <FormSelectField
                                label="Overall Letter Grade"
                                name="overallLetterGrade"
                                placeholder="Overall Letter Grade"
                                selectedValue={overallLetterGrade}
                                errorText={errors && errors.overallLetterGrade}
                                helpText=""
                                onChange={(e)=>setOverallLetterGrade(e.target.value)}
                                options={FINDING_OPTIONS}
                            />}
                            {gradingScale === 2 && <FormSelectField
                                label="Overall Number Grade"
                                name="overallNumberGrade"
                                placeholder="Overall Grade"
                                selectedValue={overallNumberGrade}
                                errorText={errors && errors.overallNumberGrade}
                                helpText=""
                                onChange={(e)=>setOverallNumberGrade(e.target.value)}
                                options={OVERALL_NUMBER_GRADE_OPTIONS}
                            />}
                            {gradingScale === 3 && <FormSelectField
                                label="CPS Percentage Grade"
                                name="cpsPercentageGrade"
                                placeholder="CPS Percentage Grade"
                                selectedValue={cpsPercentageGrade}
                                errorText={errors && errors.cpsPercentageGrade}
                                helpText=""
                                onChange={(e)=>setCpsPercentageGrade(e.target.value)}
                                options={CPS_PERCENTAGE_GRADE_OPTIONS}
                            />}
                            <div class="columns pt-5">
                                <div class="column is-half">
                                    <Link to={`/submission/${id}`} class="button is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    <Link to={`/submission/${id}`} class="button is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
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

export default RetailerSubmissionUpdateForSubmission;
