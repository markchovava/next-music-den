"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image'
import { FaHeart } from "react-icons/fa";
import { MainContextState } from "@/context/MainContext";
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/tokens/tokenAuth";
import { toast, Bounce } from 'react-toastify';




export default function Artists4({ artists4 }) {
    const { artistState, artistDispatch } = MainContextState();
    const artistsData = artists4.artists.artist;
    const [isLike, setIsLike] = useState(false);
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${getAuthToken()}`, 
        }
    }

    const submitData = async () => {
        const formData = artistState.item;
        setIsLike(false);
        try{
            const result = await axiosClientAPI.post(`user-artist`, formData, config)
            .then((response) => {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setIsLike(false);
            }
            );    
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsLike(false);
            return;
        }  

    }

    useEffect(() => {
        isLike == true && submitData(); 
    }, [isLike]);
  



  return (
    <div className="pt-[3rem]">
    {/*  TITLE  */}
    <section>
        <h2 className="text-xl">Top Artists</h2>
        <div className="flex items-center justify-between pb-[1.5rem]">
        <p className="text-slate-400">The current trending artists.</p>
        <Link href='/artist' className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
            View All
        </Link>
        </div>
    </section>
    {/* GRID */}
    <section className="w-[100%] h-auto grid lg:grid-cols-4 grid-cols-2 gap-8">
        {/* COLUMN */}
        {artistsData.map((item, i) => (
            <Link key={i} href='#'>
                <div className="group w-[100%] h-[19rem] rounded-2xl flex flex-col items-center justify-start">
                <div className="rounded-2xl overflow-hidden bg-blue-300 w-[100%] h-[13rem] mb-[0.7rem]">
                    <Image src={item.image[3]['#text']} 
                        height={500} 
                        width={400} 
                        style={{ objectFit: 'cover' }}
                        alt={item.name} />
                </div>
                <h5 className="text-slate-400 text-center mb-[0.3rem]">{item?.name}</h5>
                {getAuthToken() && 
                <div className="text-sm w-[100%] text-slate-300 flex items-center justify-center gap-2 mb-[0.5rem]">
                    <button className="hover:text-blue-400" 
                        onClick={() => {
                            artistDispatch({
                                type: 'ADD_ITEM', 
                                payload: {
                                    image: item.image[3]['#text'],
                                    name: item.name,
                                    mbid: item.mbid,
                                    }
                                })
                            setIsLike(true);
                        }}> 
                        <FaHeart />
                    </button>
                </div>
                }
                <Link href={`/artist/${item.mbid}`} className="text-slate-300 group-hover:text-blue-300 transition-all">
                    Click for more.
                </Link>
                </div>
            </Link>
        ))}

       
    
    </section>
    </div>
  )
}
