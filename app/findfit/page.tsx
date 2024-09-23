"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaShoppingBag, FaHeart,FaCamera } from 'react-icons/fa';

export default function Page() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [userText, setUserText] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSubscribe = () => {
        alert(`Subscribed with ${email}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-center">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: "url('/Images/wardrobe5.png')" }}>
            </div>
            <div className="absolute inset-0 bg-black opacity-10">
            </div>
            <div className="m-10">
                <div className="flex flex-row justify-between">

                    <div className="text-black text-3xl flex flex-col font-serif z-10">
                        <Link href="/main"><button>Match Your FIT</button> </Link>
                    </div>
                    <div className="flex items-center gap-5 z-10">
                        <Link href="/camera"><button>
                            <FaCamera/>
                        </button></Link>
                            <button className="flex">
                                <FaHeart />
                            </button>
                        
                        <button><FaShoppingBag /></button>
                    </div>
                </div>
                <div className="mt-10 mr-40 flex  ">
                    <div className="flex gap-10 font-serif z-10">
                        <h1>Height: <input
                            type="number"
                            // value={email}
                            placeholder=" "
                            className="w-16  border border-black rounded-3xl-md focus:outline-none "
                        /></h1>
                        <h1>Skin Colour: <input
                            type="text"
                            // value={email}
                            placeholder=" "
                            className="w-16  border border-black rounded-3xl-md focus:outline-none"
                        /></h1>
                    </div>
                </div>
                <div className="mt-10 mr-40 flex  ">
                    <div className="flex gap-10 font-serif z-10">
                        <h1>Gender: <input
                            type="text"
                            // value={email}
                            placeholder=" "
                            className="w-16  border border-black rounded-3xl-md focus:outline-none mr-14"
                        /></h1>
                        <h1>Age: <input
                            type="number"
                            // value={email}
                            placeholder=" "
                            className="w-16  border border-black rounded-3xl-md focus:outline-none "
                        /></h1>
                    </div>
                </div>


                <div className="flex flex-col  mt-10 mr-52">
                    <div className="flex  z-10 text-3xl font-serif ">Outfit You Think</div>
                    <div className="flex  mt-10 font-serif z-10">
                        <h1>Shirt Colour: <input
                            type="text"
                            // value={email}
                            placeholder=" "
                            className="w-16  border border-black rounded-3xl-md focus:outline-none mr-14"
                        /></h1>
                    </div>
                    <div className="flex  mt-10 font-serif z-10">
                        <h1>Trouser Colour: <input
                            type="text"
                            // value={email}
                            placeholder=" "
                            className="w-16  border border-black rounded-3xl-md focus:outline-none mr-14"
                        /></h1>
                    </div>
                    <div className="flex  mt-10 font-serif z-10">
                        <h1>Shoe Colour: <input
                            type="text"
                            // value={email}
                            placeholder=" "
                            className="w-16  border border-black rounded-3xl-md focus:outline-none mr-14"
                        /></h1>
                    </div>
                </div>
                <div className="flex mr-72 mt-10">
                    <button
                        
                        className="bg-black text-white p-2 w-32 z-10"
                    >
                        Search
                    </button>
                </div>
            </div>
            
                
            </div>
        
    );
}
