"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { MainContextState } from "@/context/MainContext";
import { tokenAuth } from "@/tokens/tokenAuth";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify';




export default function AlbumInfo({ album }) {
    const { albumState, albumDispatch } = MainContextState();
    const [isClick, setIsClick] = useState(false);
    const albumData = album?.album;
    const { getAuthToken } = tokenAuth(); 
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`, 
        }
    };

    /* ADDS TO USER COLLECTION */
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
    <section className="w-[100%] h-auto pt-[2rem] bg-slate-950">
        <div className="mx-auto w-[94%] bg-slate-700 rounded-xl p-[2rem] ">
            <section className="w-[100%] text-slate-300 flex items-center justify-end gap-2 mb-[1.5rem]">
                {getAuthToken() &&
                <button className="hover:text-blue-400" 
                    onClick={() => {
                        albumDispatch({
                            type: 'ADD_ITEM', 
                            payload: {
                                name: albumData?.artist,
                                artist: albumData?.artist,
                                image: albumData?.image[3]['#text'],
                            }
                        });
                        setIsClick(true);
                    }}> 
                    <FaHeart />
                </button>
                }

            </section>
            <section className="w-[100%] flex lg:flex-row flex-col items-center justify-between gap-4">
                <div className="lg:w-[55%] w-[100%]">
                    <h2 className="text-[3rem] font-extralight">Album Information</h2>
                    <div className="flex items-center justify-start gap-3 mb-[1rem]">
                        <span className="w-[25%]">Album Name:</span>
                        <span className="w-[75%]">{albumData?.name}</span>
                    </div>
                    <div className="flex items-center justify-start gap-3 mb-[1rem]">
                        <span className="w-[25%]">Album Artist:</span>
                        <span className="w-[75%]">{albumData?.artist}</span>
                    </div>  
                </div>
                <div className="lg:w-[45%] w-[100%]">
                    <div className="w-[80%] rounded-xl aspect-[5/4] border-[1rem] border-white bg-white overflow-hidden drop-shadow-lg">
                        <img src={albumData?.image[3]['#text']} className="w-[100%] h-[100%] bg-white drop-shadow-lg rounded-xl object-cover" />
                    </div>
                </div>
            </section>
        </div>
    </section>
  )
}
