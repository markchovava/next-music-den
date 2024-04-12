"use client";
import { IoSettingsSharp } from "react-icons/io5";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { tokenAuth } from "@/tokens/tokenAuth";
import { tokenRole } from "@/tokens/tokenRole";
import { useRouter } from "next/navigation";
import axiosClientAPI from "@/api/axiosClientAPI";


/**
 * 
 * TOP LINKS COMPONENT 
 * 
 **/


export default function TopLinks() {
    const router = useRouter();
    const [isUser, setIsUser] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isSetting, setIsSetting] = useState(false);
    const { getAuthToken, removeAuthToken } = tokenAuth();
    const { removeRoleToken, getRoleToken } = tokenRole();
    /* AXIOS HEADERS */
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`, 
        }
    };

    /* LOGOUT */
    const logout = async () => {
        try{
        const result = await axiosClientAPI.get(`logout`, config)
            .then((response) => {
                setIsLogout(false);
                removeAuthToken();
                removeRoleToken();
                router.push('/login');
                return;
            }
            );    
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsLogout(false);
            return;
        }    
    }

    
    useEffect(() => {
        isLogout == true && logout();
    }, [isLogout]);



  return (
    <ul className="flex items-center justify-start gap-6 text-white">      
                {/* SETTINGS */}
                {getRoleToken() > 1 &&
                    <li className="relative w-[100%]">
                        <button onClick={() => {
                        setIsUser(false);
                        setIsSetting(!isSetting);
                        }}> <IoSettingsSharp />
                        </button>
                        {isSetting && 
                        <div className="absolute flex flex-col top-[110%] w-[800%] rounded-lg overflow-hidden drop-shadow-lg text-sm right-0 bg-blue-900">
                            <Link href='/user' className="w-[100%] py-1 px-2 hover:bg-blue-950">Users</Link>
                        </div>
                        }
                    </li>
                }

                {/* USER */}
                {getAuthToken() ? 
                <li className="relative w-[100%]">
                    <button onClick={() => {
                    setIsUser(!isUser);
                    setIsSetting(false);
                    }}>
                    <FaUser />
                    </button>
                    {isUser && 
                    <div className="absolute flex flex-col top-[110%] w-[800%] rounded-lg overflow-hidden drop-shadow-lg text-sm right-0 bg-blue-900">
                        <Link href='/profile' className="w-[100%] py-1 px-2 hover:bg-blue-950">View Profile</Link>
                        <Link href='/password' className="w-[100%] py-1 px-2 hover:bg-blue-950">Reset Password</Link>
                        <button
                            onClick={() => setIsLogout(true)} 
                            className="w-[100%] text-left py-1 px-2 hover:bg-blue-950">
                            { isLogout === true ? 'Processing' : 'Logout' }
                        </button>
                    </div>
                    }
                </li>
                : 
                <li className="">
                    <Link href='/login' className="transition-all ease-in-out p-3 rounded-lg border border-slate-400 hover:border-blue-400 text-slate-400 hover:text-blue-400">Login</Link>
                </li>
                }
            </ul>
  )
}
