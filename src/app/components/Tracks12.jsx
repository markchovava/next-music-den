"use client";
import axiosClientAPI from "@/api/axiosClientAPI";
import { MainContextState } from "@/context/MainContext";
import { tokenAuth } from "@/tokens/tokenAuth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify';



export default function Tracks12({ tracks12 }) {
    const { trackState, trackDispatch } = MainContextState();
    const tracksData = tracks12.tracks.track;
    const [isLike, setIsLike] = useState(false);
    const { getAuthToken } = tokenAuth();
    /* AXIOS HEADERS */
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${getAuthToken()}`, 
      }
    };

    /* ADD TRACK TO USER COLLECTION */
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
    <div className="pt-[3rem] pb-[4rem]">
    {/*  TITLE  */}
    <section className="mt-[2rem]">
      <h2 className="text-xl">Top Trending Songs</h2>
      <div className="flex items-center justify-between pb-[1.5rem]">
        <p className="text-slate-400">The current top trending songs.</p>
        <Link href='/track' className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
          View All
        </Link>
      </div>
    </section>
    {/* GRID */}
    <section className="w-[100%] h-auto grid lg:grid-cols-4 grid-cols-2 gap-8">
      {/* COLUMN */}
      {tracksData.map((item, i) => (
            <div key={i} className="group w-[100%] h-[22rem] rounded-2xl flex flex-col items-center justify-start">
            <div className="rounded-2xl bg-blue-300 w-[100%] h-[13rem] mb-[0.7rem] overflow-hidden">
                <Image 
                  src={item.image[3]['#text']} 
                  height={400} 
                  width={500} 
                  style={{objectFit: 'cover'}} 
                />
            </div>
            <h5 className="text-slate-400 text-center mb-[0.2rem]">
              {item.name?.slice(0, 20)}
            </h5>
            <small className="text-slate-400 text-center mb-[0.3rem]">
              {item.artist.name}
            </small>
            {getAuthToken() &&
            <div className="text-sm w-[100%] text-slate-300 flex items-center justify-center gap-2 mb-[0.5rem]">
                <button className="hover:text-blue-400" 
                    onClick={() => {
                        trackDispatch({
                            type: 'ADD_ITEM', 
                            payload: {
                                name: item.name,
                                artist: item.artist.name,
                                image: item.image[3]['#text'],
                              }
                          });
                        setIsLike(true);
                    }}> 
                    <FaHeart />
                </button>
            </div>
            }
            <Link 
              href={`/artist/${encodeURIComponent(item.artist.name)}/track/${encodeURIComponent(item.name)}`} 
              className="text-slate-300 group-hover:text-blue-300 transition-all">
                  Click for more.
            </Link>
            </div>
      ))}
      
    </section>
  </div>
  )
}
