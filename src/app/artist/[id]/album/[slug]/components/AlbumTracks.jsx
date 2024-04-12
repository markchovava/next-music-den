"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import { MainContextState } from "@/context/MainContext";
import { tokenAuth } from "@/tokens/tokenAuth";
import { durationFormat } from "@/utils/durationFormat";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify';



export default function AlbumTracks({ album}) {
    const tracksData = album.album?.tracks?.track;
    const { trackState, trackDispatch } = MainContextState();
    const [isClick, setisClick] = useState(false);
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`, 
        }
    };


    /* ADDS TO TO USER COLLECTION */
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
                  setisClick(false);
              }
            );    
          } catch (error) {
              console.error(`Error: ${error}`);
              console.error(`Error Message: ${error.message}`);
              console.error(`Error Response: ${error.response}`);
              setisClick(false);
              return;
          }
    }
  

    useEffect(() => {
        isClick == true && submitData(); 
    }, [isClick]);



  return (
    <section className="w-[100%] h-auto lg:bg-transparent bg-slate-950">
    <div className="mx-auto w-[94%] h-[100%]">
        {/* --------    SONGS   ------------ */}
        <div className=" pb-[4rem]">
            {/*  TITLE  */}
            <section className="mt-[3rem]">
                <h2 className="text-xl uppercase mb-[1rem]"> Songs ({tracksData.length})</h2>
            </section>
            {/* GRID */}
            <section className="w-[100%] h-auto flex flex-col gap-2 mb-[1.5rem] text-slate-300">
                {tracksData.map((item, i) => (
                    <div key={i} className="w-[100%] flex items-center justify-start gap-3 border-b border-slate-700 hover:bg-slate-900 px-[0.5rem] py-[0.7rem]">
                        <div className="w-[70%]">
                            <Link href={`/artist/${encodeURIComponent(item.artist.name)}/track/${encodeURIComponent(item.name)}`}>
                                <p className="mb-1 hover:text-blue-400">{item.name}</p>
                                <small>{item.artist?.name}</small>
                            </Link>
                        </div>
                        <div className="w-[20%]">{item.duration ? durationFormat(item.duration) : 'Not added.'}</div>
                        {getAuthToken() &&
                        <div className="w-[10%] flex items-center justify-end gap-2">
                            <button className="hover:text-blue-400" 
                                onClick={() => {
                                    trackDispatch({
                                        type: 'ADD_ITEM', 
                                        payload: {
                                            name: item.name,
                                            artist: item.artist.name,
                                        }
                                    });
                                    setisClick(true);
                                }}> 
                                <FaHeart />
                            </button>
                        </div>
                        }
                    </div>
              
                ))}
              
              
            </section>
            
        </div>
        
     
    
    </div>
  </section>
  )
}
