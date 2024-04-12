import LeftNav from "./components/LeftNav";
import TopLinks from "./components/TopLinks";
import { getlastFMArtists1 } from "@/api/getArtists";
import Artists4 from "./components/Artists4";
import Tracks12 from "./components/Tracks12";
import { getlastFMTracks12 } from "@/api/getTracks";
import Footer from "./components/Footer";



export default async function Home() {
  const [artists4, tracks12] = await Promise.all([getlastFMArtists1(), getlastFMTracks12()]);
  
  return (
    <main className="w-[100%] lg:min-h-screen h-[100%] text-white bg-gradient-to-tr from-slate-900 to-black flex lg:flex-row flex-col items-start justify-start">
        {/* LEFTNAV */}
        <LeftNav />
      {/* RIGHT AREA */}
      <section className="h-screen lg:w-[80%] w-[100%] lg:overflow-hidden">
        <div className="w-[100%] h-[100%] lg:overflow-y-auto">
          {/* TOP NAV */}
          <section className="w-[100%] h-[5rem] border-b border-slate-800">
            <div className="mx-auto w-[94%] h-[100%] flex justify-between items-center">
                <h2 className="font-bold tracking-wider flex items-center justify-start">HOME PAGE</h2>
                <TopLinks />
            </div>
          </section> 

          <section className="w-[100%] h-auto lg:bg-transparent bg-gradient-to-tr from-slate-900 to-black">
            <div className="mx-auto w-[94%] h-[100%]">
              {/* -------------------- */}
              <Artists4 artists4={artists4} />
              {/* -------------------- */}
             <Tracks12 tracks12={tracks12} />
            </div>
          </section>


          {/* FOOTER */}
          <Footer />
          
        </div>
      </section>
      
    </main>
  );
}
