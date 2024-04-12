import { getUsers } from "@/api/getUsers";
import Footer from "../components/Footer";
import LeftNav from "../components/LeftNav";
import TopLinks from "../components/TopLinks";
import UserList from "./components/UserList";






export default async function page() {
    const users = await getUsers();
  
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
                <h2 className="font-bold tracking-wider flex items-center justify-start">USERS PAGE</h2>
                <TopLinks />
            </div>
          </section> 

         {/* PROFILE */}
         <UserList users={users} />


          {/* FOOTER */}
          <Footer />
          
        </div>
      </section>
      
   
    </main>
  );
}
