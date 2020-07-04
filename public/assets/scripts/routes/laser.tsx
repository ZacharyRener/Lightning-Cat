import React from 'react'
import ReactDOM from 'react-dom'
import LaserController from './../_laser-control'

export default {

    init() {
        
        ReactDOM.render(
            <LaserController />,
            document.getElementById("root")
        )

    },

    finalize() {
      
        

    },

}