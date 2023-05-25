import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { topAlertMessageState, topAlertStatusState } from "../../AppState";

function RetailerDashboard() {

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
    //// Component rendering.
    ////

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class="is-active"><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-1"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</h1>
                            </div>
                        </div>


                        <section class="hero is-medium is-link">
                          <div class="hero-body">
                            <p class="title">
                              Submissions
                            </p>
                            <p class="subtitle">
                              Submit a request to encapsulate your comics by clicking below:
                              <br />
                              <br />
                              <Link to={"/submissions"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                            </p>
                          </div>
                        </section>

                        <section class="hero is-medium is-info">
                          <div class="hero-body">
                            <p class="title">
                              Customers
                            </p>
                            <p class="subtitle">
                              Manage the customers that belong to your organization.
                              <br />
                              <br />
                              <i>Coming soon</i>
                            </p>
                          </div>
                        </section>

                        <section class="hero is-medium is-primary">
                          <div class="hero-body">
                            <p class="title">
                              Staff
                            </p>
                            <p class="subtitle">
                              Manage the staff that belong to your organization.
                              <br />
                              <br />
                              <i>Coming soon</i>
                            </p>
                          </div>
                        </section>



                    </nav>
                </section>
            </div>
        </>
    );
}

export default RetailerDashboard;
