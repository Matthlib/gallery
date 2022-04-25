import Navbar from '../components/layout/navbar'
import { useState, useEffect } from 'react'
import Faq from '../components/layout/faq'
import Footer from '../components/layout/footer'
import { useRouter } from 'next/router'


export default function games1() {
    const router = useRouter()
    const [status, setStatus] = useState(null);
    const [newId, setNewId] = useState(null);


    useEffect(() => {
        const init = async () => {
        }

        init()
    }, [])


    function quest1(discordID) {
        if (!discordID){
            setStatus({
                success: false,
                message: 'To be able to play, you need to write your id'
            })
        }
        else {
            router.push({
                pathname: '/gallery',
                query: { name: discordID }
            })

        }
    }


    function quest2(discordID) {
        if (!discordID){
            setStatus({
                success: false,
                message: 'To be able to play, you need to write your id'
            })
        }
        else {
            router.push('/games/DoodleJump/index.html',{ uid: discordID })
            //router.push('/gallery?uid='+discordID)
        }
        
    }


    function quest3(discordID) {
        if (!discordID){
            setStatus({
                success: false,
                message: 'To be able to play, you need to write your id'
            })
        }
        else {
            router.push('/games/memory',{ uid: discordID })
            //router.push('/gallery?uid='+discordID)
        }
    }


    function quest4(discordID) {
        if (!discordID){
            setStatus({
                success: false,
                message: 'To be able to play, you need to write your id'
            })
        }
        else {
            router.push('/games/pacman',{ uid: discordID })
            //router.push('/gallery?uid='+discordID)
        }
    }


    function quest5(discordID) {
        if (!discordID){
            setStatus({
                success: false,
                message: 'To be able to play, you need to write your id'
            })
        }
        else {
            //router.push('/gallery',{ uid: discordID })
            //router.push('/gallery?uid='+discordID)
        }
    }


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
                        <br /><br />
                        <label for="name">Please put your Discord Name  </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter Discord ID"
                            onChange={(e) => setNewId(e.target.value)}
                        />
                        <div>


                            <br /><br />
                            < button class="hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                onClick={() => quest1(newId)}>
                                Quest 1  </button>

                        </div>

                        <div>
                            <br /><br />
                            < button class="hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                onClick={() => quest2(newId)}>
                                Quest 2  </button>
                        </div>

                        <div>
                            <br /><br />
                            < button class="hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                onClick={() => quest3(newId)}>
                                Quest 3  </button>
                        </div>

                        <div>
                            <br /><br />
                            < button class="hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                onClick={() => quest4(newId)}>
                                Quest 4  </button>
                        </div>

                        <div>
                            <br /><br />
                            < button class="hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                onClick={() => quest5(newId)}>
                                Quest 5  </button>
                        </div>

                        {/*

                        Jeux a coller ici



                        */}
                    </div>
                    <div className='md:w-1/2'>
                        <img src='/Planete_Astero_Vegeta-1.png'></img>
                    </div>
                </div >

            </section >
            <Footer />
        </div >

    )
}
