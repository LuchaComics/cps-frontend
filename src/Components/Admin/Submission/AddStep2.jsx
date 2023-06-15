import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faGauge, faUsers, faEye, faBook, faMagnifyingGlass, faBalanceScale, faUser, faCogs } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { postSubmissionCreateAPI } from "../../../API/submission";
import { getOrganizationSelectOptionListAPI } from "../../../API/organization";
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
    CPS_PERCENTAGE_GRADE_WITH_EMPTY_OPTIONS,
    ISSUE_COVER_YEAR_OPTIONS,
    ISSUE_COVER_MONTH_WITH_EMPTY_OPTIONS,
    USER_STATE_WITH_EMPTY_OPTIONS
} from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminSubmissionAddStep2() {
    ////
    //// URL Parameters.
    ////

    const [searchParams] = useSearchParams(); // Special thanks via https://stackoverflow.com/a/65451140
    const userID = searchParams.get("user_id");
    const userName = searchParams.get("user_name");

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
    const [issueCoverYear, setIssueCoverYear] = useState(0);
    const [issueCoverMonth, setIssueCoverMonth] = useState(0);
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
    const [specialNotes, setSpecialNotes] = useState("");
    const [gradingNotes, setGradingNotes] = useState("");
    const [showsSignsOfTamperingOrRestoration, setShowsSignsOfTamperingOrRestoration] = useState("");
    const [showCancelWarning, setShowCancelWarning] = useState(false);
    const [status, setStatus] = useState(0);
    const [organizationSelectOptions, setOrganizationSelectOptions] = useState([]);
    const [organizationID, setOrganizationID] = useState("");
    const [serviceType, setServiceType] = useState(0);

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        console.log("onSubmitClick: Generating payload for submission.");
        setFetching(true);

        // Generate the payload.
        const submission = {
            seriesTitle: seriesTitle,
            issueVol: issueVol,
            issueNo: issueNo,
            issueCoverYear: issueCoverYear,
            issueCoverMonth: issueCoverMonth,
            publisherName: publisherName,
            publisherNameOther: publisherNameOther,
            specialNotes: specialNotes,
            gradingNotes: gradingNotes,
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
            status: status,
            serviceType: serviceType,
            organizationID: organizationID,
        };

        console.log("onSubmitClick: Attaching user identification.");
        if (userID !== undefined && userID !== null && userID !== "") {
            submission.UserID = userID;
        }

        // Submit to the backend.
        console.log("onSubmitClick: payload:", submission);
        postSubmissionCreateAPI(
            submission,
            onSubmissionCreateSuccess,
            onSubmissionCreateError,
            onSubmissionCreateDone
        );
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
        if (userName !== null) {
            urlParams += "?user_id=" + userID + "&user_name=" + userName;
        }

        // Redirect the user to a new page.
        setForceURL("/admin/submissions/add/"+response.id+"/confirmation"+urlParams);
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
            let params = new Map();
            getOrganizationSelectOptionListAPI(
                params,
                onOrganizationOptionListSuccess,
                onOrganizationOptionListError,
                onOrganizationOptionListDone
            );
            setFetching(true);
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
                       {userName === null
                           ?
                            <ul>
                                <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                                <li class=""><Link to="/admin/submissions" aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
                                <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add</Link></li>
                            </ul>
                            :
                            <ul>
                                <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                                <li class=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Users</Link></li>
                                <li class=""><Link to={`/admin/user/${userID}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                                <li class=""><Link to={`/admin/user/${userID}/sub`} aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
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
                                    {userName === null
                                        ?
                                        <Link class="button is-medium is-success" to={`/admin/submissions/add/search`}>Yes</Link>
                                        :
                                        <Link class="button is-medium is-success" to={`/admin/user/${userID}/sub`}>Yes</Link>
                                    }
                                    <button class="button is-medium " onClick={(e)=>setShowCancelWarning(false)}>No</button>
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
                            <hr />
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

                            <FormSelectField
                                label="Issue Cover Year"
                                name="issueCoverYear"
                                placeholder="Issue Cover Year"
                                selectedValue={issueCoverYear}
                                errorText={errors && errors.issueCoverYear}
                                helpText=""
                                onChange={(e)=>setIssueCoverYear(parseInt(e.target.value))}
                                options={ISSUE_COVER_YEAR_OPTIONS}
                                isRequired={true}
                                maxWidth="110px"
                            />

                            {issueCoverYear !== 0 && issueCoverYear !== 1 && <FormSelectField
                                label="Issue Cover Month"
                                name="issueCoverMonth"
                                placeholder="Issue Cover Month"
                                selectedValue={issueCoverMonth}
                                errorText={errors && errors.issueCoverMonth}
                                helpText=""
                                onChange={(e)=>setIssueCoverMonth(parseInt(e.target.value))}
                                options={ISSUE_COVER_MONTH_WITH_EMPTY_OPTIONS}
                                isRequired={true}
                                maxWidth="110px"
                            />}

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

                            <FormTextareaField
                                label="Special Note (Optional)"
                                name="specialNotes"
                                placeholder="Text input"
                                value={specialNotes}
                                errorText={errors && errors.specialNotesLine1}
                                helpText=""
                                onChange={(e)=>setSpecialNotes(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 638 characters"}
                                rows={4}
                            />

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faMagnifyingGlass} />&nbsp;Summary of Findings</p>
                            <hr />

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

                            <FormTextareaField
                                label="Grading Notes"
                                name="gradingNotes"
                                placeholder="Text input"
                                value={gradingNotes}
                                errorText={errors && errors.gradingNotes}
                                helpText=""
                                onChange={(e)=>setGradingNotes(e.target.value)}
                                isRequired={true}
                                maxWidth="280px"
                                helpText={"Max 638 characters"}
                                rows={4}
                            />

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faBalanceScale} />&nbsp;Grading</p>
                            <hr />

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

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Settings</p>
                            <hr />

                            <FormSelectField
                                label="Organization ID"
                                name="organizationID"
                                placeholder="Pick"
                                selectedValue={organizationID}
                                errorText={errors && errors.organizationID}
                                helpText="Pick the organization this user belongs to and will be limited by"
                                isRequired={true}
                                onChange={(e)=>setOrganizationID(e.target.value)}
                                options={organizationSelectOptions}
                                disabled={organizationSelectOptions.length === 0}
                            />
                            <FormRadioField
                                label="Service Type"
                                name="role"
                                value={serviceType}
                                opt1Value={1}
                                opt1Label="Pre-Screening Service"
                                opt2Value={3}
                                opt2Label="Pedigree Service"
                                opt3Value={3}
                                opt3Label="CPS Capsule You Grade Service"
                                errorText={errors && errors.serviceType}
                                onChange={(e)=>setServiceType(parseInt(e.target.value))}
                                maxWidth="180px"
                            />
                            <FormRadioField
                                label="Status"
                                name="status"
                                value={status}
                                opt1Value={1}
                                opt1Label="Pending"
                                opt2Value={2}
                                opt2Label="Active"
                                opt3Value={3}
                                opt3Label="Error"
                                opt4Value={4}
                                opt4Label="Archived"
                                errorText={errors && errors.status}
                                onChange={(e)=>setStatus(parseInt(e.target.value))}
                                maxWidth="180px"
                            />

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

export default AdminSubmissionAddStep2;
