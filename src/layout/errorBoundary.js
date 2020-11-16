import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { ErrorPage } from '.';

import { getApplicationPages, getErrorPageGoToPage } from '../../selectors/navigationSelectors';

const ErrorMessage = ({ error }) => {
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
        const {
            children,
            applicationError,
            pages: allPages
        } = this.props;

        const { error } = this.state;

        const pages = getApplicationPages(allPages);

        let result = children;

        if ((error || applicationError)) {
            const errorMessage = (
                <ErrorMessage
                    error={error || applicationError.error}
                />
            )

            result = (
                <ErrorPage
                    errorCode={'error'}
                    header={'Something went wrong'}
                    message={errorMessage}
                    pages={pages}
                    goToPage={getErrorPageGoToPage(pages)}
                />
            );
        }

        return result;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any,
    applicationError: PropTypes.object,
    pages: PropTypes.object
};

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
