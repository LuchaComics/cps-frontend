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
import RetailerSubmissionAddStep1WithSearch from "./Components/Retailer/Submission/AddStep1WithSearch";
import RetailerSubmissionAddStep1WithResult from "./Components/Retailer/Submission/AddStep1WithResult";
import RetailerSubmissionAddStep2 from "./Components/Retailer/Submission/AddStep2";
import RetailerSubmissionAddStep3 from "./Components/Retailer/Submission/AddStep3";
import RetailerSubmissionDetail from "./Components/Retailer/Submission/Detail";
import RetailerSubmissionDetailForCommentList from "./Components/Retailer/Submission/DetailForCommentList";
import RetailerSubmissionDetailForCustomer from "./Components/Retailer/Submission/DetailForCustomer";
import RetailerSubmissionUpdateForSubmission from "./Components/Retailer/Submission/UpdateSubmission";
import RetailerSubmissionUpdateForCustomer from "./Components/Retailer/Submission/UpdateCustomer";
import RetailerSubmissionUpdatePickCustomerWithResult from "./Components/Retailer/Submission/UpdatePickCustomerWithResult";
import RetailerSubmissionUpdatePickCustomerWithSearch from "./Components/Retailer/Submission/UpdatePickCustomerWithSearch";
import RetailerCustomerList from "./Components/Retailer/Customer/List";
import RetailerCustomerAdd from "./Components/Retailer/Customer/Add";
import RetailerCustomerDetail from "./Components/Retailer/Customer/Detail";
import RetailerCustomerDetailForSubmission from "./Components/Retailer/Customer/DetailForSubmission";
import RetailerCustomerDetailForCommentList from "./Components/Retailer/Customer/DetailForCommentList";
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
                            <Route exact path="/submissions/add/search" element={<RetailerSubmissionAddStep1WithSearch/>}/>
                            <Route exact path="/submissions/add/results" element={<RetailerSubmissionAddStep1WithResult/>}/>
                            <Route exact path="/submissions/add" element={<RetailerSubmissionAddStep2/>}/>
                            <Route exact path="/submissions/add/:id/confirmation" element={<RetailerSubmissionAddStep3/>}/>
                            <Route exact path="/submission/:id" element={<RetailerSubmissionDetail/>}/>
                            <Route exact path="/submission/:id/edit" element={<RetailerSubmissionUpdateForSubmission/>}/>
                            <Route exact path="/submission/:id/edit-customer" element={<RetailerSubmissionUpdateForCustomer/>}/>
                            <Route exact path="/submission/:id/customer/search" element={<RetailerSubmissionUpdatePickCustomerWithSearch/>}/>
                            <Route exact path="/submission/:id/customer/results" element={<RetailerSubmissionUpdatePickCustomerWithResult/>}/>
                            <Route exact path="/submission/:id/comments" element={<RetailerSubmissionDetailForCommentList/>}/>
                            <Route exact path="/submission/:id/cust" element={<RetailerSubmissionDetailForCustomer/>}/>
                            <Route exact path="/customers" element={<RetailerCustomerList/>}/>
                            <Route exact path="/customers/add" element={<RetailerCustomerAdd/>}/>
                            <Route exact path="/customer/:id" element={<RetailerCustomerDetail/>}/>
                            <Route exact path="/customer/:id/sub" element={<RetailerCustomerDetailForSubmission/>}/>
                            <Route exact path="/customer/:id/edit" element={<RetailerCustomerUpdate/>}/>
                            <Route exact path="/customer/:id/comments" element={<RetailerCustomerDetailForCommentList/>}/>
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
