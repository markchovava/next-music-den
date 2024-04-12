import LeftNav from "@/app/components/LeftNav";
import AlbumList from "./components/AlbumList";
import TopLinks from "@/app/components/TopLinks";
import Footer from "@/app/components/Footer";
import { getlastFMAlbumsByArtist12 } from "@/api/getAlbums";



export default async function Page({ params: {slug} }) {
  const albums = await getlastFMAlbumsByArtist12(slug);


  
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
                  ALBUMS PAGE                
                </h2>
              </div>

                <TopLinks />
            </div>
          </section> 

          {/*  */}
          <AlbumList albums={albums} slug={slug} />
          
          {/* FOOTER */}
          <Footer />


        </div>
      </section>
      
    </main>
  );
}
