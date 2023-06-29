import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faBook, faTachometer, faPlus, faTimesCircle, faCheckCircle, faGauge, faUsers, faEye, faCube, faMagnifyingGlass, faBalanceScale, faUser, faCogs, faBookOpen, faNewspaper, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import FormErrorBox from "../../Reusable/FormErrorBox";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminSubmissionPickTypeForAdd() {
    ////
    //// URL Parameters.
    ////

    const [searchParams] = useSearchParams(); // Special thanks via https://stackoverflow.com/a/65451140
    const userID = searchParams.get("user_id");
    const userName = searchParams.get("user_name");
    const orgID = searchParams.get("organization_id");
    // const orgName = searchParams.get("organization_name");

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////


    ////
    //// Event handling.
    ////

    ////
    //// API.
    ////
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

    // Render the JSX content.
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
                                <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Submission</Link></li>
                            </ul>
                            :
                            <ul>
                                <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                                <li class=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Users</Link></li>
                                <li class=""><Link to={`/admin/user/${userID}/sub`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Comic Submissions)</Link></li>
                                <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add</Link></li>
                            </ul>
                        }
                    </nav>
                    <nav class="box">
                        <p class="title is-2"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add Comic Submission</p>
                        <div class="container">

                            <p class="pb-4 has-text-grey">Please select the type of collectible product you would like to submit to CPS.</p>

                            <p class="subtitle is-3"><FontAwesomeIcon className="fas" icon={faCube} />&nbsp;Product Type</p>
                            <hr />

                            <div class="columns pt-5">
                                <div class="column is-half">
                                    <div class="card">
                                        <header class="card-header">
                                            <p class="card-header-title">
                                                <FontAwesomeIcon className="fas" icon={faBookOpen} />&nbsp;Comic Book
                                            </p>
                                            <button class="card-header-icon" aria-label="more options">
                                                <span class="icon">
                                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </header>
                                        <div class="card-content">
                                            <div class="content">
                                                Currently we accept submissions of comics up to 64 pages. Comics must be standard US Golden Age, Silver Age, Bronze Age or Modern Age sizes (no oversize submissions can be processed at this time).
                                            </div>
                                        </div>
                                        <footer class="card-footer">
                                            {userName === null
                                                ?
                                                <Link to={`/admin/submissions/comics/add/search`} class="card-footer-item">Select&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                                :
                                                <Link to={`/admin/submissions/comics/add-comic?user_id=${userID}`} class="card-footer-item">Select&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                            }
                                        </footer>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="card">
                                        <header class="card-header">
                                            <p class="card-header-title">
                                                <FontAwesomeIcon className="fas" icon={faNewspaper} />&nbsp;Card
                                            </p>
                                            <button class="card-header-icon" aria-label="more options">
                                                <span class="icon">
                                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </header>
                                        <div class="card-content">
                                            <div class="content">
                                                Currently we accept of standard size, non-sports cards.
                                            </div>
                                        </div>
                                        <footer class="card-footer">
                                            {/*
                                            <Link to={`/admin/submissions/comics/add-card?user_id=${userID}`} class="card-footer-item">Select&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                            */}
                                            <Link class="card-footer-item"><i>Coming soon</i></Link>

                                        </footer>
                                    </div>
                                </div>
                            </div>


                            <div class="columns pt-5">
                                <div class="column is-half">
                                {userName === null
                                    ?
                                    <>
                                        <Link to={`/admin/submissions/comics`} class="button is-medium is-hidden-touch" ><FontAwesomeIcon className="fas" icon={faTimesCircle} />&nbsp;Cancel</Link>
                                        <Link to={`/admin/submissions/comics`} class="button is-medium is-fullwidth is-hidden-desktop" ><FontAwesomeIcon className="fas" icon={faTimesCircle} />&nbsp;Cancel</Link>
                                    </>
                                    :
                                    <>
                                        <Link to={`/admin/customer/${userID}/comics`} class="button is-medium is-hidden-touch" ><FontAwesomeIcon className="fas" icon={faTimesCircle} />&nbsp;Cancel</Link>
                                        <Link to={`/admin/customer/${userID}/comics`} class="button is-medium is-fullwidth is-hidden-desktop" ><FontAwesomeIcon className="fas" icon={faTimesCircle} />&nbsp;Cancel</Link>
                                    </>
                                }
                                </div>
                                <div class="column is-half has-text-right">
                                    {/*
                                    <button class="button is-medium is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                    <button class="button is-medium is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                    */}
                                </div>
                            </div>

                        </div>
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminSubmissionPickTypeForAdd;
