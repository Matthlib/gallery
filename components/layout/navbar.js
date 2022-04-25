import Link from 'next/link'
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <nav className='bg-bluegrey place-content-center h-16 fixed top-0 z-20 w-full shadow-md shadow-blue/30'>
        <div className='flex items-center container justify-between m-auto h-full'>
            <a href='/homepage' className="text-white ml-3 md:ml-0"><div className='flex-col text-center'><p className="text-xl brand-1">ADARA</p><p className="text-md brand-2">SENTRIES</p></div></a>
            <div className='items-center space-x-7 brand-1 text-bluegrey hidden md:flex'>
                <ul className='flex space-x-5'>
                    <li><a href="/team" className='px-5 py-3 bg-slate-50 rounded-xl hover:bg-sky-700 transition duration-200 ease-in-out'>Team</a></li>
                    <li><a href="#" className='px-5 py-3 bg-slate-50 rounded-xl hover:bg-sky-700 transition duration-200 ease-in-out'>Galery</a></li>
                    <li><a href="/story" className='px-5 py-3 bg-slate-50 rounded-xl hover:bg-sky-700 transition duration-200 ease-in-out'>Story</a></li>
                </ul>
                <Link href="/mint"><a className='px-5 py-3 bg-slate-50 rounded-xl hover:bg-sky-700 transition duration-200 ease-in-out'><text>MINT</text></a></Link>
                <ul className='flex space-x-3'>
                    <li><a href="#"><img src="/discord.png" className='w-8'></img></a></li>
                    <li><a href="#"><img src="/instagram.png" className='w-8'></img></a></li>
                    <li><a href="#"><img src="/twitter.png" className='w-8'></img></a></li>
                </ul>
            </div>
            <div className="mr-10 flex md:hidden ">
							<button
								onClick={() => setIsOpen(!isOpen)}
								type="button"
								className="bg-blue-600 inline-flex items-center justify-center rounded-md text-white  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								{!isOpen ? (
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								) : (
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								)}
							</button>
						</div>
        </div>
        <Transition
					show={isOpen}
					enter="transition ease-out duration-100 transform"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="transition ease-in duration-75 transform"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					{(ref) => (
						<div className="md:hidden" id="mobile-menu">
							<div
								ref={ref}
								className="bg-bluegrey px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <ul className='flex-col'>
					<li className='w-100% py-1'><a href="/story" className='w-full'><div className='w-full'><p className='w-fit m-auto'>STORY</p></div></a></li>
                    <li className='w-100% py-1'><a href="/team" className='w-full'><div className='w-full'><p className='w-fit m-auto'>TEAM</p></div></a></li>
                    <li className='w-100% py-1'><a href="#" className='w-full'><div className='w-full'><p className='w-fit m-auto'>GALERY</p></div></a></li>
                    <li className='w-100% py-1'><a href="/mint" className='w-full'><div className='w-full'><p className='w-fit m-auto'>MINT</p></div></a></li>
					<ul className='flex space-x-3 m-auto w-fit pt-1'>
                    <li><a href="#"><div className='w-full'><img src="/discord.png" className='w-7'></img></div></a></li>
                    <li><a href="#"><div className='w-full'><img src="/instagram.png" className='w-7'></img></div></a></li>
                    <li><a href="#"><div className='w-full'><img src="/twitter.png" className='w-7'></img></div></a></li>
                </ul>
                </ul>							
				</div>
						</div>
					)}
		</Transition>
    </nav>
    )}
export default Navbar