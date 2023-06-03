import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTachometer, faTasks, faSignOut, faUserCircle, faUsers, faBuilding
} from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { onHamburgerClickedState } from "../../AppState";
import { getAccessTokenFromLocalStorage } from '../../Helpers/jwtUtility';

function SideNavigation() {
    // Global state
    const [onHamburgerClicked, setOnHamburgerClicked] = useRecoilState(onHamburgerClickedState);

    // Local state.
    const [showLogoutWarning, setShowLogoutWarning] = useState(false);
    const [forceURL, setForceURL] = useState("");

    // Get the current location and if we are at specific URL paths then we
    // will not render this component.
    const ignorePathsArr = [
        "/",
        "/register",
        "/register-successful",
        "/login",
        "/logout",
        "/verify",
        "/forgot-password"
    ];
    const location = useLocation();
    var arrayLength = ignorePathsArr.length;
    for (var i = 0; i < arrayLength; i++) {
        if (location.pathname === ignorePathsArr[i]) {
            return (null);
        }
    }

    // If the user is not logged in then redirect back to login page.
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken === undefined || accessToken === "" || accessToken === null) {
        window.location = "/login?unauthorized=true";
        return;
    }

    // If the user clicked the hamburger menu and
    console.log("onHamburgerClicked:", onHamburgerClicked);
    if (onHamburgerClicked === false) {
        return null;
    }

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    // Render the following component GUI.
    return (
        <>
            <div class={`modal ${showLogoutWarning ? 'is-active' : ''}`}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Are you sure?</p>
                        <button class="delete" aria-label="close" onClick={(e)=>setShowLogoutWarning(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        You are about to log out of the system and you'll need to log in again next time. Are you sure you want to continue?
                    </section>
                    <footer class="modal-card-foot">
                        <Link class="button is-success" to={`/logout`}>Yes</Link>
                        <button class="button" onClick={(e)=>setShowLogoutWarning(false)}>No</button>
                    </footer>
                </div>
            </div>
            <div class="has-background-black is-narrow-mobile is-fullheight" style={{minWidth:"250px", padding:"25px"}}>
                <aside class="menu">
                    <p class="menu-label has-text-grey-light">
                        Staff
                    </p>
                    <ul class="menu-list">
                        <li>
                            <Link to="/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/submissions" class={`has-text-grey-light ${location.pathname.includes("submission") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions
                            </Link>
                        </li>
                        <li>
                            <Link to="/customers" class={`has-text-grey-light ${location.pathname.includes("customer") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers
                            </Link>
                        </li>
                    </ul>
                    <p class="menu-label has-text-grey-light">
                        Account
                    </p>
                    <ul class="menu-list">
                        <li>
                            <Link class={`has-text-grey-light ${location.pathname.includes("account") && "is-active"}`} to={`/account`}>
                                <FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account
                            </Link>
                        </li>
                        <li>
                            <Link class={`has-text-grey-light ${location.pathname.includes("organization") && "is-active"}`} to={`/organization`}>
                                <FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organization
                            </Link>
                        </li>
                        <li>
                            <Link class={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`} onClick={(e)=>setShowLogoutWarning(true)}>
                                <FontAwesomeIcon className="fas" icon={faSignOut} />&nbsp;Sign Off
                            </Link>
                        </li>
                    </ul>
                </aside>
            </div>
        </>
    );
}

export default SideNavigation;
