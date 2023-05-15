import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTachometer, faTasks, faSignOut
} from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { onHamburgerClickedState } from "../../AppState";


function SideNavigation() {
    const [onHamburgerClicked, setOnHamburgerClicked] = useRecoilState(onHamburgerClickedState);

    // Get the current location and if we are at specific URL paths then we
    // will not render this component.
    const ignorePathsArr = [
        "/register",
        "/register-successful",
        "/login",
        "/logout",
    ];
    const location = useLocation();
    var arrayLength = ignorePathsArr.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log();
        if (location.pathname === ignorePathsArr[i]) {
            return (null);
        }
    }

    console.log("onHamburgerClicked:", onHamburgerClicked);
    if (onHamburgerClicked === false) {
        return null;
    }

    // Render the following component GUI.
    return (
        <>
            <div class="has-background-black is-narrow-mobile is-fullheight" style={{minWidth:"250px", padding:"25px"}}>
                <aside class="menu">
                    <p class="menu-label has-text-grey-light">
                        Staff
                    </p>
                    <ul class="menu-list">
                        <li>
                            <Link to="/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions
                            </Link>
                        </li>
                    </ul>
                    <p class="menu-label has-text-grey-light">
                        Account
                    </p>
                    <ul class="menu-list">
                        <li>
                            <Link to="/logout" class={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`}>
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
