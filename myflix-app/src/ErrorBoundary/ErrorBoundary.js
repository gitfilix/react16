import React, { Component } from 'react';



class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true,
            errorMessage: error
        });
    }


    render () {
        if (this.state.hasError) {
            console.log("state: Error");
            return <h1>{this.state.errorMessage.toString()}</h1>
        } else {
            // default case
            return this.props.children;
        }
    }
}
export default ErrorBoundary;
