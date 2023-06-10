import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faGauge, faArrowRight, faUsers, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { topAlertMessageState, topAlertStatusState } from "../../AppState";

function AdminDashboard() {

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
                            <li class="is-active"><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</h1>
                            </div>
                        </div>


                        <section class="hero is-medium is-link">
                          <div class="hero-body">
                            <p class="title">
                                <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions
                            </p>
                            <p class="subtitle">
                              Submit a request to encapsulate your comics by clicking below:
                              <br />
                              <br />
                              <Link to={"/admin/submissions"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                            </p>
                          </div>
                        </section>

                        <section class="hero is-medium is-info">
                          <div class="hero-body">
                            <p class="title">
                                <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers
                            </p>
                            <p class="subtitle">
                              Manage the customers that belong to your organization.
                              <br />
                              <br />
                              <Link to={"/admin/customers"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                            </p>
                          </div>
                        </section>

                        <section class="hero is-medium is-primary">
                          <div class="hero-body">
                            <p class="title">
                                <FontAwesomeIcon className="fas" icon={faBarcode} />&nbsp;Registry
                            </p>
                            <p class="subtitle">
                              Have a CPS registry number? Use the following to lookup existing records:
                              <br />
                              <br />
                              <Link to={"/admin/registry"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                            </p>
                          </div>
                        </section>

                        {/* <section class="hero is-medium is-primary">
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
                        </section> */}

                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminDashboard;
