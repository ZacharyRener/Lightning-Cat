import React, { Component } from 'react';
import QRCode from 'qrcode'
require('dotenv').config();

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

        this.createStrikeInvoice();

    }

    checkForCompletedPayment() {

        const interval = setInterval(()=>{

            axios({
                method: 'get',
                url: 'https://api.strike.acinq.co/api/v1/charges/' + this.state.id,
                auth: {
                    username: process.env.STRIKE_API_KEY,
                    password: process.env.STRIKE_PASSWORD
                },
            }).then( (res) => {
                console.log("Paid: ", res.data.paid)
                if(res.data.paid){
                    this.setState({ paid: res.data.paid })
                    alert("Payment Recieved!")
                    clearInterval(interval)
                }
            })

        }, 1000)

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
                username: process.env.STRIKE_API_KEY,
                password: process.env.STRIKE_PASSWORD,
            },
        }).then( (req) => {
            this.setState({ loadText: "" })
            this.setState({ payreq: req.data.payment_request })
            this.setState({ id: req.data.id })
            this.createQRCode( this.state.payreq )
            this.checkForCompletedPayment()
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