import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faGauge, faUsers, faEye, faBook, faMagnifyingGlass, faBalanceScale, faUser, } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { postSubmissionCreateAPI } from "../../../API/submission";
import FormErrorBox from "../../Element/FormErrorBox";
import FormInputField from "../../Element/FormInputField";
import FormDateField from "../../Element/FormDateField";
import FormTextareaField from "../../Element/FormTextareaField";
import FormRadioField from "../../Element/FormRadioField";
import FormMultiSelectField from "../../Element/FormMultiSelectField";
import FormSelectField from "../../Element/FormSelectField";
import {
    FINDING_WITH_EMPTY_OPTIONS,
    OVERALL_NUMBER_GRADE_WITH_EMPTY_OPTIONS,
    PUBLISHER_NAME_WITH_EMPTY_OPTIONS,
    CPS_PERCENTAGE_GRADE_WITH_EMPTY_OPTIONS
} from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function RetailerSubmissionAddStep2() {
    ////
    //// URL Parameters.
    ////

    const [searchParams] = useSearchParams(); // Special thanks via https://stackoverflow.com/a/65451140
    const customerID = searchParams.get("customer_id");
    const customerName = searchParams.get("customer_name");

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
    const [showCancelWarning, setShowCancelWarning] = useState(false);

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        console.log("onSubmitClick: Generating payload for submission.");

        // Generate the payload.
        const submission = {
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
            showsSignsOfTamperingOrRestoration: parseInt(showsSignsOfTamperingOrRestoration)
        };

        console.log("onSubmitClick: Attaching customer identification.");
        if (customerID !== undefined && customerID !== null && customerID !== "") {
            submission.UserID = customerID;
        }

        // Submit to the backend.
        console.log("onSubmitClick: payload:", submission);
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

        let urlParams = "";
        if (customerName !== null) {
            urlParams += "?customer_id=" + customerID + "&customer_name=" + customerName;
        }

        // Redirect the user to a new page.
        setForceURL("/submissions/add/"+response.id+"/confirmation"+urlParams);
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
                       {customerName === null
                           ?
                            <ul>
                                <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                                <li class=""><Link to="/submissions" aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
                                <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add</Link></li>
                            </ul>
                            :
                            <ul>
                                <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                                <li class=""><Link to="/customers" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers</Link></li>
                                <li class=""><Link to={`/customer/${customerID}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                                <li class=""><Link to={`/customer/${customerID}/sub`} aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
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
                                    Your submission will be cancelled and your work will be lost. This cannot be undone. Do you want to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    {customerName === null
                                        ?
                                        <Link class="button is-success" to={`/submissions/add/search`}>Yes</Link>
                                        :
                                        <Link class="button is-success" to={`/customer/${customerID}/sub`}>Yes</Link>
                                    }
                                    <button class="button" onClick={(e)=>setShowCancelWarning(false)}>No</button>
                                </footer>
                            </div>
                        </div>

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
                                options={PUBLISHER_NAME_WITH_EMPTY_OPTIONS}
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
                                helpText={"Max 17 characters"}
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
                                helpText={"Max 17 characters"}
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
                                helpText={"Max 17 characters"}
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
                                helpText={"Max 17 characters"}
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
                                helpText={"Max 17 characters"}
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
                                helpText={"Max 17 characters"}
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
                                helpText={"Max 17 characters"}
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
                                helpText={"Max 17 characters"}
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
                                helpText={"Max 17 characters"}
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
                                helpText={"Max 17 characters"}
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
                                options={FINDING_WITH_EMPTY_OPTIONS}
                            />}

                            {gradingScale === 2 && <FormSelectField
                                label="Overall Number Grade"
                                name="overallNumberGrade"
                                placeholder="Overall Number Grade"
                                selectedValue={overallNumberGrade}
                                errorText={errors && errors.overallNumberGrade}
                                helpText=""
                                onChange={(e)=>setOverallNumberGrade(e.target.value)}
                                options={OVERALL_NUMBER_GRADE_WITH_EMPTY_OPTIONS}
                            />}

                            {gradingScale === 3 && <FormSelectField
                                label="CPS Percentage Grade"
                                name="cpsPercentageGrade"
                                placeholder="CPS Percentage Grade"
                                selectedValue={cpsPercentageGrade}
                                errorText={errors && errors.cpsPercentageGrade}
                                helpText=""
                                onChange={(e)=>setCpsPercentageGrade(e.target.value)}
                                options={CPS_PERCENTAGE_GRADE_WITH_EMPTY_OPTIONS}
                            />}

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

                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerSubmissionAddStep2;
