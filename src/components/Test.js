import React, { PureComponent } from 'react'
import image from '../components/images/error.png'

class Test extends PureComponent {
    render() {
        return (
            <>
                <div className="flex justify-center">
                    <img src={image} className="h-screen w-screen "></img>
                </div>
            </>
        )
    }
}

export default Test;


