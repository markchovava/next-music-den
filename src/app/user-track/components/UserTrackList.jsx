"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { MainContextState } from "@/context/MainContext";
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/tokens/tokenAuth";
import { toast, Bounce } from 'react-toastify';



export default function UserTrackList() {
    const { trackState, trackDispatch } = MainContextState();
    const [isClick, setIsClick] = useState(false);
    const { getAuthToken} = tokenAuth(); 
    const [data, setData] = useState();
    const [prevPage, setPrevPage] = useState();
    const [nextPage, setNextPage] = useState();
    const [search, setSearch] = useState();
    const [isSearch, setIsSearch] = useState(false);
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`, 
        }
    };

    /* PAGINATION DATA */
    async function paginationHandler(url) {
        setData([]);
        try{
           const result = await axiosClientAPI.get(url, config)
           .then((response) => {
                setData(response.data.data)
                setPrevPage(response.data.links.prev)
                setNextPage(response.data.links.next)
                console.log(response.data)
           })
        } catch (error) {
           console.error(`Error: ${error}`)
        }    
    }


    async function getData(){
        try{
            const result = await axiosClientAPI.get(`user-track`, config)
            .then((response) => {
                setData(response.data.data)
                setPrevPage(response.data.links.prev)
                setNextPage(response.data.links.next)
            })
         } catch (error) {
            console.error(`Error: ${error}`);
         } 
    }

    /* SEARCH FORM THE API */
    async function searchData(){
        console.log(search);
        try{
            const result = await axiosClientAPI.get(`user-track?search=${search}`, config)
            .then((response) => {
                console.log(response.data)
                setData(response.data.data)
                setPrevPage(response.data.links.prev)
                setNextPage(response.data.links.next)
                setIsSearch(false)
            })
         } catch (error) {
            console.error(`Error: ${error}`);
            setIsSearch(false)
         }  
    }

    /* REMOVES FROM USER COLLECTION */
    const removeData = async () => {
        const track_id = trackState.item.id;
        try{
              const result = await axiosClientAPI.delete(`user-track/${track_id}`, config)
              .then((response) => {
                  getData();
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
          }
  
    }

    useLayoutEffect(() => {
        getData();
    },[]);
  

    useEffect(() => {
        isClick == true && removeData(); 
    }, [isClick]);


    useEffect(() => {
        isSearch && searchData();
    }, [isSearch]);



    if(data?.length < 0 ){
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
                {prevPage ?
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
            { data ?
                <section className="w-[100%] h-auto grid lg:grid-cols-4 grid-cols-2 gap-8 pb-[2rem]">
                {/* COLUMN */}
                <>
                    {data.map((item, i) => (
                        <div title={item.name} className="group w-[100%] h-[22rem] rounded-2xl flex flex-col items-center justify-start">
                            <div className="rounded-2xl bg-blue-300 w-[100%] h-[13rem] mb-[0.7rem] overflow-hidden">
                                {item.image ? 
                                <Image 
                                    src={item.image} 
                                    height={400} 
                                    width={500} 
                                    style={{ objectFit: 'cover' }}
                                    alt={item.name} 
                                />
                                : '' }
                            </div>
                            <h5 className="text-slate-400 text-center mb-[0.3rem]">
                                { item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name }
                                </h5>
                            <small className="mb-[0.3rem] text-slate-400">{item.artist}</small>
                            <div className="flex items-center justify-center gap-2 text-slate-400 mb-[0.5rem]">
                            <button className="hover:text-blue-400" 
                                onClick={() => {
                                    trackDispatch({
                                        type: 'DELETE_ITEM', 
                                        payload: {
                                            id: item.id
                                        }
                                    });
                                    setIsClick(true);
                                }}> 
                                <FaRegHeart />
                            </button>
                            </div>
                            <Link 
                                href={`/artist/${encodeURIComponent(item.artist)}/track/${encodeURIComponent(item.name)}`} 
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
                {prevPage ?
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
