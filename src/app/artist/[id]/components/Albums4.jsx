"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { MainContextState } from "@/context/MainContext";
import { tokenAuth } from "@/tokens/tokenAuth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify';





export default function Albums4({ album}) {
    const { albumState, albumDispatch } = MainContextState();
    const [isClick, setIsClick] = useState(false);
    const albumData = album.topalbums.album;
    const artist = album.topalbums['@attr']['artist'];
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${getAuthToken()}`, 
        }
    }



    const submitData = async () => {
        const formData = albumState.item;
        try{
            const result = await axiosClientAPI.post(`user-album`, formData, config)
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
                setIsClick(false);
            }
            );    
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsClick(false);
            return;
        }  
    }

    useEffect(() => {
        isClick == true && submitData(); 
    }, [isClick]);
    
   
  
    
  return (
    <div className="pt-[3rem] pb-[2rem]">
        {/*  TITLE  */}
        <section className="mt-[2rem]">
            <h2 className="text-xl uppercase">Artist Albums</h2>
            <div className="flex items-center justify-between pb-[1.5rem]">
            <p className="text-slate-400">The current trending albums.</p>
            {/* PAGINATION */}
            <div className="flex items-center justify-end gap-3">
                <Link href={`/album/list/${encodeURIComponent(artist)}`} className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                View All
                </Link>
            </div>
            </div>
        </section>
        {/* GRID */}
        {albumData &&
            <section className="w-[100%] h-auto grid lg:grid-cols-4 grid-cols-2 gap-8">
                {/* COLUMN */}
                {albumData.map((item, i) => (
                <div className="group w-[100%] h-[22rem] rounded-2xl flex flex-col items-center justify-start">
                    <div className="rounded-2xl bg-blue-300 w-[100%] h-[13rem] mb-[0.7rem] overflow-hidden">
                       <img src={item.image[3]['#text']} className='object-cover w-full h-full' />
                    </div>
                    <h5 className="text-slate-400 text-center mb-[0.7rem]">{item?.name}</h5>
                    {getAuthToken() &&
                    <button className="hover:text-blue-400 mb-[0.8rem]" 
                        onClick={() => {
                            albumDispatch({
                                type: 'ADD_ITEM', 
                                payload: {
                                    image: item.image[3]['#text'],
                                    name: item.name,
                                    artist: item.artist.name,

                                    }
                                })
                            setIsClick(true);
                        }}> 
                        <FaHeart />
                    </button>
                    }
                    <Link href={`/artist/${encodeURIComponent(item?.artist?.name)}/album/${encodeURIComponent(item.name)}`} className="text-slate-300 group-hover:text-blue-300 transition-all">
                        Click for more.
                    </Link>
                </div>

                ))}
            </section>
        
        }
            
    </div>
  )
}
