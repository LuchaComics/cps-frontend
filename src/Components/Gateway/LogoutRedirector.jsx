import React, { useEffect, useState } from "react";
import { postLogoutAPI } from "../../API/gateway";
import Scroll from 'react-scroll';


function LogoutRedirector() {

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});

    ////
    //// API.
    ////

    function onLogoutnSuccess(response){
        console.log("onLogoutnSuccess: Starting...");
    }

    function onLogoutnError(apiErr) {
        console.log("onLogoutnError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onLogoutnDone() {
        console.log("onLogoutnDone: Starting...");
        function onRedirect(e) {
            // Clear the entire local storage.
            localStorage.clear();

            // Do not use `Link` but instead use the `window.location` change
            // to fix the issue with the `TopNavigation` component to restart.
            // If you use use `Link` then when you redirect to the navigation then
            // the menu will not update.
            window.location.href = "/login";
        }

        setTimeout(onRedirect, 250);
    }

    ////
    //// Event handling.
    ////

    // (Do nothing)

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            postLogoutAPI(
                onLogoutnSuccess,
                onLogoutnError,
                onLogoutnDone
            );
        }

        return () => mounted = false;
    }, []);

    return (
        <>
            <div className="w3-modal" style={{display:"block"}}>
            <div className="w3-modal-content">

            <div className="w3-center">
                <br />
                <br />
                <br />
                <i className="fa fa-spinner w3-spin w3-jumbo"></i>
                <h1>Logging out ...</h1>
                <br />
                <br />
            </div>

            </div>
            </div>
        </>
    );
}

export default LogoutRedirector;
