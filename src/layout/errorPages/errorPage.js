import React from 'react';
import {Button} from 'antd';

import PropTypes, {oneOfType} from 'prop-types';
import {getCurrentPage, browserHistory} from '../../history';
import {withRouter} from 'react-router-dom';

const GO_BACK_TEXT = 'Go back to your last page';
const GO_TO_TEXT = 'Go to';

export class ErrorPage extends React.Component {

    constructor(props) {
        super(props);

        this.onPopState = this.onPopState.bind(this);
        this.onGoToPageClick = this.onGoToPageClick.bind(this);
        this.onGoToEmployeesClick = this.onGoToEmployeesClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('popstate', this.onPopState);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.onPopState);
    }

    onPopState() {
        const {pages} = this.props;

        const currentPage = getCurrentPage();
        const pageIndex = pages.findIndex(({name}) => name === currentPage);

        let selectedPageObject = pages[0];

        if (pageIndex > -1) {
            selectedPageObject = pages[pageIndex];
        }

        browserHistory.push(selectedPageObject.navigationLink || selectedPageObject.path);
        window.location.reload();
    }

    onBackClick() {
        browserHistory.goBack();
    }

    onGoToPageClick() {
        const {goToPage} = this.props;
        browserHistory.push(goToPage.navigationLink);
        window.location.reload();
    }

    onGoToEmployeesClick() {
        const {location} = this.props;
        const {state} = location;
        const {redirectToNoAccess} = state;
        this.props.history.push(redirectToNoAccess.navigationLink);
        window.location.reload();
    }

    render() {
        const {errorCode, header, message, classNames, elements, goToPage, location={}} = this.props;
        const {state={}} = location;
        const {redirectToNoAccess} = state;
        return (
            <div className={classNames}>

                <div className="error-logo"></div>

                <h1>{header}</h1>
                <h4>{message}</h4>

                {
                    redirectToNoAccess === undefined && this.props.pages && browserHistory.length > 0
                        ? (
                            <Button
                                onClick={this.onBackClick}
                                className="goto-last"
                            >
                                {GO_BACK_TEXT}
                            </Button>
                        )
                        : null
                }

                {
                    goToPage
                        ? (
                            <Button
                                onClick={this.onGoToPageClick}
                                className="goto-plans"
                            >
                                {`${GO_TO_TEXT} ${goToPage.title}`}
                            </Button>
                        )
                        : null
                }

                {//redirect to -> if user doesn't have access to particular section in admin settings.
                    redirectToNoAccess
                        ? (
                            <Button
                                onClick={this.onGoToEmployeesClick}
                                className="goto-last"
                            >
                                {`${GO_TO_TEXT} ${redirectToNoAccess.internalName}`}
                            </Button>
                        )
                        : null
                }

                <p className="error-code">Error: {errorCode}</p>

                {elements}

            </div>
        );
    }
}

ErrorPage.propTypes = {
    goToPage: PropTypes.object.isRequired,
    header: PropTypes.string,
    message: PropTypes.any,
    errorCode: oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    pages: PropTypes.array
};