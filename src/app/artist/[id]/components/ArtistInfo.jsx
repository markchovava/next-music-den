"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { MainContextState } from "@/context/MainContext";
import { tokenAuth } from "@/tokens/tokenAuth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify';





export default function ArtistInfo({ artist }) {
    const { artistState, artistDispatch } = MainContextState();
    const [isClick, setIsClick] = useState(false);
    const artistData = artist.artist;
    const { getAuthToken } = tokenAuth(); 
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`, 
        }
    };

    /* ADDS TO USER COLLECTION */
    const submitData = async () => {
        const formData = artistState.item;
        console.log(formData)
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
    <section className="w-[100%] pt-[2rem] bg-slate-950">
          
    <div className="mx-auto w-[94%] bg-slate-800 rounded-xl p-[2.5rem] ">
        <section className="w-[100%] text-slate-300 flex items-center justify-end gap-2 mb-[1.5rem]">
            {getAuthToken() &&
            <button className="hover:text-blue-400" 
                onClick={() => {
                    artistDispatch({
                        type: 'ADD_ITEM', 
                        payload: {
                            name: artistData?.name,
                            description: artistData?.bio?.summary,
                            mbid: artistData.mbid,
                            image: artistData.image[3]['#text'],
                        }
                    });
                    setIsClick(true);
                }}> 
                <FaHeart />
            </button>
            }
        </section>
        <section className="mx-auto w-[100%] flex lg:flex-row flex-col items-center justify-between gap-4">
            <div className="lg:w-[55%] w-[100%]">
                <h2 className="text-[3rem] font-extralight">
                    Artist Information
                </h2>
                <div className="w-[100%] flex items-start justify-start gap-3 mb-[1rem]">
                    <span className="w-[20%]">Name:</span>
                    <span className="w-[80%] px-3">
                        {artistData?.name}
                    </span>
                </div>
                <div className="w-[100%] flex items-start justify-start gap-3 ">
                    <span className="w-[20%]">Description:</span>
                    <span className="w-[80%] px-3">
                        {artistData?.bio?.summary}
                    </span>
                </div>
            
            </div>
            <div className="lg:w-[45%] w-[100%]">
                <div className="w-[80%] bg-white rounded-xl aspect-[5/4] border-[1rem] border-slate-400 overflow-hidden">
                    <Image
                        src={artistData.image[3]['#text']} 
                        width={500} 
                        height={400} 
                        style={{ objectFit: 'cover'}} />
                </div>
            </div>
        </section>
    </div>
    
  </section>
  )
}
