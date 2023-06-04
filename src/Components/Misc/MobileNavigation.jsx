import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket, faTachometer, faTasks, faSignOut, faUserCircle, faUsers, faBuilding } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { onHamburgerClickedState } from "../../AppState";


function MobileNavigation() {
    ////
    //// Global State
    ////
    const [onHamburgerClicked, setOnHamburgerClicked] = useRecoilState(onHamburgerClickedState);

    ////
    //// Local State
    ////

    const [showLogoutWarning, setShowLogoutWarning] = useState(false);

    ////
    //// Events
    ////

    // Do nothing.

    ////
    //// Rendering.
    ////

    // CASE 1 OF 2

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
        "/forgot-password"
    ];
    const location = useLocation();
    var arrayLength = ignorePathsArr.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log();
        if (location.pathname === ignorePathsArr[i]) {
            return (null);
        }
    }

    // CASE 2 OF 2

    // Render the following component GUI if the user is in a mobile browser.
    return (
        <div className="is-hidden-desktop">
            <nav class="navbar has-background-black" role="navigation" aria-label="main navigation" >
                <div class="navbar-brand">
                    <a class="navbar-item" href="/dashboard" style={{color:"white"}}>
                       <img src="/static/CPS logo 2023 square.webp" width={54} height={28} alt="Logo Image" />&nbsp;Collectibles Protective Services
                    </a>
                    <a role="button" class="navbar-burger has-text-white" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={(e)=>setOnHamburgerClicked(!onHamburgerClicked)}>
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
                            <div class="buttons p-3" onClick={(e)=>setOnHamburgerClicked(!onHamburgerClicked)}>
                                <FontAwesomeIcon className="fas has-text-white" icon={faBars} />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {onHamburgerClicked === true &&
                <div class="has-background-black is-narrow-mobile is-fullheight" style={{minWidth:"250px", padding:"25px"}}>
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <figure class='image'>
                                <img src='/static/CPS logo 2023 GR.webp' style={{maxWidth:"250px"}} />
                            </figure>
                        </div>
                    </nav>
                    <aside class="menu">
                        <p class="menu-label has-text-grey-light">
                            Staff
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href="/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="/submissions" class={`has-text-grey-light ${location.pathname.includes("submission") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions
                                </a>
                            </li>
                            <li>
                                <a href="/customers" class={`has-text-grey-light ${location.pathname.includes("customer") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Customers
                                </a>
                            </li>
                        </ul>
                        <p class="menu-label has-text-grey-light">
                            Account
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href={`/account`} class={`has-text-grey-light ${location.pathname.includes("account") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account
                                </a>
                            </li>
                            <li>
                                <a href={`/organization`} class={`has-text-grey-light ${location.pathname.includes("organization") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organization
                                </a>
                            </li>
                            <li>
                                <a onClick={(e)=>setShowLogoutWarning(true)} class={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`} >
                                    <FontAwesomeIcon className="fas" icon={faSignOut} />&nbsp;Sign Off
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            }
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
        </div>
    );
}

export default MobileNavigation;
