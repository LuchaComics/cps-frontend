import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { onHamburgerClickedState } from "../../AppState";


function TopNavigation() {
    const [onHamburgerClicked, setOnHamburgerClicked] = useRecoilState(onHamburgerClickedState);

    // Get the current location and if we are at specific URL paths then we
    // will not render this component.
    const ignorePathsArr = [
        "/",
        "/register",
        "/register-successful",
        "/index",
        "/login",
        "/logout",
        "/verify",
    ];
    const location = useLocation();
    var arrayLength = ignorePathsArr.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log();
        if (location.pathname === ignorePathsArr[i]) {
            return (null);
        }
    }


    // Render the following component GUI.
    return (
        <>
            <nav class="navbar has-background-black" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/dashboard" style={{color:"white"}}>
                        <img src="/static/CPS logo 2023 square.webp" width={54} height={28} alt="Logo Image" />&nbsp;Canadian Protective Services
                    </a>
                    <a role="button" class="navbar-burger has-text-white" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={()=>setOnHamburgerClicked(!onHamburgerClicked)}>
                        <span aria-hidden="true">
                        </span>
                        <span aria-hidden="true">
                        </span>
                        <span aria-hidden="true">
                        </span>
                    </a>
                </div>
                <div id="navbarBasicExample" class="navbar-menu has-text-white">

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons" onClick={()=>setOnHamburgerClicked(!onHamburgerClicked)}>
                                <FontAwesomeIcon className="fas has-text-white" icon={faBars} />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default TopNavigation;
