import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {ErrorPage} from '.';

const ErrorMessage = ({error}) => {
    return (
        <div>
            <p>{error.message}</p>
            {/* <p>{error.stack}</p> */}
        </div>
    );
};

ErrorMessage.propTypes = {
    error: PropTypes.object
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        return null;
    }
}

ErrorBoundary.propTypes = {};

const mapStateToProps = (state) => {
    return {
        applicationError: state.applicationError,
        pages: state.applicationSettings.pages
    };
};

const ConnectedErrorBoundary = connect(
    mapStateToProps
)(ErrorBoundary);

export {
    ConnectedErrorBoundary as ErrorBoundary
}
