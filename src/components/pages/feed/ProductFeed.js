import React from 'react'


export default class ProductFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: props.products
        }
    }

 

    render() {
        console.log(this.state.products)
        return (
            <div className="h-screen">
                {this.state.products != undefined ? this.state.products.map(p => <h1>{p._id}</h1>) : "No Products"}
            </div>
        )
    }
}