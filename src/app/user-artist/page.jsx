import LeftNav from "../components/LeftNav";
import TopLinks from "../components/TopLinks";
import UserArtistList from "./components/UserArtistList";



export default async function Page() {
  
  
  return (
    <main className="w-[100%] lg:min-h-screen h-[100%] text-white bg-gradient-to-tr from-slate-900 to-black flex lg:flex-row flex-col items-start justify-start">
      {/* LEFTNAV */}
      <LeftNav />
      {/* RIGHT AREA */}
      <section className="h-screen lg:w-[80%] w-[100%] lg:overflow-hidden">
        <div className="w-[100%] h-[100%] lg:overflow-y-auto">
          {/* TOP NAV */}
          <section className="w-[100%] lg:h-[5rem] h-auto border-b border-slate-800">
            <div className="mx-auto w-[94%] h-[100%] flex lg:flex-row flex-col justify-between items-center lg:py-0 py-[1rem]">
              <div className="flex items-center justify-start gap-4 lg:pb-0 pb-[1rem]">
                <h2 className="font-bold tracking-wider flex items-center justify-start uppercase">
                  Artist Page
                </h2>
                <div className="flex items-center justify-start">
                  
                </div>
              </div>

                <TopLinks />
            </div>
          </section> 

          {/*  */}
          <UserArtistList />
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
