import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faGauge, faArrowRight, faUsers, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { topAlertMessageState, topAlertStatusState } from "../../../AppState";

function RetailerSubmissionLaunchpad() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    ////
    //// API.
    ////

    ////
    //// Event handling.
    ////

    ////
    //// Misc.
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

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class="is-active"><Link to="" aria-current="page"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions</h1>
                            </div>
                        </div>


                        <section class="hero is-medium is-link">
                          <div class="hero-body">
                            <p class="title">
                                <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Comics
                            </p>
                            <p class="subtitle">
                              Submit a request to encapsulate your comics by clicking below:
                              <br />
                              <br />
                              <Link to={"/submissions/comics/add/search"}>Add&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                              <br />
                              <br />
                              <Link to={"/submissions/comics"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                            </p>
                          </div>
                        </section>

                        <section class="hero is-medium is-info">
                          <div class="hero-body">
                            <p class="title">
                                <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Cards
                            </p>
                            <p class="subtitle">
                              Submit a request to encapsulate your cards by clicking below:
                              <br />
                              <br />
                              <Link to={"/submissions/cards/add/search"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                              <br />
                              <br />
                              <Link to={"/submissions/cards"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                            </p>
                          </div>
                        </section>

                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerSubmissionLaunchpad;
