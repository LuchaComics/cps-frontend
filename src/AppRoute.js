import { React, useState } from "react";
import 'bulma/css/bulma.min.css';
import './index.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { RecoilRoot } from 'recoil';

import RetailerDashboard from "./Components/Retailer/Dashboard";
import RetailerSubmissionList from "./Components/Retailer/Submission/List";
import RetailerSubmissionAddStep1 from "./Components/Retailer/Submission/AddStep1";
import RetailerSubmissionAddStep2 from "./Components/Retailer/Submission/AddStep2";
import RetailerSubmissionDetail from "./Components/Retailer/Submission/Detail";
import RetailerSubmissionUpdate from "./Components/Retailer/Submission/Update";
import RetailerCustomerList from "./Components/Retailer/Customer/List";
import RetailerCustomerAdd from "./Components/Retailer/Customer/Add";
import RetailerCustomerDetail from "./Components/Retailer/Customer/Detail";
import RetailerCustomerUpdate from "./Components/Retailer/Customer/Update";
import LogoutRedirector from "./Components/Gateway/LogoutRedirector";
import Login from "./Components/Gateway/Login";
import Register from "./Components/Gateway/Register";
import RegisterSuccessful from "./Components/Gateway/RegisterSuccessful";
import Index from "./Components/Gateway/Index";
import TopAlertBanner from "./Components/Misc/TopAlertBanner";
import TopNavigation from "./Components/Misc/TopNavigation";
import SideNavigation from "./Components/Misc/SideNavigation";
import NotFoundError from "./Components/Misc/NotFoundError";
import EmailVerification from "./Components/Gateway/EmailVerification";
import ProfileDetail from "./Components/Profile/Detail";
import ProfileUpdate from "./Components/Profile/Update";
import OrganizationDetail from "./Components/Organization/Detail";
import OrganizationUpdate from "./Components/Organization/Update";


function AppRoute() {
    return (
        <>
            <RecoilRoot>
                <Router>
                    <div>
                        <TopAlertBanner />
                        <TopNavigation />
                    </div>
                    <section class="main-content columns is-fullheight">
                        <SideNavigation />
                        <Routes>
                            <Route exact path="/dashboard" element={<RetailerDashboard/>}/>
                            <Route exact path="/submissions" element={<RetailerSubmissionList/>}/>
                            <Route exact path="/submissions/add" element={<RetailerSubmissionAddStep1/>}/>
                            <Route exact path="/submissions/add/:id/confirmation" element={<RetailerSubmissionAddStep2/>}/>
                            <Route exact path="/submission/:id" element={<RetailerSubmissionDetail/>}/>
                            <Route exact path="/submission/:id/edit" element={<RetailerSubmissionUpdate/>}/>
                            <Route exact path="/customers" element={<RetailerCustomerList/>}/>
                            <Route exact path="/customers/add" element={<RetailerCustomerAdd/>}/>
                            <Route exact path="/customer/:id" element={<RetailerCustomerDetail/>}/>
                            <Route exact path="/customer/:id/edit" element={<RetailerCustomerUpdate/>}/>
                            <Route exact path="/account" element={<ProfileDetail/>}/>
                            <Route exact path="/account/update" element={<ProfileUpdate/>}/>
                            <Route exact path="/organization/" element={<OrganizationDetail/>}/>
                            <Route exact path="/organization/update" element={<OrganizationUpdate/>}/>
                            <Route exact path="/register" element={<Register/>}/>
                            <Route exact path="/register-successful" element={<RegisterSuccessful/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path="/logout" element={<LogoutRedirector/>}/>
                            <Route exact path="/verify" element={<EmailVerification/>}/>
                            <Route exact path="/" element={<Index/>}/>
                            <Route path="*" element={<NotFoundError/>}/>
                        </Routes>
                    </section>
                    <div>
                        {/* DEVELOPERS NOTE: Mobile tab-bar menu can go here */}
                    </div>
                    <footer class="footer is-hidden">
                        <div class="container">
                            <div class="content has-text-centered">
                                <p>Hello</p>
                            </div>
                        </div>
                    </footer>
                </Router>
            </RecoilRoot>
        </>
    );
}

export default AppRoute;
