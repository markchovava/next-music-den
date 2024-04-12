"use client"
import Link from 'next/link'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { baseURL } from '@/api/baseURL';
import { tokenAuth } from '@/tokens/tokenAuth';
import { tokenRole } from '@/tokens/tokenRole';
import { toast, Bounce } from 'react-toastify';



export default function LoginEdit() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [gmailData, setGmailData] = useState({})
    const [isGmail, setIsGmail] = useState(false);
    const [errMsg, setErrMsg] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { setAuthToken } = tokenAuth();
    const { setRoleToken } = tokenRole();

    const submitData = async () => {
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
        setErrMsg({});
        try{
        const result = await axios.post(`${baseURL}login`, data)
            .then((response) => {
                if(response.data.status == 0){
                    setErrMsg({email: response.data.email_message});
                    setIsSubmit(false);
                    return;
                }
                if(response.data.status == 1){
                    setErrMsg({password: response.data.password_message});
                    setIsSubmit(false);
                    return;
                }
                setErrMsg({});
                setIsSubmit(false);
                setAuthToken(response.data.auth_token);
                setRoleToken(response.data.role_level);
                router.push('/');
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

    const gmailLogin = async () => {
        setErrMsg({});
        const formData = gmailData;
        try{
            const result = await axios.post(`${baseURL}login-by-gmail`, formData)
                .then((response) => {
                    console.log('GMAIL')
                    console.log(response.data)
                    if(response.data.status == 0){
                        toast.info(response.data.gmail_message, {
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
                        setErrMsg({gmail_message: response.data.gmail_message})
                        setAuthToken(response.data.auth_token);
                        setRoleToken(response.data.role_level);
                        router.push('/');
                        setIsGmail(false);
                        return;
                    }
                    setAuthToken(response.data.auth_token);
                    setRoleToken(response.data.role_level);
                    router.push('/');
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
                    setIsGmail(false);
                    return;
                }
                );    
            } catch (error) {
                console.error(`Error: ${error}`);
                console.error(`Error Message: ${error.message}`);
                console.error(`Error Response: ${error.response}`);
                setErrMsg({});
                setIsGmail(false);
                return;
            }    
    }

    useEffect(() => {
        isSubmit === true && submitData();
    }, [isSubmit]);

    useEffect(() => {
        isGmail === true && gmailLogin();
    }, [isGmail]);




  return (
    <div id='form' className='m-[2rem] p-[1.5rem] w-[100%] bg-opacity-25 bg-slate-700 rounded-lg'>
    <h4 className='font-bold tracking-wide text-4xl mb-[2rem]'>Sign In to MusicDen</h4>
  
    <div className='flex'>
        <GoogleLogin
            className='px-4 py-3'
            onSuccess={credentialResponse => {
                const decodedResponse = jwtDecode(credentialResponse.credential)
                setGmailData({ email: decodedResponse.email });
                setIsGmail(true);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    </div>
    {errMsg.gmail_message && 
            <div className='text-red-400 mt-2'>
                {errMsg.gmail_message}
            </div>
        }
    <div className='flex items-center justify-between gap-2 mb-[1.2rem]'>
        <hr className='border-slate-700 w-[50%]' />
        <span className='text-slate-300'>OR</span>
        <hr className='border-slate-700 w-[50%]' />
    </div>

    <div className='w-[100%] mb-[1.5rem]'> 
        <Link href='/register' className='underline hover:no-underline text-blue-400 hover:text-blue-500'>Create a new Account</Link>
    </div>
   
    <div className='w-[100%] mb-[1.5rem]'>
        <label className='text-slate-200'>Email:</label>
        <input 
            type='text' 
            name='email'
            onChange={(e) => setData({...data, email: e.target.value})}
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
            name='password'
            onChange={(e) => setData({...data, password: e.target.value})}
            placeholder='Enter your Password here...' 
            className='w-[100%] outline-none bg-transparent border border-slate-400 mt-2 rounded-lg px-3 py-2' />
        {errMsg.password && 
            <div className='text-red-400 mt-2'>
                {errMsg.password}
            </div>
        }
    </div>
   
   {/*  <div className='w-[100%] mb-[1.5rem] flex items-center justify-start gap-3'>
        <input type='checkbox' value='agree' className='h-[1.2rem] w-[1.2rem] outline-none bg-transparent rounded-lg px-3 py-2' />
        <label className=''>Remember Me.</label>
    </div> */}
    <div className='w-[100%] mb-[1.5rem]'>
        <button 
            onClick={() => setIsSubmit(true)}
            className='w-[100%] bg-gradient-to-tr from-green-400 to-cyan-400 transition-all duration-300 ease-in-out hover:bg-gradient-to-tr hover:from-cyan-400 hover:to-green-600 py-4 text-lg text-center text-black rounded-lg'>
            {isSubmit == true ? 'Processing' : 'Submit'}
        </button>
    </div>

</div>
  )
}
