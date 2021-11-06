import React from "react";

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasErrored: false,
        };
    };

    static getDerivedStateFromError(error) {
        return { hasErrored: true };
    };

    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
    }

    render() {
        return this.state.hasErrored ? (
            <ErrorImageOverlay>
                <ErrorImageContainer imageUrl={"https://i.imgur.com/yW2W9SC.png"} />
                <ErrorImageText>This page is broken.</ErrorImageText>
            </ErrorImageOverlay>
        )
            :
            this.props.children;
    }
}

export default ErrorBoundary;