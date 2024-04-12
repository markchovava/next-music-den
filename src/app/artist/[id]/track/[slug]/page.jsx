import LeftNav from "@/app/components/LeftNav";
import TopLinks from "@/app/components/TopLinks";
import Link from "next/link";
import { FaSearch, FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import TrackView from "./components/TrackView";
import { getlastFMArtistTrack } from "@/api/getTracks";




export default async function page({params: { id, slug }}) {
    const track = await getlastFMArtistTrack(id, slug);
   
  
  return (
    <main className="w-[100%] lg:min-h-screen h-[100%] text-white bg-slate-950  flex lg:flex-row flex-col items-start justify-start">
      {/* LEFTNAV */}
      <LeftNav />
      {/* RIGHT AREA */}
      <section className="h-screen lg:w-[80%] w-[100%] lg:overflow-hidden bg-slate-950">
        <div className="w-[100%] h-[100%] lg:overflow-y-auto">
          {/* TOP NAV */}
          <section className="w-[100%] lg:h-[5rem] h-auto border-b border-slate-800">
            <div className="mx-auto w-[94%] h-[100%] flex lg:flex-row flex-col justify-between items-center lg:py-0 py-[1rem]">
              <div className="flex items-center justify-start gap-4 lg:pb-0 pb-[1rem]">
                <h2 className="font-bold tracking-wider flex items-center justify-start uppercase">
                  Track Page
                </h2>
                <div className="flex items-center justify-start">
                  <input 
                    type="text" 
                    placeholder="Enter the Artist name here..."
                    className="bg-transparent rounded-l-xl w-[20rem] h-[2.6rem] outline-none border-l border-y border-slate-600 px-3 py-2" />
                  <button className="group flex items-center justify-center text-center h-[2.6rem] w-[4rem] px-3 py-3 border-slate-600 rounded-r-xl outline-none border">
                    <FaSearch className="text-lg group-hover:text-slate-300" />
                  </button>
                </div>
              </div>
                {/* Links */}
              <TopLinks />
            </div>
          </section> 


          {/* -------------  -------------- */}
          <section className="w-[100%] h-auto lg:bg-transparent bg-slate-950">
            <div className="mx-auto w-[94%] h-[100%]">
              
              <TrackView track={track} id={id} slug={slug} />
             
            </div>
          </section>
          {/*  */}
          <section className="w-[100%] border-t border-slate-700 text-slate-400 bg-slate-950">
            <div className="mx-auto w-[94%] py-[1rem] flex items-center justify-end">
              Designed By Mark Chovava
            </div>
          </section>
        </div>
      </section>
      
   
    </main>
  );
}
