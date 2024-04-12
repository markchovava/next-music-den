"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import Link from "next/link";
import ApiKeys from "@/api/apiKeys";
import lastFM from "@/api/lastFm";
import { MainContextState } from "@/context/MainContext";
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/tokens/tokenAuth";
import { toast, Bounce } from 'react-toastify';




export default function TrackList({ tracks }) {
    const { trackState, trackDispatch } = MainContextState();
    const [isClick, setisClick] = useState(false);
    const { lastFmApiKey } = ApiKeys();
    const { lastFmUrl } = lastFM();
    const tracksData = tracks.tracks;
    console.log(tracksData)
    const [data, setData] = useState(tracksData.track);
    const [prevPage, setPrevPage] = useState(Number(tracksData['@attr']['page']) - 1);
    const [nextPage, setNextPage] = useState(Number(tracksData['@attr']['page']) + 1);
    const [search, setSearch] = useState();
    const { getAuthToken} = tokenAuth(); 
    const [isSearch, setIsSearch] = useState(false);
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`, 
        }
    };

    /* PAGINATION DATA */
    async function paginationHandler(pageNo) {
        setData([]);
        try{
           const result = await axios.get(`${lastFmUrl}method=chart.gettoptracks&api_key=${lastFmApiKey}&format=json&limit=12&page=${pageNo}`)
           .then((response) => {
                setData(response.data.tracks.track.reverse())
                setPrevPage(Number(response.data.tracks['@attr']['page']) - 1)
                setNextPage(Number(response.data.tracks['@attr']['page']) + 1)
           })
        } catch (error) {
           console.error(`Error: ${error}`)
        }    
    }

    /* SEARCH FORM THE API */
    async function searchData(){
        try{
            const result = await axios.get(`${lastFmUrl}method=track.search&track=${search}&api_key=${lastFmApiKey}&format=json&limit=12`)
            .then((response) => {
                setData(response.data.results.trackmatches.track)
                //setPrevPage(0)
                //setNextPage(0)
                setIsSearch(false)
            })
         } catch (error) {
            console.error(`Error: ${error}`);
            setIsSearch(false)
         }  
    }

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


    useEffect(() => {
        isSearch && searchData();
    }, [isSearch]);


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
                            placeholder="Enter the Track name here..."
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
                { data.length > 0 ?
                    <section className="w-[100%] h-auto grid lg:grid-cols-4 grid-cols-2 gap-8 pb-[2rem]">
                    {/* COLUMN */}
                    <>
                        {data.map((item, i) => (
                            <div title={item.name} className="group w-[100%] h-[22rem] rounded-2xl flex flex-col items-center justify-start">
                                <div className="rounded-2xl bg-blue-300 w-[100%] h-[13rem] mb-[0.7rem] overflow-hidden">
                                    <Image 
                                        src={item.image[1]['#text']} 
                                        height={400} 
                                        width={500} 
                                        style={{ objectFit: 'cover' }}
                                        alt={item.name} 
                                    />
                                </div>
                                <h5 className="text-slate-400 text-center mb-[0.3rem]">
                                    { item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name }
                                    </h5>
                                <small className="mb-[0.7rem] text-slate-400">{item.artist.name}</small>
                                {getAuthToken() &&
                                <div className="flex items-center justify-center gap-2 text-slate-400 mb-[0.7rem]">
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
                                            setisClick(true);
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
                    </>
                    </section>
                  : 
                    <div className="w-[100%] h-[20rem] flex items-center justify-center">
                        <h6 className="animate-pulse">Loading...</h6>
                    </div>
                }
                {/*  PAGINATION  */}
                <section>
                  <div className="flex items-center justify-end gap-3 pb-[3rem]">
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
