"use client"
import ApiKeys from "@/api/apiKeys";
import axiosClientAPI from "@/api/axiosClientAPI";
import lastFM from "@/api/lastFm";
import { MainContextState } from "@/context/MainContext";
import { tokenAuth } from "@/tokens/tokenAuth";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify';



export default function ArtistTracks({ tracks }) {
    const { trackState, trackDispatch } = MainContextState();
    const [isClick, setIsClick] = useState(false);
    const { lastFmApiKey } = ApiKeys();
    const { lastFmUrl } = lastFM();
    const [prevPage, setPrevPage] = useState(Number(tracks.toptracks['@attr']['page']) - 1);
    const [nextPage, setNextPage] = useState(Number(tracks.toptracks['@attr']['page']) + 1);
    const [tracksData, setTracksData] = useState(tracks.toptracks.track);
    const { getAuthToken} = tokenAuth(); 
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`, 
        }
    };
 
    /* PAGINATION DATA */
    async function paginationHandler(pageNo) {
        setTracksData([]);
        const artist = encodeURIComponent(tracks.toptracks['@attr']['artist']);
        try{
           const result = await axios.get(`${lastFmUrl}method=artist.gettoptracks&artist=${artist}&api_key=${lastFmApiKey}&format=json&limit=12&page=${pageNo}`)
           .then((response) => {
                if(response.data.toptracks.track.length > 12){
                    setTracksData(response.data.toptracks.track.splice(12,24))
                }
                setTracksData(response.data.toptracks.track.reverse())
                setPrevPage(Number(response.data.toptracks['@attr']['page']) - 1)
                setNextPage(Number(response.data.toptracks['@attr']['page']) + 1)
                console.log(response.data.toptracks['@attr']['page'])
           })
        } catch (error) {
           console.error(`Error: ${error}`)
        }    
    }


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
    <div className=" pb-[4rem]">
        {/*  TITLE  */}
        <section className="mt-[1rem]">
            <div className="flex items-center justify-between pb-[1.5rem]">
                <div className="flex items-center justify-start">
                    <h2 className="text-xl uppercase">Songs ({tracksData.length})</h2>
                </div>
                {/* PAGINATION */}
                <div className="flex items-center justify-end gap-3">
                    { prevPage ?
                        <button 
                            onClick={() => paginationHandler(prevPage)}
                            className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                            Prev
                        </button>
                        : ''
                    }
                    {nextPage ? 
                        <button
                            onClick={() => paginationHandler(nextPage)} 
                            className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                            Next
                        </button>
                        : ''
                    }
                </div>
            </div>
        </section>
        {/* GRID */}
        <section className="w-[100%] h-auto flex flex-col gap-2 mb-[1.5rem] text-slate-300">
            {tracksData.length > 0 ?
            <>
                {tracksData.map((item, i) => (
                   
                <div className="w-[100%] flex items-center justify-start gap-3 border-b border-slate-700 hover:bg-slate-900 px-[0.5rem] py-[0.7rem]">
                    <div className="w-[70%]">
                        <Link href={`/artist/${encodeURIComponent(item.artist.name)}/track/${encodeURIComponent(item.name)}`}>
                            <p className="mb-1 hover:text-blue-400">{item.name}</p>
                            <small>{item.artist?.name}</small>
                        </Link>
                    </div>
                    <div className="w-[20%]"></div>
                    <div className="w-[10%] flex items-center justify-end gap-2">
                        { getAuthToken() &&
                            <button className="hover:text-blue-400" 
                                onClick={() => {
                                    trackDispatch({
                                        type: 'ADD_ITEM', 
                                        payload: {
                                            name: item.name,
                                            artist: item.artist.name,
                                            image: item.image[1]['#text'],
                                        }
                                    });
                                    setIsClick(true);
                                }}> 
                                <FaHeart />
                            </button>
                        }
                    </div>
                </div>
                    
                ))}
            </>
            :
            <div className="w-[100%] h-[15rem] flex items-center justify-center">
                <h6 className="animate-pulse">Loading...</h6>
            </div>
            }
           
        </section>
        {/* PAGINATION */}
        <div className="flex items-center justify-end gap-3">
            { prevPage ?
                <button 
                    onClick={() => paginationHandler(prevPage)}
                    className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                    Prev
                </button>
                : ''
            }
            {nextPage ? 
                <button
                    onClick={() => paginationHandler(nextPage)} 
                    className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                    Next
                </button>
                : ''
            }
        </div>
    </div>
  )
}
