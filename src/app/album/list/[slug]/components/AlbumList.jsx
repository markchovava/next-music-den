"use client"

import ApiKeys from "@/api/apiKeys";
import lastFM from "@/api/lastFm";
import { MainContextState } from "@/context/MainContext";
import { tokenAuth } from "@/tokens/tokenAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import axiosClientAPI from "@/api/axiosClientAPI";
import { toast, Bounce } from 'react-toastify';
import axios from "axios";



export default function AlbumList({ albums, slug }) {
    const albumsData = albums.topalbums;
    const { albumState, albumDispatch } = MainContextState();
    const [isClick, setIsClick] = useState(false);
    const { lastFmApiKey } = ApiKeys();
    const { lastFmUrl } = lastFM();
    const [data, setData] = useState(albumsData.album);
    const [prevPage, setPrevPage] = useState(Number(albumsData['@attr']['page']) - 1);
    const [nextPage, setNextPage] = useState(Number(albumsData['@attr']['page']) + 1);
    const { getAuthToken } = tokenAuth();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${getAuthToken()}`, 
      }
    };

    async function paginationHandler(pageNo) {
        console.log(pageNo)
        try{
           const result = await axios.get(`${lastFmUrl}method=artist.gettopalbums&artist=${slug}&api_key=${lastFmApiKey}&format=json&limit=12&page=${pageNo}`)
           .then((response) => {
                if(response.data.topalbums.album.length > 12){
                    setData(response.data.topalbums.album.slice(0,12));
                } else {
                    setData(response.data.topalbums.album.reverse());
                }
                setPrevPage(Number(response.data.topalbums['@attr']['page']) - 1);
                setNextPage(Number(response.data.topalbums['@attr']['page']) + 1);
           })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }    
    }

    /* ADDS TO USER COLLECTION */
    const submitData = async () => {
        const formData = albumState.item;
        console.log(formData)
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




    if(data?.length == 0 ){
        return (
        <div className="w-[100%] h-[20rem] flex items-center justify-center">
            <h6 className="">No data found...</h6>
        </div>
        )
    }


  return (
    <section className="w-[100%] h-auto lg:bg-transparent bg-gradient-to-tr from-slate-900 to-black">
    <div className="mx-auto w-[94%] h-[100%]">
    {/* -------------------- */}
    <div className="pt-[3rem]">
        {/*  HEADER  */}
        <section className="w-[100%] flex items-center justify-between mb-[2rem]">
            <div className="w-[50%] flex items-center justify-start font-bold">
                {albumsData['@attr']['artist']} {data.length}
            </div>
        
        <div className="flex items-center justify-end gap-3">
            {prevPage > 0 ?
                <button 
                    onClick={() => paginationHandler(Number(prevPage))}
                    className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                    Prev
                </button>
                : ''
            }
            {
                nextPage ?
                <button
                    onClick={() => paginationHandler(Number(nextPage)) }
                    className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                    Next
                </button>
                : ''
            }
        </div>
        </section>
        {/* GRID */}

        {data ? 
            <section className="w-[100%] h-auto grid lg:grid-cols-4 grid-cols-2 gap-8">
                {data?.map((item, i) => (
                    <div key={i} className="group w-[100%] h-[19rem] rounded-2xl flex flex-col items-center justify-start">
                        <div className="rounded-2xl bg-blue-300 w-[100%] h-[13rem] mb-[0.7rem] overflow-hidden">
                            <Image 
                                src={item?.image[3]['#text']} 
                                height={400} 
                                width={500} 
                                alt={item?.name} 
                                style={{objectFit: 'cover'}} />
                        </div>
                        <h5 className="text-slate-400 text-center mb-[0.7rem]">
                            {item?.name}
                        </h5>
                        {getAuthToken() &&
                        <div className="text-sm w-[100%] text-slate-300 flex items-center justify-center gap-2 mb-[0.5rem]">
                            <button className="hover:text-blue-400" 
                                onClick={() => {
                                    albumDispatch({
                                        type: 'ADD_ITEM', 
                                        payload: {
                                            image: item.image[3]['#text'],
                                            name: item.name,
                                            artist: item?.artist?.name,
                                            }
                                        }
                                    )
                                    setIsClick(true);
                                }}> 
                                <FaHeart />
                            </button>
                        </div>
                        }

                        <Link 
                            href={`/artist/${encodeURIComponent(item?.artist?.name)}/album/${encodeURIComponent(item.name)}`} 
                            className="text-slate-300 group-hover:text-blue-300 transition-all">
                                Click for more.
                        </Link>
                    </div>
                    
                ))}
            </section>
        : 
            <div className="w-[100%] h-[20rem] flex items-center justify-center">
                <h6 className="animate-pulse">Loading...</h6>
            </div>
        }
        {/*  PAGINATION  */}
        <section>
        <div className="flex items-center justify-end gap-3 pb-[2.5rem]">
            {prevPage > 0 ?
                <button 
                    onClick={() => paginationHandler(prevPage)}
                    className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                    Prev
                </button>
                : ''
            }
            {
                nextPage ?
                <button
                    onClick={() => paginationHandler(nextPage) }
                    className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                    Next
                </button>
                : ''
            }
        </div>
        </section>
    </div>
    
    </div>
</section>
  )
}
