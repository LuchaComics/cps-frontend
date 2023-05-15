import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { getVersionAPI } from "../../API/gateway";


function Index() {
    // For debugging purposes only.
    console.log("REACT_APP_WWW_PROTOCOL:", process.env.REACT_APP_WWW_PROTOCOL);
    console.log("REACT_APP_WWW_DOMAIN:", process.env.REACT_APP_WWW_DOMAIN);
    console.log("REACT_APP_API_PROTOCOL:", process.env.REACT_APP_API_PROTOCOL);
    console.log("REACT_APP_API_DOMAIN:", process.env.REACT_APP_API_DOMAIN);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [version, setVersion] = useState("");

    ////
    //// API.
    ////

    function onVersionSuccess(response){
        console.log("onVersionSuccess: Starting...");
        setVersion(response);
    }

    function onVersionError(apiErr) {
        console.log("onVersionError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onVersionDone() {
        console.log("onVersionDone: Starting...");
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
            getVersionAPI(
                onVersionSuccess,
                onVersionError,
                onVersionDone
            );
        }

        return () => mounted = false;
    }, []);

    ////
    //// Component rendering.
    ////

    return (
        <>
        



         <section className="container">
         <br />
         To begin, click&nbsp;<Link to="/login">login</Link>.
         <br /> <br />
         {version !== ""
            ? <span>The backend version is: {version}</span>
            : <span>Error calling API endpoint.</span>
         }
        </section>
        </>
      );
}

export default Index;
