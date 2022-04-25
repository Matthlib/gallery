import Link from 'next/link'
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

function Faq(props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <div>
       <div>
       <div className="min-w-full flex">
							<button
								onClick={() => setIsOpen(!isOpen)}
								type="button"
								className=" m-auto min-w-full"
							>{props.question}
                </button></div>
       </div>

        <Transition
                show={isOpen}
                enter="transition ease-out duration-500 transform"
                enterFrom="opacity-100 scale-0"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div>
                        <div
                            ref={ref}
                            className="bg-bluegrey px-2 pt-2 pb-3 space-y-1"
                        >
                            {props.response}
                        </div>
                    </div>
                )}
    </Transition>
    </div>
)}
export default Faq