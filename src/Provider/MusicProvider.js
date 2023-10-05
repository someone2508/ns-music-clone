import { useContext, useReducer, useState } from "react";
import { createContext } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  
    const initalState = {
        musicPlayer: "inactive",
        musicType: null,        // can skip it
        musicPLayStatus: "pause",
        musicId: null, 
    }

    function reducer(state, action) {
        switch(action.type) {
            case "play":
                return {...state, musicPLayStatus: "play"};
            case "pause":
                return {...state, musicPLayStatus: "pause"};
            case "stop":
                return {...initalState}
            case "setMusicId":
                return {...state, musicPlayer: "active", musicId: action.payload}
        }
    }

    const [musicState, musicDispatch] = useReducer(reducer, initalState);


  const obj = {
    musicPlayer: musicState.musicPlayer,
    musicType: musicState.musicType,                // can skip it
    musicPLayStatus: musicState.musicPLayStatus,
    musicId: musicState.musicId,
    musicDispatch
  };

  return <MusicContext.Provider value={obj}>{children}</MusicContext.Provider>;
};

export function useMusic() {
  return useContext(MusicContext);
}
