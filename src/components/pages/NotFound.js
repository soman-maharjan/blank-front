import React, { PureComponent } from 'react'
import image from '../images/error.png'

class NotFound extends PureComponent {
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

export default NotFound;
