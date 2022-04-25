import Navbar from '../../components/layout/navbar'
import { useState, useEffect } from 'react'

import Faq from '../../components/layout/faq'
import Footer from '../../components/layout/footer'
import { useRouter } from 'next/router'


export default function doodle() {
    const router = useRouter()
    const [status, setStatus] = useState(null);
    const [newId, setNewId] = useState(null);


    useEffect(() => {
        const init = async () => {
        }

        init()
    }, [])


    return (
        <div className='text-white w-screen'>
            <Navbar />
            <h1 className='m-auto mt-24 brand-1 text-4xl w-fit mb-12'>Games</h1>
            <section className='bg-gradient-to-b from-black to-blue h-19 justify-center w-screen px-10 py-20 max-w'>
                <div className='flex flex-col md:flex-row container m-auto '>
                    <div className='md:w-1/2 w-full'>
                        <h2 className='m-auto brand-1 text-4xl w-fit mb-12'>Games 1 </h2>
                        <br /><br />
                        {/* Status */}
                        {status && (
                            <div
                                className={`border ${status.success ? 'border-green-500' : 'border-brand-pink-400 '
                                    } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
                            >
                                <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                                    {status.message}
                                </p>
                            </div>
                        )}














                        <div className='md:w-1/2'>
                            <img src='/Planete_Astero_Vegeta-1.png'></img>
                        </div>
                    </div >
                </div >
            </section >
            <Footer />
        </div >

    )
}

