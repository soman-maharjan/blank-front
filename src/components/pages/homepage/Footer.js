import React from 'react';
import facebookIcon from '../../../icons/facebook.png';
import instagramIcon from '../../../icons/instagram.png';
import twitterIcon from '../../../icons/twitter.png';
import youtubeIcon from '../../../icons/youtube.png';
import esewa from '../../images/esewa.png';
import khalti from '../../images/khalti.png';


export default function Footer() {
    return (
        <div>
            <div className="grid grid-cols-3 gap-4 bg-white mt-4 text-lg">
                <div className="mb-28 mt-4">
                    <h4 className="font-extralight">ABOUT</h4>
                    <p className="">Blank</p>
                </div>
                <div className="mt-4">
                    <h4 className="font-extralight ">WE ACCEPT</h4>
                    <div className="p-4 flex gap-4 justify-center">

                        <img src={esewa} alt="Esewa" className="w-20" />
                        <img src={khalti} alt="Khalti" className="w-20" />
                    </div>

                </div>
                <div>
                    <h1 className="mt-4 font-thin">CONNECT WITH US</h1>
                    <div className="p-4 flex gap-4 justify-center">
                        <img src={facebookIcon} alt="Facebook" className="w-6" />
                        <img src={instagramIcon} alt="Instagram" className="w-6" />
                        <img src={twitterIcon} alt="Twitter" className="w-6" />
                        <img src={youtubeIcon} alt="Youtube" className="w-6" />
                    </div>
                </div>
            </div>
        </div>
    )
}
