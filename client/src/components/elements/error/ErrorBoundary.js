import React, { Component } from 'react';

import ErrorElement from './ErrorElement';

export default class ErrorBoundry extends Component{

    state = {
        hasError: false
    }

    componentDitCatch(){
        this.setState({
            hasError: true
        })
    }

    render(){
        if(this.state.hasError){
            return <ErrorElement />
        }

        return this.props.children;
    }
}