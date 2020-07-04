import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

interface props {}
interface state {
    volume: number,
    volumeX: number,
}

export default class LaserController extends Component<props, state> {

    constructor(props) {

        super(props)
        this.state = {
            volume: 50,
            volumeX: 50,
        }

    }

    handleOnChange = (value) => {

        this.setState({
            volume: value
        })

    }    

    handleChangeComplete = () => {

        fetch(`http://192.168.1.24/genericArgs?yMoveAmt=${this.state.volume}`)
        .then().then()

    }

    handleXOnChange = (value) => {

        this.setState({
            volumeX: value
        })

    }    

    handleXChangeComplete = () => {

        fetch(`http://192.168.1.24/genericArgs?xMoveAmt=${this.state.volumeX}`)
        .then().then()

    }

    handleClick = (e: any) => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        x = Math.trunc(x/4)
        y = Math.trunc(y/4)
        y = Math.abs(y - 180)
        console.log(`x: ${x}, y: ${y}`)
        this.handleXOnChange(x)
        this.handleOnChange(y)
        this.handleXChangeComplete()
        this.handleChangeComplete()
    }

    render() {

        let { volume } = this.state
        let { volumeX } = this.state
        return (
            <div>
                <img onClick={this.handleClick} src="http://192.168.1.52:8081/video" />
                <Slider
                    value={volume}
                    orientation="vertical"
                    onChange={this.handleOnChange}
                    onChangeComplete={this.handleChangeComplete}
                    min={0}
                    max={180}
                />
                <Slider
                    value={volumeX}
                    orientation="horizontal"
                    onChange={this.handleXOnChange}
                    onChangeComplete={this.handleXChangeComplete}
                    min={0}
                    max={180}
                />
            </div>
        )

    }

}