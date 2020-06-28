import React, { Component } from 'react';

interface AppProps {
    //code related to your props goes here
}

interface AppState {
    siteTitle: any, 
}

export default class Example extends Component<AppProps, AppState>  {

    constructor(props: any) {

        super(props)
        this.state = {
            siteTitle: 'React'
        }

    }

    componentDidMount() {

        this.setState({ siteTitle: 'React JS' })

    }

    render() {

        return (

            <span className="headline">
                {this.state.siteTitle}
            </span>

        );

    }

}