"use client"
import ApiKeys from "@/api/apiKeys";
import axiosClientAPI from "@/api/axiosClientAPI";
import lastFM from "@/api/lastFm";
import { MainContextState } from "@/context/MainContext";
import { tokenAuth } from "@/tokens/tokenAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify';




export default function ArtistList({ artist }) {
    const { artistState, artistDispatch } = MainContextState();
    const [isLike, setIsLike] = useState(false);
    const { lastFmApiKey } = ApiKeys();
    const { lastFmUrl } = lastFM();
    const artistsData = artist.artists;
    const [data, setData] = useState(artistsData.artist);
    const [prevPage, setPrevPage] = useState(artistsData['@attr']['page'] - 1);
    const [nextPage, setNextPage] = useState(artistsData['@attr']['page'] + 1);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const { getAuthToken } = tokenAuth();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${getAuthToken()}`, 
      }
    };

    async function paginationHandler(pageNo) {
        try{
           const result = await axios.get(`${lastFmUrl}method=chart.gettopartists&api_key=${lastFmApiKey}&format=json&limit=12&page=${pageNo}`)
           .then((response) => {
                setData(response.data.artists.artist.reverse())
                setPrevPage(Number(response.data.artists['@attr']['page']) - 1)
                setNextPage(Number(response.data.artists['@attr']['page']) + 1)
           })
        } catch (error) {
           console.error(`Error: ${error}`);
        }    
    }

    /* SEARCH ARTIST ON LAST.FM */
    async function searchData(){
        try{
            const result = await axios.get(`${lastFmUrl}method=artist.search&artist=${search}&api_key=${lastFmApiKey}&format=json&limit=12&page=1`)
            .then((response) => {
                setData(response.data.results.artistmatches.artist)
                setIsSearch(false)
            })
         } catch (error) {
            console.error(`Error: ${error}`);
            setIsSearch(false)
         }  
    }

    /* ADDS TO USER COLLECTION */
    const submitData = async () => {
        const formData = artistState.item;
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
        isSearch && searchData();
    }, [isSearch]);

  
    useEffect(() => {
        isLike == true && submitData(); 
    }, [isLike]);

   
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
                <div className="w-[50%] flex items-center justify-start">
                    <input 
                        type="text"
                        name="search" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Enter the Artist name here..."
                        className="bg-transparent rounded-l-xl w-[70%] h-[2.6rem] outline-none border-l border-y border-slate-600 px-3 py-2" />
                    <button 
                        onClick={() => setIsSearch(true)}
                        className="group flex items-center justify-center text-center h-[2.6rem] px-3 py-3 border-slate-600 rounded-r-xl outline-none border">
                        { isSearch === true ? 
                            'Processing' : 
                            <FaSearch className="text-lg group-hover:text-slate-300" />
                        }
                    </button>
                </div>
            
            <div className="flex items-center justify-end gap-3">
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
                            <Link 
                                href={`/artist/${item?.mbid}`} 
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
