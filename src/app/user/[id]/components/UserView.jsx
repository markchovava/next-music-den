"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/tokens/tokenAuth";
import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link";
import axios from "axios";
import { baseURL } from "@/api/baseURL";


export default function UserView({id}) {
    const [data, setData] = useState({});
    
    const getData = async () => {
        try{
            const result = await axios.get(`${baseURL}user/${id}`)
            .then((response) => {
                setData(response.data.data)
                console.log(response.data)
            })
         } catch (error) {
            console.error(`Error: ${error}`);
         } 
    }

    useLayoutEffect(() => {
        getData();
    }, []);

    if(Object.keys(data).length === 0){
        return (
        <div className="w-[100%] h-[20rem] flex items-center justify-center">
            <h6 className="animate-pulse">Loading...</h6>
        </div>
        )
    }

  return (
    <section className="w-[100%] h-auto lg:bg-transparent bg-gradient-to-tr from-slate-900 to-black py-[3rem]">
        <div className="mx-auto w-[94%] bg-slate-800 rounded-xl p-[2.5rem] ">
            <div className="lg:w-[100%] w-[100%]">
                <div className="w-[100%] flex items-start justify-end ">
                    <Link
                        href='/profile/edit'
                        className="border border-slate-400 text-slate-300 px-3 py-2 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all ease-in-out duration-150">
                        Edit
                    </Link>
                </div>
                <h2 className="text-[3rem] font-extralight mb-[1rem]">
                    View User
                </h2>
                {data ? 
                    <>
                        <div className="w-[100%] flex items-start justify-start gap-3 mb-[1rem]">
                            <span className="w-[20%]">Name:</span>
                            <span className="w-[80%] px-3">
                                {data.name}
                            </span>
                        </div>
                        <div className="w-[100%] flex items-start justify-start gap-3 mb-[1rem]">
                            <span className="w-[20%]">Email:</span>
                            <span className="w-[80%] px-3">
                                {data.email}
                            </span>
                        </div>
                        <div className="w-[100%] flex items-start justify-start gap-3 mb-[1rem]">
                            <span className="w-[20%]">Gender:</span>
                            <span className="w-[80%] px-3">
                                {data.gender}
                            </span>
                        </div>
                        <div className="w-[100%] flex items-start justify-start gap-3 mb-[1rem]">
                            <span className="w-[20%]">Date of Birth:</span>
                            <span className="w-[80%] px-3">
                                {data.dob}
                            </span>
                        </div>
                        <div className="w-[100%] flex items-start justify-start gap-3 mb-[1rem]">
                            <span className="w-[20%]">Code:</span>
                            <span className="w-[80%] px-3">
                                {data.code}
                            </span>
                        </div>
                        <div className="w-[100%] flex items-start justify-start gap-3 mb-[1rem]">
                            <span className="w-[20%]">Level:</span>
                            <span className="w-[80%] px-3">
                                {data.role_level == 1 && 'User'}
                                {data.role_level == 2 && 'Admin'}
                            </span>
                        </div>
                    </>
                :
                    <div className="w-[100%] h-[20rem] flex items-center justify-center">
                        <h6 className="">No data available at the moment...</h6>
                    </div>
                }
              
            </div>     
        </div>
    </section>
  )
}
