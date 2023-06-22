import { React, useState } from "react";
import 'bulma/css/bulma.min.css';
import './index.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { RecoilRoot } from 'recoil';

import AdminOrganizationList from "./Components/Admin/Organization/List";
import AdminOrganizationAdd from "./Components/Admin/Organization/Add";
import AdminOrganizationDetail from "./Components/Admin/Organization/Detail";
import AdminOrganizationDetailForComicSubmission from "./Components/Admin/Organization/DetailForComicSubmission";
import AdminOrganizationDetailForUserList from "./Components/Admin/Organization/DetailForUser";
import AdminOrganizationDetailForCommentList from "./Components/Admin/Organization/DetailForCommentList";
import AdminOrganizationUpdate from "./Components/Admin/Organization/Update";
import AdminDashboard from "./Components/Admin/Dashboard";
import AdminRegistrySearch from "./Components/Admin/Registry/Search";
import AdminRegistryResult from "./Components/Admin/Registry/Result";
import AdminComicSubmissionList from "./Components/Admin/ComicSubmission/List";
import AdminComicSubmissionAddStep1WithSearch from "./Components/Admin/ComicSubmission/AddStep1WithSearch";
import AdminComicSubmissionAddStep1WithResult from "./Components/Admin/ComicSubmission/AddStep1WithResult";
import AdminComicSubmissionAddStep2 from "./Components/Admin/ComicSubmission/AddStep2";
import AdminComicSubmissionAddStep3Comic from "./Components/Admin/ComicSubmission/AddStep3Comic";
import AdminComicSubmissionAddStep4 from "./Components/Admin/ComicSubmission/AddStep4";
import AdminComicSubmissionDetail from "./Components/Admin/ComicSubmission/Detail";
import AdminComicSubmissionDetailForCommentList from "./Components/Admin/ComicSubmission/DetailForCommentList";
import AdminComicSubmissionDetailForCustomer from "./Components/Admin/ComicSubmission/DetailForCustomer";
import AdminComicSubmissionDetailForPDFFile from "./Components/Admin/ComicSubmission/DetailForPDFFile";
import AdminComicSubmissionUpdateForComicSubmission from "./Components/Admin/ComicSubmission/UpdateSubmission";
import AdminComicSubmissionUpdatePickCustomerWithResult from "./Components/Admin/ComicSubmission/UpdatePickCustomerWithResult";
import AdminComicSubmissionUpdatePickCustomerWithSearch from "./Components/Admin/ComicSubmission/UpdatePickCustomerWithSearch";
import AdminUserList from "./Components/Admin/User/List";
import AdminUserAdd from "./Components/Admin/User/Add";
import AdminUserDetail from "./Components/Admin/User/Detail";
import AdminUserDetailForComicSubmission from "./Components/Admin/User/DetailForComicSubmission";
import AdminUserDetailForCommentList from "./Components/Admin/User/DetailForCommentList";
import AdminUserUpdate from "./Components/Admin/User/Update";
import RetailerDashboard from "./Components/Retailer/Dashboard";
import RetailerRegistrySearch from "./Components/Retailer/Registry/Search";
import RetailerRegistryResult from "./Components/Retailer/Registry/Result";
import RetailerSubmissionList from "./Components/Retailer/Submission/List";
import RetailerSubmissionAddStep1WithSearch from "./Components/Retailer/Submission/AddStep1WithSearch";
import RetailerSubmissionAddStep1WithResult from "./Components/Retailer/Submission/AddStep1WithResult";
import RetailerSubmissionAddStep2 from "./Components/Retailer/Submission/AddStep2";
import RetailerSubmissionAddStep3Comic from "./Components/Retailer/Submission/AddStep3Comic";
import RetailerSubmissionAddStep4 from "./Components/Retailer/Submission/AddStep4";
import RetailerSubmissionDetail from "./Components/Retailer/Submission/Detail";
import RetailerSubmissionDetailForCommentList from "./Components/Retailer/Submission/DetailForCommentList";
import RetailerSubmissionDetailForCustomer from "./Components/Retailer/Submission/DetailForCustomer";
import RetailerSubmissionDetailForPDFFile from "./Components/Retailer/Submission/DetailForPDFFile";
import RetailerSubmissionUpdateForSubmission from "./Components/Retailer/Submission/UpdateSubmission";
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
import Sidebar from "./Components/Menu/Sidebar";
import Topbar from "./Components/Menu/Top";
import NotFoundError from "./Components/Misc/NotFoundError";
import NotImplementedError from "./Components/Misc/NotImplementedError";
import EmailVerification from "./Components/Gateway/EmailVerification";
import ProfileDetail from "./Components/Profile/Detail";
import ProfileUpdate from "./Components/Profile/Update";
import OrganizationDetail from "./Components/Organization/Detail";
import OrganizationUpdate from "./Components/Organization/Update";
import ForgotPassword from "./Components/Gateway/ForgotPassword";
import PasswordReset from "./Components/Gateway/PasswordReset";
import PublicRegistrySearch from "./Components/Gateway/RegistrySearch";
import PublicRegistryResult from "./Components/Gateway/RegistryResult";


function AppRoute() {
    return (
        <div class="is-widescreen">
            <RecoilRoot>
                <Router>
                    <TopAlertBanner />
                    <Topbar />
                    <div class="columns">
                        <Sidebar />
                        <div class="column">
                            <section class="main-content columns is-fullheight">
                                <Routes>
                                    <Route exact path="/admin/organizations" element={<AdminOrganizationList/>}/>
                                    <Route exact path="/admin/organizations/add" element={<AdminOrganizationAdd/>}/>
                                    <Route exact path="/admin/organization/:id" element={<AdminOrganizationDetail/>}/>
                                    <Route exact path="/admin/organization/:id/comics" element={<AdminOrganizationDetailForComicSubmission/>}/>
                                    <Route exact path="/admin/organization/:id/users" element={<AdminOrganizationDetailForUserList/>}/>
                                    <Route exact path="/admin/organization/:id/edit" element={<AdminOrganizationUpdate/>}/>
                                    <Route exact path="/admin/organization/:id/comments" element={<AdminOrganizationDetailForCommentList/>}/>
                                    <Route exact path="/admin/registry" element={<AdminRegistrySearch/>}/>
                                    <Route exact path="/admin/registry/:cpsn" element={<AdminRegistryResult/>}/>
                                    <Route exact path="/admin/comic-submissions" element={<AdminComicSubmissionList/>}/>
                                    <Route exact path="/admin/comic-submissions/add/search" element={<AdminComicSubmissionAddStep1WithSearch/>}/>
                                    <Route exact path="/admin/comic-submissions/add/results" element={<AdminComicSubmissionAddStep1WithResult/>}/>
                                    <Route exact path="/admin/comic-submissions/pick-type-for-add" element={<AdminComicSubmissionAddStep2/>}/>
                                    <Route exact path="/admin/comic-submissions/add-comic" element={<AdminComicSubmissionAddStep3Comic/>}/>
                                    <Route exact path="/admin/comic-submissions/add-card" element={<NotImplementedError/>}/>
                                    <Route exact path="/admin/comic-submissions/add/:id/confirmation" element={<AdminComicSubmissionAddStep4/>}/>
                                    <Route exact path="/admin/comic-submission/:id" element={<AdminComicSubmissionDetail/>}/>
                                    <Route exact path="/admin/comic-submission/:id/edit" element={<AdminComicSubmissionUpdateForComicSubmission/>}/>
                                    <Route exact path="/admin/comic-submission/:id/cust/search" element={<AdminComicSubmissionUpdatePickCustomerWithSearch/>}/>
                                    <Route exact path="/admin/comic-submission/:id/cust/results" element={<AdminComicSubmissionUpdatePickCustomerWithResult/>}/>
                                    <Route exact path="/admin/comic-submission/:id/comments" element={<AdminComicSubmissionDetailForCommentList/>}/>
                                    <Route exact path="/admin/comic-submission/:id/cust" element={<AdminComicSubmissionDetailForCustomer/>}/>
                                    <Route exact path="/admin/comic-submission/:id/file" element={<AdminComicSubmissionDetailForPDFFile/>}/>
                                    <Route exact path="/admin/users" element={<AdminUserList/>}/>
                                    <Route exact path="/admin/users/add" element={<AdminUserAdd/>}/>
                                    <Route exact path="/admin/user/:id" element={<AdminUserDetail/>}/>
                                    <Route exact path="/admin/user/:id/comics" element={<AdminUserDetailForComicSubmission/>}/>
                                    <Route exact path="/admin/user/:id/edit" element={<AdminUserUpdate/>}/>
                                    <Route exact path="/admin/user/:id/comments" element={<AdminUserDetailForCommentList/>}/>
                                    <Route exact path="/admin/dashboard" element={<AdminDashboard/>}/>
                                    <Route exact path="/dashboard" element={<RetailerDashboard/>}/>
                                    <Route exact path="/registry" element={<RetailerRegistrySearch/>}/>
                                    <Route exact path="/registry/:cpsn" element={<RetailerRegistryResult/>}/>
                                    <Route exact path="/submissions" element={<RetailerSubmissionList/>}/>
                                    <Route exact path="/submissions/add/search" element={<RetailerSubmissionAddStep1WithSearch/>}/>
                                    <Route exact path="/submissions/add/results" element={<RetailerSubmissionAddStep1WithResult/>}/>
                                    <Route exact path="/submissions/pick-type-for-add" element={<RetailerSubmissionAddStep2/>}/>
                                    <Route exact path="/submissions/add-comic" element={<RetailerSubmissionAddStep3Comic/>}/>
                                    <Route exact path="/submissions/add/:id/confirmation" element={<RetailerSubmissionAddStep4/>}/>
                                    <Route exact path="/submission/:id" element={<RetailerSubmissionDetail/>}/>
                                    <Route exact path="/submission/:id/edit" element={<RetailerSubmissionUpdateForSubmission/>}/>
                                    <Route exact path="/submission/:id/cust/search" element={<RetailerSubmissionUpdatePickCustomerWithSearch/>}/>
                                    <Route exact path="/submission/:id/cust/results" element={<RetailerSubmissionUpdatePickCustomerWithResult/>}/>
                                    <Route exact path="/submission/:id/comments" element={<RetailerSubmissionDetailForCommentList/>}/>
                                    <Route exact path="/submission/:id/cust" element={<RetailerSubmissionDetailForCustomer/>}/>
                                    <Route exact path="/submission/:id/file" element={<RetailerSubmissionDetailForPDFFile/>}/>
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
                                    <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
                                    <Route exact path="/password-reset" element={<PasswordReset/>}/>
                                    <Route exact path="/cpsrn-result" element={<PublicRegistryResult/>}/>
                                    <Route exact path="/cpsrn-registry" element={<PublicRegistrySearch/>}/>
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
                        </div>
                    </div>
                </Router>
            </RecoilRoot>
        </div>
    );
}

export default AppRoute;
