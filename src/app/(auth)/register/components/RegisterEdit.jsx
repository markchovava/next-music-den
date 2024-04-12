"use client"
import { baseURL } from '@/api/baseURL';
import axios from "axios";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { SiGmail } from 'react-icons/si'



export default function RegisterEdit() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMsg, setErrMsg] = useState({});

    const submitData = async () => {
        if(!data.first_name){
            setErrMsg({first_name: 'First Name is Required.'});
            setIsSubmit(false);
            return;
        }
        if(!data.last_name){
            setErrMsg({last_name: 'Last Name is Required.'});
            setIsSubmit(false);
            return;
        }
        if(!data.email){
            setErrMsg({email: 'Email is Required.'});
            setIsSubmit(false);
            return;
        }
        if(!data.password){
            setErrMsg({password: 'Password is Required.'});
            setIsSubmit(false);
            return;
        }
        if(data.password !== data.password_confirmation){
            setErrMsg({password_confirmation: 'Password do not match.'});
            setIsSubmit(false);
            return;
        }
        if(!data.is_agree){
            setErrMsg({is_agree: 'You are required to tick the checkbox to register.'});
            setIsSubmit(false);
            return;
        }
        try{
        const result = await axios.post(`${baseURL}register`, data)
            .then((response) => {
                if(response.data.status == 0){
                    setErrMsg({email: response.data.email_message});
                    setIsSubmit(false);
                    return;
                }
                setErrMsg({});
                setIsSubmit(false);
                router.push('/login');
                return;
            }
            );    
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setErrMsg({});
            setIsSubmit(false);
            return;
        }    
    }

    useEffect(() => {
        isSubmit === true && submitData();
    }, [isSubmit]);



  return (
    <section id='form' className='m-[2rem] p-[1.5rem] w-[100%] bg-opacity-25 bg-slate-700 rounded-lg'>
        <h4 className='font-bold tracking-wide text-4xl mb-[2rem]'>Sign up to MusicDen</h4>
        <button className='bg-gradient-to-tr from-blue-600 to-cyan-600 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-700 rounded-lg flex items-center justify-start gap-6 px-4 py-3 drop-shadow-lg mb-[1rem]'>
            <SiGmail className='text-2xl' /> 
            <span className='text-lg tracking-wide'>Sign Up with Gmail</span>
        </button>
        <div className='flex items-center justify-between gap-2 mb-[1.2rem]'>
            <hr className='border-slate-700 w-[50%]' />
            <span className='text-slate-300'>OR</span>
            <hr className='border-slate-700 w-[50%]' />
        </div>

        <div className='w-[100%] mb-[1.5rem]'> 
            <Link href='/login' className='underline hover:no-underline text-blue-400 hover:text-blue-500'>
                Login to your Account.</Link>
        </div>

        <div className='w-[100%] mb-[1.5rem]'>
            <div className='w-[100%] flex items-center justify-start gap-3'>
                <div className='w-[50%]'>
                    <label className='text-slate-200'>First Name:</label>
                    <input 
                        type='text'
                        value={data.first_name}
                        onChange={(e) => setData({...data, first_name: e.target.value})}
                        name='first_name' 
                        placeholder='Enter your First Name here...' 
                        className='w-[100%] outline-none bg-transparent border border-slate-400 mt-2 rounded-lg px-3 py-2' />
                </div>
                <div className='w-[50%]'>
                    <label className='text-slate-200'>Last Name:</label>
                    <input 
                        type='text'
                        value={data.last_name}
                        onChange={(e) => setData({...data, last_name: e.target.value})}
                        name='last_name' 
                        placeholder='Enter your Last Name here...' 
                        className='w-[100%] outline-none bg-transparent border border-slate-400 rounded-lg mt-2 px-3 py-2' />
                </div>
            </div>
            <div className='w-[100%] flex justify-start items-center gap-3'>
                <div className='w-[50%]'>
                    {errMsg.first_name &&
                        <div className='text-red-400 mt-2'>
                            {errMsg.first_name}
                        </div>
                    }
                </div>
                <div className='w-[50%]'>
                    {errMsg.last_name && 
                        <div className='text-red-400 mt-2'>
                            {errMsg.last_name}
                        </div>
                    }
                </div>
            </div>
        </div>
        <div className='w-[100%] mb-[1.5rem]'>
            <label className='text-slate-200'>Email:</label>
            <input 
                type='email' 
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                name='email'
                placeholder='Enter your Email here...' 
                className='w-[100%] outline-none bg-transparent border border-slate-400 mt-2 rounded-lg px-3 py-2' />
            {errMsg.email && 
                <div className='text-red-400 mt-2'>
                    {errMsg.email}
                </div>
            }
        </div>
        <div className='w-[100%] mb-[1.5rem]'>
            <label className='text-slate-200'>Password:</label>
            <input 
                type='password' 
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                name='password'
                placeholder='Enter your Password here...' 
                className='w-[100%] outline-none bg-transparent border border-slate-400 mt-2 rounded-lg px-3 py-2' />
            {errMsg.password && 
                <div className='text-red-400 mt-2'>
                    {errMsg.password}
                </div>
            }
        </div>
        <div className='w-[100%] mb-[1.5rem]'>
            <label className='text-slate-200'>Confirm Password:</label>
            <input 
                type='password' 
                value={data.password_confirmation}
                onChange={(e) => setData({...data, password_confirmation: e.target.value})}
                name='password_confirmation'
                placeholder='Confirm your Password here...' 
                className='w-[100%] outline-none bg-transparent border border-slate-400 mt-2 rounded-lg px-3 py-2' />
            {errMsg.password_confirmation && 
                <div className='text-red-400 mt-2'>
                    {errMsg.password_confirmation}
                </div>
            }
        </div>
        <div className='w-[100%] mb-[1.5rem]'>
            <div className='w-[100%] flex items-start justify-start gap-3'>
                <input 
                    type='checkbox'
                    name='is_agree' 
                    onChange={(e) => setData({...data, is_agree: e.target.value})}
                    value={1}
                    className='h-[1.2rem] w-[1.2rem] outline-none bg-transparent border border-slate-400 mt-1' />
                <label className=''>
                    Creating an account means you are agreeing with our Terms and Conditions.
                </label>
            </div>
            {errMsg.is_agree && 
                <div className='text-red-400 mt-2'>
                    {errMsg.is_agree}
                </div>
            }
        </div>

        <div className='w-[100%] mb-[1.5rem]'>
            <button 
                onClick={() => setIsSubmit(true)}
                className='w-[100%] bg-gradient-to-tr from-green-400 to-cyan-500 transition-all duration-300 ease-in-out hover:bg-gradient-to-tr hover:from-cyan-500 hover:to-green-600 py-4 text-lg text-center text-black rounded-lg'>
                {isSubmit ? 'Processing' : 'Submit'} 
            </button>
        </div>
       
    </section>
  )
}
