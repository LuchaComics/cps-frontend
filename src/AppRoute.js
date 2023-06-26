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
import AdminSubmissionPickTypeForAdd from "./Components/Admin/Submission/PickTypeForAdd";
import AdminComicSubmissionList from "./Components/Admin/Submission/Comic/List";
import AdminComicSubmissionAddStep1WithSearch from "./Components/Admin/Submission/Comic/AddStep1WithSearch";
import AdminComicSubmissionAddStep1WithResult from "./Components/Admin/Submission/Comic/AddStep1WithResult";
import AdminComicSubmissionAddStep2 from "./Components/Admin/Submission/Comic/AddStep2";
import AdminComicSubmissionAddStep3 from "./Components/Admin/Submission/Comic/AddStep3";
import AdminComicSubmissionDetail from "./Components/Admin/Submission/Comic/Detail";
import AdminComicSubmissionDetailForCommentList from "./Components/Admin/Submission/Comic/DetailForCommentList";
import AdminComicSubmissionDetailForCustomer from "./Components/Admin/Submission/Comic/DetailForCustomer";
import AdminComicSubmissionDetailForPDFFile from "./Components/Admin/Submission/Comic/DetailForPDFFile";
import AdminComicSubmissionUpdateForComicSubmission from "./Components/Admin/Submission/Comic/UpdateSubmission";
import AdminComicSubmissionUpdatePickCustomerWithResult from "./Components/Admin/Submission/Comic/UpdatePickCustomerWithResult";
import AdminComicSubmissionUpdatePickCustomerWithSearch from "./Components/Admin/Submission/Comic/UpdatePickCustomerWithSearch";
import AdminUserList from "./Components/Admin/User/List";
import AdminUserAdd from "./Components/Admin/User/Add";
import AdminUserDetail from "./Components/Admin/User/Detail";
import AdminUserDetailForComicSubmission from "./Components/Admin/User/DetailForComicSubmission";
import AdminUserDetailForCommentList from "./Components/Admin/User/DetailForCommentList";
import AdminUserUpdate from "./Components/Admin/User/Update";
import RetailerDashboard from "./Components/Retailer/Dashboard";
import RetailerRegistrySearch from "./Components/Retailer/Registry/Search";
import RetailerRegistryResult from "./Components/Retailer/Registry/Result";
import RetailerSubmissionPickTypeForAdd from "./Components/Retailer/Submission/PickForAdd";
import RetailerComicSubmissionList from "./Components/Retailer/Submission/Comic/List";
import RetailerComicSubmissionAddStep1WithSearch from "./Components/Retailer/Submission/Comic/AddStep1WithSearch";
import RetailerComicSubmissionAddStep1WithResult from "./Components/Retailer/Submission/Comic/AddStep1WithResult";
import RetailerComicSubmissionAddStep2 from "./Components/Retailer/Submission/Comic/AddStep2";
import RetailerComicSubmissionAddStep3 from "./Components/Retailer/Submission/Comic/AddStep3";
import RetailerComicSubmissionDetail from "./Components/Retailer/Submission/Comic/Detail";
import RetailerComicSubmissionDetailForCommentList from "./Components/Retailer/Submission/Comic/DetailForCommentList";
import RetailerComicSubmissionDetailForCustomer from "./Components/Retailer/Submission/Comic/DetailForCustomer";
import RetailerComicSubmissionDetailForPDFFile from "./Components/Retailer/Submission/Comic/DetailForPDFFile";
import RetailerComicSubmissionUpdateForComicSubmission from "./Components/Retailer/Submission/Comic/UpdateSubmission";
import RetailerComicSubmissionUpdatePickCustomerWithResult from "./Components/Retailer/Submission/Comic/UpdatePickCustomerWithResult";
import RetailerComicSubmissionUpdatePickCustomerWithSearch from "./Components/Retailer/Submission/Comic/UpdatePickCustomerWithSearch";
import RetailerCustomerList from "./Components/Retailer/Customer/List";
import RetailerCustomerAdd from "./Components/Retailer/Customer/Add";
import RetailerCustomerDetail from "./Components/Retailer/Customer/Detail";
import RetailerCustomerDetailForComicSubmission from "./Components/Retailer/Customer/DetailForComicSubmission";
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
import AccountDetail from "./Components/Profile/Detail";
import AccountUpdate from "./Components/Profile/Update";
import AccountChangePassword from "./Components/Profile/ChangePassword";
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
                                    <Route exact path="/admin/submissions/pick-type-for-add" element={<AdminSubmissionPickTypeForAdd/>}/>
                                    <Route exact path="/admin/submissions/comics" element={<AdminComicSubmissionList/>}/>
                                    <Route exact path="/admin/submissions/comics/add/search" element={<AdminComicSubmissionAddStep1WithSearch/>}/>
                                    <Route exact path="/admin/submissions/comics/add/results" element={<AdminComicSubmissionAddStep1WithResult/>}/>
                                    <Route exact path="/admin/submissions/comics/add" element={<AdminComicSubmissionAddStep2/>}/>
                                    <Route exact path="/admin/submissions/comics/add/:id/confirmation" element={<AdminComicSubmissionAddStep3/>}/>
                                    <Route exact path="/admin/submissions/comic/:id" element={<AdminComicSubmissionDetail/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/edit" element={<AdminComicSubmissionUpdateForComicSubmission/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/cust/search" element={<AdminComicSubmissionUpdatePickCustomerWithSearch/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/cust/results" element={<AdminComicSubmissionUpdatePickCustomerWithResult/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/comments" element={<AdminComicSubmissionDetailForCommentList/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/cust" element={<AdminComicSubmissionDetailForCustomer/>}/>
                                    <Route exact path="/admin/submissions/comic/:id/file" element={<AdminComicSubmissionDetailForPDFFile/>}/>
                                    <Route exact path="/admin/submissions/cards" element={<NotImplementedError/>}/>
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
                                    <Route exact path="/submissions/pick-type-for-add" element={<RetailerSubmissionPickTypeForAdd/>}/>
                                    <Route exact path="/submissions/comics" element={<RetailerComicSubmissionList/>}/>
                                    <Route exact path="/submissions/comics/add/search" element={<RetailerComicSubmissionAddStep1WithSearch/>}/>
                                    <Route exact path="/submissions/comics/add/results" element={<RetailerComicSubmissionAddStep1WithResult/>}/>
                                    <Route exact path="/submissions/comics/add" element={<RetailerComicSubmissionAddStep2/>}/>
                                    <Route exact path="/submissions/comics/add/:id/confirmation" element={<RetailerComicSubmissionAddStep3/>}/>
                                    <Route exact path="/submissions/comic/:id" element={<RetailerComicSubmissionDetail/>}/>
                                    <Route exact path="/submissions/comic/:id/edit" element={<RetailerComicSubmissionUpdateForComicSubmission/>}/>
                                    <Route exact path="/submissions/comic/:id/cust/search" element={<RetailerComicSubmissionUpdatePickCustomerWithSearch/>}/>
                                    <Route exact path="/submissions/comic/:id/cust/results" element={<RetailerComicSubmissionUpdatePickCustomerWithResult/>}/>
                                    <Route exact path="/submissions/comic/:id/comments" element={<RetailerComicSubmissionDetailForCommentList/>}/>
                                    <Route exact path="/submissions/comic/:id/cust" element={<RetailerComicSubmissionDetailForCustomer/>}/>
                                    <Route exact path="/submissions/comic/:id/file" element={<RetailerComicSubmissionDetailForPDFFile/>}/>
                                    <Route exact path="/submissions/cards" element={<NotImplementedError/>}/>
                                    <Route exact path="/customers" element={<RetailerCustomerList/>}/>
                                    <Route exact path="/customers/add" element={<RetailerCustomerAdd/>}/>
                                    <Route exact path="/customer/:id" element={<RetailerCustomerDetail/>}/>
                                    <Route exact path="/customer/:id/comics" element={<RetailerCustomerDetailForComicSubmission/>}/>
                                    <Route exact path="/customer/:id/edit" element={<RetailerCustomerUpdate/>}/>
                                    <Route exact path="/customer/:id/comments" element={<RetailerCustomerDetailForCommentList/>}/>
                                    <Route exact path="/account" element={<AccountDetail/>}/>
                                    <Route exact path="/account/update" element={<AccountUpdate/>}/>
                                    <Route exact path="/account/change-password" element={<AccountChangePassword/>}/>
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
