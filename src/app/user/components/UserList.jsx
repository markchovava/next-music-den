"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios  from 'axios';
import { toast, Bounce } from 'react-toastify';
import { FaSearch, FaEye, FaPen } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import { baseURL } from '@/api/baseURL';



export default function UserList() {
    const [search, setSearch] = useState('')
    const [isSearch, setIsSearch] = useState(false);
    const [data, setData] = useState();
    const [prevPage, setPrevPage] = useState();
    const [nextPage, setNextPage] = useState();
    
    /* PAGINATION */
    async function paginationHandler(url) {
        try{
           const result = await axios.get(url)
           .then((response) => {
                setData(response.data.data)
                setPrevPage(response.data.links.prev)
                setNextPage(response.data.links.next)
           })
        } catch (error) {
           console.error(`Error: ${error}`);
        }    
    }

    /* SEARCH DATA */
    async function searchData() {
        try{
           const result = await axios.get(`${baseURL}user?search=${search}`)
           .then((response) => {
                setData(response.data.data);
                setPrevPage(response.data.links.prev);
                setNextPage(response.data.links.next);
                setIsSearch(false)
           })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsSearch(false)
        }    
    }

    /* GET DATA */
    async function getData() {
        try{
           const result = await axios.get(`${baseURL}user`)
           .then((response) => {
                setData(response.data.data);
                setPrevPage(response.data.links.prev);
                setNextPage(response.data.links.next);
           })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }    
    }

    /* GET DATA */
    async function deleteData(id) {
        try{
           const result = await axios.delete(`${baseURL}user/${id}`)
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
           })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }    
    }


    useLayoutEffect(()=> {
       getData();
    }, []);

    useEffect(()=> {
        isSearch == true && searchData();
    }, [isSearch]);



    if(data?.length < 0) {
        return (
        <div className="w-[100%] h-[20rem] flex items-center justify-center">
            <h6 className="">No data found...</h6>
        </div>
        )
    }



  return (
    <div className='w-[100%] h-auto py-[3rem]'>

        <section className="mx-auto w-[94%] flex items-center justify-between mb-[2rem]">
            <div className="w-[50%] flex items-center justify-start">
                <input 
                    type="text"
                    name="search" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter the Artist name here..."
                    className="bg-transparent rounded-l-xl w-[70%] h-[3rem] outline-none border-l border-y border-slate-600 p-4" />
                  <button 
                    onClick={() => setIsSearch(true)}
                    className="group flex items-center justify-center text-center h-[3rem] p-4 border-slate-600 rounded-r-xl outline-none border">
                    { isSearch === true ? 
                        'Processing' : 
                        <FaSearch className="text-lg group-hover:text-slate-300" />
                    }
                  </button>
            </div>
           
            <div className="flex items-center justify-end gap-3">
                {prevPage && 
                    <button 
                        onClick={() => paginationHandler(prevPage)}
                        className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                        Prev
                    </button>
                }
                {nextPage &&
                    <button
                        onClick={() => paginationHandler(nextPage)}
                        className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                        Next
                    </button>
                }
                <Link href='/user/add'
                    className="text-slate-400 px-4 py-2 rounded-xl border border-slate-400 hover:border-blue-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                    Add
                </Link>
    
            </div>
        </section>

        <section className='mx-auto w-[94%] border border-slate-600 bg-slate-800 text-slate-400 flex justify-start items-center font-bold uppercase py-[0.7rem]'>
            <div className='w-[35%] px-4 py-3'>Name</div>
            <div className='w-[20%] px-4 py-3'>Email</div>
            <div className='w-[15%] px-4 py-3'>Code</div>
            <div className='w-[20%] px-4 py-3'>Gmail Signin</div>
            <div className='w-[10%] px-4 py-3'>Action</div>
        </section>

        {data ?
            data.map((item, i) => (
            <section key={i} className='mx-auto w-[94%] hover:bg-slate-900 transition-all ease-in-out text-slate-400 border border-slate-600 flex justify-start items-center py-[0.7rem]'>
                <div className='w-[35%] px-4 py-3'>{item.name}</div>
                <div className='w-[20%] px-4 py-3'>{item.email}</div>
                <div className='w-[15%] px-4 py-3'>{item.code}</div>
                <div className='w-[20%] px-4 py-3'>
                    {item.created_by_social === 1 &&'Gmail Sign Up'}
                    {item.created_by_social === 0 && 'Normal Sign Up'}
                </div>
                <div className='w-[10%] px-4 py-3 flex justify-center items-center gap-3'>
                    <Link href={`/user/edit/${item.id}`}>
                        <FaPen className='text-lg hover:text-blue-400 hover:scale-110' />
                    </Link>
                    <Link href={`/user/${item.id}`}>
                        <FaEye className='text-xl hover:text-blue-400 hover:scale-110' />
                    </Link> 
                    <button onClick={() => deleteData(item.id)} className=''>
                        <MdDeleteForever className='text-xl hover:text-blue-400 hover:scale-110' />
                    </button>

                </div>
            </section>
            
        ))
        :
        <div className="w-[100%] h-[20rem] flex items-center justify-center">
            <h6 className="animate-pulse">Loading...</h6>
        </div>
        }
      
         {/* PAGINATION */}
        <section className="mx-auto w-[94%] flex items-center justify-end gap-3 mt-[2rem]">
            {prevPage && 
                <button 
                    onClick={() => paginationHandler(prevPage)}
                    className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                    Prev
                </button>
                }
            {nextPage &&
                <button
                    onClick={() => paginationHandler(nextPage)}
                    className="text-slate-400 hover:text-blue-400 duration-300 ease-in-out transition-all">
                    Next
                </button>
            }
        </section>

    </div>
  )
}
