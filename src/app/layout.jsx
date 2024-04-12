import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainContextProvider from "@/context/MainContext";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MUSIC DEN",
  description: "Best place to arrange your music, artist and latest albums.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId="699423147683-sssrs1qjp8afs7mg2mr8vvo6ms53ns3v.apps.googleusercontent.com">
        <body className={inter.className}>
          <MainContextProvider>
            {children}
            {/* NOTIFICATION TOASTER */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </MainContextProvider>
        </body>
      </GoogleOAuthProvider>;
    </html>
  );
}
