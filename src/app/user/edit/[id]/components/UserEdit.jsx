"use client"


import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link";
import { baseURL } from "@/api/baseURL";
import axios  from "axios";
import { toast, Bounce } from 'react-toastify';
import { useRouter } from "next/navigation";




export default function UserEdit({ id }) {
    const router = useRouter();
    const [data, setData] = useState({});
    const [isSubmit, setIsSubmit] = useState(false); 

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


    const submitData = async () => {
        const formData = {
            first_name: data.first_name,
            last_name: data.last_name,
            gender: data.gender,
            dob: data.dob,
            email: data.email,
            phone: data.phone,
            role_level: data.role_level,
        };
        try{
            const result = await axios.post(`${baseURL}user/${id}`, formData)
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
                router.push('/user')
                setIsSubmit(false);
            })
         } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsSubmit(false);
         }
    }

  

    useEffect(() => {
        isSubmit == true && submitData();
    }, [isSubmit])





  return (
    <section className="w-[100%] h-auto lg:bg-transparent bg-gradient-to-tr from-slate-900 to-black py-[3rem]">
        <div className="mx-auto w-[94%] bg-slate-800 rounded-xl p-[2.5rem] ">
            <div className="lg:w-[100%] w-[100%]">
                <div className="w-[100%] flex items-start justify-end ">
                    <Link 
                        href='/user' 
                        className="border border-slate-400 text-slate-300 px-3 py-2 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all ease-in-out duration-150">
                        All Users
                    </Link>
                </div>
                <h2 className="text-[3.5rem] font-extralight mb-[1rem]">
                    Edit User
                </h2>
                {/* FULL NAME */}
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
                {/* EMAIL */}
                <div className="w-[100%] mb-[1.5rem]">
                    <span className="block mb-2">Email:</span>
                    <input 
                        type="text" 
                        name="email"
                        value={data.email} 
                        onChange={(e) => setData({...data, email: e.target.value})}
                        className="w-[100%] bg-transparent rounded-xl px-4 py-3 outline-none border border-slate-400" 
                    />
                </div>
                {/* PHONE */}
                <div className="w-[100%] mb-[1.5rem]">
                    <span className="block mb-2">Phone:</span>
                    <input 
                        type="text" 
                        name="phone" 
                        value={data.phone}
                        onChange={(e) => setData({...data, phone: e.target.value})}
                        className="w-[100%] bg-transparent rounded-xl px-4 py-3 outline-none border border-slate-400" 
                    />
                </div>
                {/* ROLE LEVEL */}
                <div className="w-[100%] mb-[1.5rem]">
                    <span className="block mb-2">Role:</span>
                    <select
                        name="role_level" 
                        onChange={(e) => setData({...data, role_level: e.target.value})}
                        className="w-[100%] bg-transparent rounded-xl px-4 py-3 outline-none border border-slate-400">
                        <option value='' className="text-black">Select an option.</option>
                        <option value={1} selected={data.role_level == 1 && 'selected'} className="text-black" >User</option>
                        <option value={2} selected={data.role_level == 2 && 'selected'} className="text-black" >Admin</option>
                    </select>
                </div>
                {/* GENDER */}
                <div className="w-[100%] mb-[1.5rem]">
                    <span className="block mb-2">Gender:</span>
                    <select
                        name="gender" 
                        onChange={(e) => setData({...data, gender: e.target.value})}
                        className="w-[100%] bg-transparent rounded-xl px-4 py-3 border border-slate-400">
                        <option 
                            value='' 
                            className="text-black">Select an option.</option>
                        <option 
                            value='Male' 
                            selected={data.gender == 'Male' && 'selected'} 
                            className="text-black" >Male</option>
                        <option 
                            value='Female' 
                            selected={data.gender == 'Female' && 'selected'} 
                            className="text-black" >Female</option>
                    </select>
                </div>
                {/* DATE OF BIRTH */}
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
                {/* SUBMIT */}
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
