"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/tokens/tokenAuth";
import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link";




export default function ProfileEdit() {
    const [data, setData] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { getAuthToken } = tokenAuth();
    /* AXIOS HEADERS */
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`, 
        }
    };
    /* GET YOUR PROFILE DATA */
    const getData = async () => {
        try{
            const result = await axiosClientAPI.get(`auth-user`, config)
            .then((response) => {
                setData(response.data.data)
                console.log(response.data)
            })
         } catch (error) {
            console.error(`Error: ${error}`);
         } 
    }

    /* UPDATE YOUR PROFILE */
    const submitData = async () => {
        const formData = {
            first_name: data.first_name,
            last_name: data.first_name,
            gender: data.gender,
            dob: data.dob,
            email: data.email,
        };
        try{
            const result = await axiosClientAPI.post(`auth-user`, formData, config)
            .then((response) => {
                setData(response.data.data)
                setIsSubmit(false);
            })
         } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsSubmit(false);
         }
    }

    useLayoutEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        isSubmit == true && submitData();
    }, [isSubmit])


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
                        href='/profile' 
                        className="border border-slate-400 text-slate-300 px-3 py-2 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all ease-in-out duration-150">
                        View
                    </Link>
                </div>
                <h2 className="text-[3rem] font-extralight">
                    Edit Profile
                </h2>
                <div className="w-[100%] mb-[1.5rem]">
                    <div className="flex justify-start gap-4">
                        <div className="w-[50%]">
                            <span className="block mb-2">First Name:</span>
                            <input 
                                type="text" 
                                value={data.first_name} 
                                onChange={(e) => setData({...data, first_name: e.target.value})}
                                name="name" 
                                className="w-[100%] bg-transparent rounded-xl outline-none px-4 py-3 border border-slate-400" 
                            />

                        </div>
                        <div className="w-[50%]">
                            <span className="block mb-2">Last Name:</span>
                            <input 
                                type="text" 
                                value={data.last_name} 
                                onChange={(e) => setData({...data, last_name: e.target.value})}
                                name="name" 
                                className="w-[100%] bg-transparent rounded-xl outline-none px-4 py-3 border border-slate-400" 
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[100%] mb-[1.5rem]">
                    <span className="block mb-2">Email:</span>
                    <input 
                        type="text" 
                        value={data.email} 
                        name="email" 
                        onChange={(e) => setData({...data, email: e.target.value})}
                        className="w-[100%] bg-transparent rounded-xl px-4 py-3 outline-none border border-slate-400" 
                    />
                </div>
               {/*  <div className="w-[100%] mb-[1.5rem]">
                    <span className="block mb-2">Role:</span>
                    <select
                        name="role_level" 
                        onChange={(e) => setData({...data, gender: e.target.value})}
                        className="w-[100%] bg-transparent rounded-xl px-4 py-3 outline-none border border-slate-400">
                        <option value='' className="text-black">Select an option.</option>
                        <option value={1} className="text-black" selected={data.role_level == 1 && 'selected'}>User</option>
                        <option value={2} className="text-black" selected={data.role_level == 2 && 'selected'}>Admin</option>
                    </select>
                </div> */}
                <div className="w-[100%] mb-[1.5rem]">
                    <span className="block mb-2">Gender:</span>
                    <select
                        name="gender" 
                        onChange={(e) => setData({...data, gender: e.target.value})}
                        className="w-[100%] bg-transparent rounded-xl px-4 py-3 border border-slate-400">
                        <option value='' className="text-black">Select an option.</option>
                        <option value='Male' className="text-black" selected={data.gender == 'Male' && 'selected'}>Male</option>
                        <option value='Female' className="text-black" selected={data.gender == 'Female' && 'selected'}>Female</option>
                    </select>
                </div>
                <div className="w-[100%] mb-[1.5rem]">
                    <span className="block mb-2">Date of Birth:</span>
                    <input 
                        type="text" 
                        value={data.dob} 
                        onChange={(e) => setData({...data, dob: e.target.value})}
                        placeholder="DD/MM/YYYY"
                        name="dob" 
                        className="w-[100%] bg-transparent rounded-xl px-4 py-3 outline-none border border-slate-400" 
                    />
                </div>

                <div className="w-[100%] mb-[1rem]">
                    <button 
                        onClick={() => setIsSubmit(true)}
                        className='w-[100%] bg-gradient-to-tr from-green-400 to-cyan-400 transition-all duration-300 ease-in-out hover:bg-gradient-to-tr hover:from-cyan-400 hover:to-green-600 py-4 text-lg text-center text-black rounded-lg'>
                        {isSubmit == true ? 'Processing' : 'Submit'}
                    </button>
                </div>
               
               
               
              
            </div>     
        </div>
    </section>
  )
}
