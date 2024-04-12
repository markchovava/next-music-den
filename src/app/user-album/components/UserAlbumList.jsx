"use client";
import axiosClientAPI from "@/api/axiosClientAPI";
import { MainContextState } from "@/context/MainContext";
import { tokenAuth } from "@/tokens/tokenAuth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify';



export default function UserAlbumList() {
    const { albumState, albumDispatch } = MainContextState();
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

    /* PAGINATION */
    async function paginationHandler(url) {
        setData([]);
        try{
           const result = await axiosClientAPI.get(url, config)
           .then((response) => {
                setData(response.data.data)
                setPrevPage(response.data.links.prev)
                setNextPage(response.data.links.next)
           })
        } catch (error) {
           console.error(`Error: ${error}`)
        }    
    }

    /* GET DATA */
    async function getData(){
        try{
            const result = await axiosClientAPI.get(`user-album`, config)
            .then((response) => {
                setData(response.data.data)
                setPrevPage(response.data.links.prev)
                setNextPage(response.data.links.next)
            })
         } catch (error) {
            console.error(`Error: ${error}`);
         } 
    }

    /* SEARCH FROM last.fm API */
    async function searchData(){
        console.log(search);
        try{
            const result = await axiosClientAPI.get(`user-album?search=${search}`, config)
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
    const deleteData = async () => {
        const album_id = albumState.item.id;
        try{
              const result = await axiosClientAPI.delete(`user-album/${album_id}`, config)
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
                  getData();
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
        isClick == true && deleteData(); 
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
                    placeholder="Enter the album name here..."
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
        {data ?
            <section className="w-[100%] h-auto grid lg:grid-cols-4 grid-cols-2 gap-8">
                {data?.map((item, i) => (
                    <div key={i} className="group w-[100%] h-[19rem] rounded-2xl flex flex-col items-center justify-start">
                        <div className="rounded-2xl bg-blue-300 w-[100%] h-[13rem] mb-[0.7rem] overflow-hidden">
                            {item.image ?
                                <Image 
                                    src={item?.image} 
                                    height={400} 
                                    width={500} 
                                    alt={item?.name} 
                                    style={{objectFit: 'cover'}} />
                                : ''
                            }
                        </div>
                        <h5 className="text-slate-400 text-center mb-[0.3rem]">
                            {item?.name.length > 20 ? item?.name.slice(0,20) + '...' : item?.name}
                        </h5>
                        <div className="text-sm w-[100%] text-slate-300 flex items-center justify-center gap-2 mb-[0.5rem]">
                        <button className="hover:text-blue-400" 
                            onClick={() => {
                                albumDispatch({
                                    type: 'DELETE_ITEM', 
                                    payload: {
                                        id: item.id,
                                        }
                                    })
                                setIsClick(true);
                            }}> 
                            <FaRegHeart />
                        </button>
                        </div>
                        <Link 
                            href={`/artist/${encodeURIComponent(item?.artist)}/album/${encodeURIComponent(item.name)}`}
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
