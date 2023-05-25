import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import FormErrorBox from "../Element/FormErrorBox";
import useLocalStorage from "../../Hooks/useLocalStorage";
import { postLoginAPI } from "../../API/gateway";

function RegisterSuccessful() {
    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [forceURL, setForceURL] = useState("");

    ////
    //// API.
    ////

    // Do nothing.

    ////
    //// Event handling.
    ////

    // Do nothing.

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
        }

        return () => mounted = false;
    }, []);

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    ////
    //// Component rendering.
    ////

    return (
        <>
            <div class="container column is-12">
                <div class="section">

                    <section class="hero is-fullheight">
                        <div class="hero-body">
                            <div class="container">
                                <div class="columns is-centered">
                                    <div class="box is-rounded column is-one-third-tablet">
                                        <form>
                                            <h1 className="title is-3 has-text-centered">Registration was Successful</h1>
                                            <FormErrorBox errors={errors} />
                                            <p>Thank you for registering, please wait 24 hours for an activation email to be sent to your inbox.</p>

                                        </form>
                                        <br />
                                        <p><a href="/">Back to index</a></p>

                                    </div>
                                    {/* End box */}
                                </div>
                            </div>
                            {/* End container */}
                        </div>
                        {/* End hero-body */}
                    </section>

                </div>
            </div>
        </>
    );
}

export default RegisterSuccessful;
