import React, { Component } from 'react';
import QRCode from 'qrcode'
import config from './config'
import io from './../../../node_modules/socket.io-client/dist/socket.io'

const axios = require('axios');

interface props {}
interface state {
    payreq: string,
    id: string,
    qrUrl: string,
    paid: boolean,
    loadText: string,
}

export default class LN_QR_Code extends Component<props, state> {

    constructor(props) {

        super(props)
        this.state = {
            payreq: "",
            id: "",
            qrUrl: "",
            paid: false,
            loadText: "Generating LN Invoice..."
        }

        this.createStrikeInvoice()
        this.checkForCompletedPayment()

    }

    checkForCompletedPayment() {

        let socket = io();
        socket.on('paid', response => {
            
            this.setState({ paid: true })
            alert("Payment recieved!")

        })

    }

    createStrikeInvoice() {

        axios({
            method: 'post',
            url: 'https://api.strike.acinq.co/api/v1/charges',
            data: {
                amount: 1,
                currency: 'btc',
                description: 'example charge',
            },
            auth: {
                username: config.STRIKE_API_KEY,
                password: config.STRIKE_PASSWORD,
            },
        }).then( (req) => {
            this.setState({ loadText: "" })
            this.setState({ payreq: req.data.payment_request })
            this.setState({ id: req.data.id })
            this.createQRCode( this.state.payreq )
        })

    }

    createQRCode(payreq) {

        QRCode.toDataURL(payreq)
            .then(url => {
                this.setState({ qrUrl: url })
            })
            .catch(err => {
                console.error(err)
            })
 
    }

    render() {

        return (

            <span className="headline">
                <h1>Invoice Address:</h1>
                <p>{this.state.payreq}</p>
                <span>{this.state.loadText}</span>
                <img src={this.state.qrUrl}></img>
                <p>Paid: {this.state.paid + ""}</p>
            </span>

        );

    }

}