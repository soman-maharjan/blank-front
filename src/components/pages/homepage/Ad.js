import axios from 'axios'
import React, { Component } from 'react'

export class Ad extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ads: [],
            adLoading: false,
            images: [],
            left: "",
            topRight: "",
            bottomRight: ""
        }
    }


    componentDidMount() {
        axios.get('api/ad/active-ad')
            .then(response => {
                const left = response.data.filter(d => d.position === "left-ad")[0]
                const topRight = response.data.filter(d => d.position === "top-right-ad")[0]
                const bottomRight = response.data.filter(d => d.position === "bottom-right-ad")[0]
                this.setState({
                    ...this.state,
                    ads: response.data,
                    adLoading: true,
                    left: process.env.REACT_APP_IMAGE_URL + left.filename,
                    topRight: process.env.REACT_APP_IMAGE_URL + topRight.filename,
                    bottomRight: process.env.REACT_APP_IMAGE_URL + bottomRight.filename
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            this.state.adLoading ?
                <div className="my-10 mx-14">
                    <div className="grid grid-rows-3 grid-flow-col gap-2 h-96">
                        <div className="row-span-3 bg-red-200 h-96" style={{ backgroundImage: `url(${this.state.left})`, backgroundRepeat: `no-repeat`, backgroundSize: `contain`, backgroundSize: `100% 100%` }}></div>
                        <div className="col-span-2 bg-green-200" style={{ backgroundImage: `url(${this.state.topRight})`, backgroundRepeat: `no-repeat`, backgroundSize: `contain`, backgroundSize: `100% 100%` }}></div>
                        <div className="row-span-2 col-span-2 bg-blue-200" style={{ backgroundImage: `url(${this.state.bottomRight})`, backgroundRepeat: `no-repeat`, backgroundSize: `contain`, backgroundSize: `100% 100%` }}></div>
                    </div>
                </div >
                : null
        )
    }
}

export default Ad



