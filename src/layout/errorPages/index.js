import React from 'react';
import { ErrorPage as BaseErrorPage } from './errorPage';

const errorPagesConfig = {
    "401": {
        header: "Unauthorized.",
        message: "Your session has expired. Please log in again.",
        classNames: "base-error-page unauth-401",
        elements: null
    },
    "403": {
        header: "Access denied.",
        message: "Insufficient permissions.",
        classNames: "base-error-page forbidden-403",
        elements: (
            <div className="unauth-elements">
                <div className="error-floor"></div>
                <div className="error-door"></div>
                <div className="torch"></div>
            </div>
        )
    },
    "404": {
        header: "We're sorry.",
        message: "We can't seem to find the page you're looking for.",
        classNames: "base-error-page notfound-404",
        elements: (
            <div className="notfound-elements">
                <div className="error-notfound-triangle"></div>
                <div className="error-booking-bars"></div>
            </div>
        )
    },
    "error": {
        header: "We're sorry.",
        message: "Something seems to have gone wrong.",
        classNames: "base-error-page default-error",
        elements: null        
    }
}

const ErrorPage = (props) => {
    const { errorCode } = props;
    
    let errorPageConfig = errorPagesConfig['error'];

    if (errorCode in errorPagesConfig) {
        errorPageConfig = errorPagesConfig[errorCode];
    }

    // add an error-page-app class to the main app container 
    // so we can acheive responsiveness
    document.getElementById("app").classList.add("error-page-app");

    return (
        <BaseErrorPage
            {...errorPageConfig}
            {...props}
        />
    );
}

export {
    ErrorPage
};