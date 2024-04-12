"use client"

import { FaHeart, FaRegHeart } from "react-icons/fa"
import Image from "next/image";
import { tokenAuth } from "@/tokens/tokenAuth";
import { MainContextState } from "@/context/MainContext";
import { useEffect, useState } from "react";
import axiosClientAPI from "@/api/axiosClientAPI";
import { toast, Bounce } from 'react-toastify';



export default function TrackView({ track }) {
    const { trackState, trackDispatch } = MainContextState();
    const [isClick, setIsClick] = useState(false);
    const trackData = track.track;
    const { getAuthToken } = tokenAuth(); 
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`, 
        }
    };

    /* ADDS TO USER COLLECTION */
    const submitData = async () => {
        const formData = trackState.item;
        try{
              const result = await axiosClientAPI.post(`user-track`, formData, config)
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
    <>
    <div className='w-[100%] bg-slate-700 rounded-xl p-[2rem] mb-[3rem]'>
        <section className="w-[100%] text-slate-300 flex items-center justify-end gap-2 mb-[1.5rem]">
            <button className="hover:text-blue-400" 
                onClick={() => {
                    trackDispatch({
                        type: 'ADD_ITEM', 
                        payload: {
                            name: trackData?.name,
                            artist: trackData?.artist.name,
                        }
                    });
                    setIsClick(true);
                }}> 
                <FaHeart />
            </button>
        </section>
        <section className="w-[100%] h-auto flex justify-between items-center gap-3">
            <div className="w-[55%]">
                <h3 className="text-4xl font-extralight mb-[1rem]">
                    Track Information
                </h3>
                <div className="w-[100%] flex justify-start gap-2 mb-[1rem]">
                    <div className="w-[25%]">Name:</div>
                    <div className="w-[75%]">{trackData?.name}</div>
                </div>
                <div className="w-[100%] flex justify-start gap-2 mb-[1rem]">
                    <div className="w-[25%]">Artist:</div>
                    <div className="w-[75%]">{trackData?.artist.name}</div>
                </div>
                <div className="w-[100%] flex justify-start gap-2 mb-[1rem]">
                    <div className="w-[25%]">Album:</div>
                    <div className="w-[75%]">{trackData?.album.title}</div>
                </div>
                {trackData?.toptags?.tag.length > 0 &&
                    <div className="w-[100%] flex justify-start gap-2 mb-[1rem]">
                        <div className="w-[25%]">Tags:</div>
                        <div className="w-[75%]">
                            { trackData?.toptags?.tag?.map((item, i) => (
                                (trackData.toptags?.tag?.length - 1) > i ? item.name + ', ' : item.name
                            ))}
                        </div>
                    </div>
                }
            </div>
            <div className="w-[45%] flex items-center justify-center">
                <div className="overflow-hidden w-[80%] aspect-[5/4] rounded-xl drop-shadow-xl">
                    <Image src={trackData.album.image[3]['#text']} width={1000} height={800} style={{objectFit: 'cover'}}/>
                </div>
            </div>
        </section>
    </div>
    </>
  )
}