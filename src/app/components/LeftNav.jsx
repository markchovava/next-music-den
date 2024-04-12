"use client"
import Link from "next/link";
import { IoMdHome } from 'react-icons/io';
import { FaGuitar, FaMusic, FaCompactDisc, FaMicrophone } from 'react-icons/fa';
import { tokenAuth } from "@/tokens/tokenAuth";



export default function LeftNav() {
  const {getAuthToken} = tokenAuth()
  return (
    <section className="lg:h-screen h-auto lg:w-[20%] w-[100%] bg-slate-900 bg-opacity-50 overflow-hidden">
        <div className="w-[100%] h-[100%] overflow-y-auto pb-[2rem]">
          {/* Logo */}
          <section className="w-[100%] h-[6rem] flex items-center justify-start px-[1.5rem] text-2xl ">
            <Link href='/'>
              <span className="text-blue-300 tracking-wide">Music</span>Den
            </Link>
          </section>

          {/* Links */}
          <section>
            <ul className="w-[100%] px-[1.5rem]">
              <li className="w-[100%]">
                <Link href='/' className="w-[100%] flex items-center justify-start gap-2 py-2 px-3 transition-all ease-in-out duration-150 hover:bg-slate-950 hover:border-r-4">
                  <IoMdHome className="text-lg"/> Home</Link>
              </li>
              <li className="w-[100%]">
                <Link href='/artist' className="w-[100%] flex items-center justify-start gap-2 py-2 px-3 transition-all ease-in-out duration-150 hover:bg-slate-950 hover:border-r-4">
                  <FaMicrophone className='text-lg' />Artist</Link>
              </li>
              <li className="w-[100%]">
                <Link href='/track' className="w-[100%] flex items-center justify-start gap-2 py-2 px-3 transition-all ease-in-out duration-150 hover:bg-slate-950 hover:border-r-4">
                  <FaMusic className='text-lg' />Tracks</Link>
              </li>
              <li className="w-[100%] py-[1rem]">
               <div className="border-b border- border-slate-400"></div>
              </li>
              {getAuthToken() &&
                <>
                  <li className="w-[100%]">
                    <Link href='/user-track' className="w-[100%] flex items-center justify-start gap-2 py-2 px-3 transition-all ease-in-out duration-150 hover:bg-slate-950 hover:border-r-4">
                      <FaCompactDisc className='text-lg' />Favorite Tracks</Link>
                  </li>
                  <li className="w-[100%]">
                    <Link href='/user-artist' className="w-[100%] flex items-center justify-start gap-2 py-2 px-3 transition-all ease-in-out duration-150 hover:bg-slate-950 hover:border-r-4">
                      <FaGuitar className='text-lg' />Favorite Artists</Link>
                  </li>
                  <li className="w-[100%]">
                    <Link href='/user-album' className="w-[100%] flex items-center justify-start gap-2 py-2 px-3 transition-all ease-in-out duration-150 hover:bg-slate-950 hover:border-r-4">
                      <FaGuitar className='text-lg' />Favorite Albums</Link>
                  </li>
                </>
              }
            </ul>
          </section>
          
        </div>
    </section>
  )
}
