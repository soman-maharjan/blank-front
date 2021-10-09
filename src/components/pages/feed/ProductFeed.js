import React from 'react'


export default class ProductFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : "Soman"
        }
    }

    render() {
        return (
            <div className="h-screen">
                {this.state.name}
            </div>
        )
    }
}