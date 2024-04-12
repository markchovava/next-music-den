"use client";
import { albumInit, albumInitialState, albumReducer } from "@/reducer/AlbumReducer";
import { artistInit, artistInitialState, artistReducer } from "@/reducer/ArtistReducer";
import { trackInit, trackInitialState, trackReducer } from "@/reducer/TrackReducer";
import { createContext, useContext, useReducer } from "react";



export const MainContext = createContext();


export default function MainContextProvider({ children }) {
    const [artistState, artistDispatch] = useReducer(artistReducer, artistInitialState, artistInit);
    const [albumState, albumDispatch] = useReducer(albumReducer, albumInitialState, albumInit);
    const [trackState, trackDispatch] = useReducer(trackReducer, trackInitialState, trackInit);

    return (
        <MainContext.Provider value={{ 
            artistState, 
            artistDispatch,
            albumState, 
            albumDispatch,
            trackState, 
            trackDispatch
        }}>
        { children }
        </MainContext.Provider>
      )
}


export const MainContextState = () => {
    return useContext(MainContext)
  }

