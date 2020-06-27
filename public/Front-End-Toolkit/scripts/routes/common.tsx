//import React from 'react'
//import ReactDOM from 'react-dom'
//import Example from '../_example'
const opennode = require('opennode');

export default {

    init() {

        opennode.setCredentials('23dfaa8b-4566-433a-ace0-bd05d5dfe797', 'dev');

        const charge = {
            description: 'My test charge',
            amount: 0.10, // required
            currency: 'USD',
            auto_settle: false
        };

        

        //callback_url: "https://example.com/webhook/opennode",
        //success_url: 'https://example.com/order/abc123',

        opennode.createCharge(charge)
            .then(charge => {
                console.log(charge);
            })
            .catch(error => {
                console.error(`${error.status} | ${error.message}`);
            });

    },

    finalize() {
      
        

    },

  }