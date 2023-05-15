import React, { useEffect } from "react";

function LogoutRedirector() {
    useEffect(() => {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        
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
    });

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
