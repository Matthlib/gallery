import Link from 'next/link'
import React, { useState } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <footer className='bg-bluegrey place-content-center h-fit w-full shadow-md shadow-blue/30 py-8'>
        <div className='m-auto md:flex-row container flex-col w-fit text-center'>
            <div className='flex-col'>
                <ul>
                    <li className='py-2'><a>Home</a></li>
                    <li className='py-2'><a>Story</a></li>
                    <li className='py-2'><a>Team</a></li>
                </ul>  
            </div>
            <div className='flex-col'>
                <ul>
                    <li className='py-2'><a>Twitter</a></li>
                    <li className='py-2'><a>Discord</a></li>
                    <li className='py-2'><a>Instagram</a></li>
                </ul>  
            </div>
        </div>
    </footer>
    )}
export default Navbar