"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/tokens/tokenAuth";
import { useEffect, useState } from "react"
import Link from "next/link";
import { toast, Bounce } from 'react-toastify';




export default function PasswordEdit() {
    const [data, setData] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMsg, setErrMsg] = useState({});
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`, 
        }
    };
    const submitData = async () => {
        setErrMsg({});
        if(!data.password){
            setErrMsg({password: 'Password is required.'});
            setIsSubmit(false);
            return;
        }
        if(!data.password_confirmation){
            setErrMsg({password_confirmation: 'Password Confirmation is required.'});
            setIsSubmit(false);
            return;
        }
        if(data.password !== data.password_confirmation){
            setErrMsg({password_confirmation: 'Password do not match.'});
            setIsSubmit(false);
            return;
        }

        const formData = {
            password: data.password,
        };

        try{
            const result = await axiosClientAPI.post(`password`, formData, config)
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
                setIsSubmit(false);
            })
        } catch (error) {
                console.error(`Error: ${error}`);
                console.error(`Error Message: ${error.message}`);
                console.error(`Error Response: ${error.response}`);
                setIsSubmit(false);
        }
    };
    useEffect(() => {
        isSubmit == true && submitData();
    }, [isSubmit]);



  return (
    <section className="w-[100%] h-auto lg:bg-transparent bg-gradient-to-tr from-slate-900 to-black py-[3rem]">
        <div className="mx-auto w-[94%] bg-slate-800 rounded-xl p-[2.5rem] ">
            <div className="lg:w-[100%] w-[100%]">
                <div className="w-[100%] flex items-start justify-end ">
                    <Link 
                        href='/profile' 
                        className="border border-slate-400 text-slate-300 px-3 py-2 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all ease-in-out duration-150">
                        View Profile
                    </Link>
                </div>
                <h2 className="text-[3rem] font-extralight">
                    Edit Password
                </h2>   
                <div className="w-[100%] mb-[1.5rem]">
                    <span className="block mb-2">Password:</span>
                    <input 
                        type="password" 
                        value={data.password} 
                        placeholder="Enter the Password here..."
                        name="email" 
                        onChange={(e) => setData({...data, password: e.target.value})}
                        className="w-[100%] bg-transparent rounded-xl px-4 py-3 outline-none border border-slate-400" 
                    />
                    {errMsg?.password && 
                        <div className='text-red-400 mt-2'>
                            {errMsg.password}
                        </div>
                    }
                </div>
                <div className="w-[100%] mb-[1.5rem]">
                    <span className="block mb-2">Password Confirmation:</span>
                    <input 
                        type="password" 
                        name="password_confirmation" 
                        placeholder="Enter the Password Confirmation here..."
                        value={data.password_confirmation} 
                        onChange={(e) => setData({...data, password_confirmation: e.target.value})}
                        className="w-[100%] bg-transparent rounded-xl px-4 py-3 outline-none border border-slate-400" 
                    />
                     {errMsg?.password_confirmation && 
                        <div className='text-red-400 mt-2'>
                            {errMsg.password_confirmation}
                        </div>
                    }
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
