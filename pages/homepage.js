import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/layout/navbar'
import { config } from '../dapp.config'
import Faq from '../components/layout/faq'
import Footer from '../components/layout/footer'

export default function Home() {
    // document.getElementById('vid').play();

    return (
        <div className='text-white w-screen'>
            <Navbar/>
            <section className='w-full overflow-x-hidden'>
            <div className='w-full'>
                <video autoPlay muted loop className='object-cover h-full w-full absolute md:max-w-10xl' id='vid'>
                    <source src='/vid.mp4' type='video/mp4'/>
                </video>
            </div>
            <div className='flex items-center h-screen bg-black'>
                <h1 className='z-10 flex-col m-auto text-center text-4xl md:text-8xl text-white pt-20'>
                    <p className='brand-1 text-5xl md:text-9xl'>ADARA</p>
                    <p className='brand-2'>SENTRIES</p>
                </h1>
            </div>
            </section>      
            <section className='bg-gradient-to-b from-black to-blue h-19 justify-center w-screen px-10 py-20'>
                <div className='flex flex-col md:flex-row container m-auto items-center'>
                    <div className='md:w-1/2 w-full'>
                        <h2 className='m-auto brand-1 text-4xl w-fit mb-12'>STORY</h2>
                        <p className='mb-16 text-justify'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <div className='m-auto w-fit'><a href="#" className='px-10 py-8 m-auto bg-slate-50 rounded-xl hover:bg-sky-700 transition duration-200 ease-in-out brand-1 text-bluegrey'>More details</a></div>
                    </div>
                    <div className='md:w-1/2'>
                        <img src='/Planete_Astero_Vegeta-1.png'></img>
                    </div>
                </div>
            </section>
            <section className='bg-gradient-to-b from-blue to-purp py-20'>
                <div className='flex container m-auto items-center flex-col-reverse md:flex-row md:container md:m-auto'>
                    <div className='flex-col'>
                        <img src='/Perso_Fond_Transparent__v002.png' className='mb-16'></img>
                        <div className='m-auto w-fit'><a href="#" className='m-auto px-10 py-8 mb-8 bg-slate-50 rounded-xl hover:bg-sky-700 transition duration-200 ease-in-out brand-1 text-bluegrey'>MINT</a></div>
                    </div>
                    <div className='md:min-w-1/2 max-w-screen md:px-2 px-10'>
                        <h2 className='m-auto brand-1 text-4xl w-fit mb-12'>ROADMAP</h2>
                        <div>
                            <h3 className='pb-2 text-2xl brand-2 m-auto w-fit'>STEP 1</h3>
                            <p className='mb-10 text-justify'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                        <div>
                            <h3 className='pb-2 text-2xl brand-2 m-auto w-fit'>STEP 2</h3>
                            <p className='mb-10 text-justify'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                        <div>
                            <h3 className='pb-2 text-2xl brand-2 m-auto w-fit'>STEP 3</h3>
                            <p className='mb-10 text-justify'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                        <div>
                            <h3 className='pb-2 text-2xl brand-2 m-auto w-fit'>STEP 4</h3>
                            <p className='mb-10 text-justify'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className=''>
                <div className='w-full h-fit transform hover:-translate-x-100 transition duration-1000 py-3 bg-bluegrey border-blue'>
                    <span className=''>
                    ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT! ALERT!
                    </span>
                </div>
            </section>
            <section className='bg-purp py-24'>
                <div className='container m-auto'>
                    <h2 className='m-auto brand-1 text-4xl w-fit mb-12'>FAQ</h2>
                    <div className='m-auto faq-section'>
                        <div className=''>  
                            <Faq response="test ets tes te s" question="WHAT IS ADARA SENTIRES"/>
                        </div>
                        <div className='border-t-2 border-bluegrey'>
                            <Faq response="test ets tes te s" question="HOW"/>
                        </div>
                        <div className='border-t-2 border-bluegrey'>
                            <Faq response="test ets tes te s" question="HOW"/>
                        </div>                        
                        <div className='border-t-2 border-bluegrey'>
                            <Faq response="test ets tes te s" question="HOW"/>
                        </div>                        
                    </div>
                </div>
            </section>
            <Footer/>

        </div>
    )
}