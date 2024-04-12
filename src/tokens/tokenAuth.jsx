"use client"

export const tokenAuth = () => {
    
    const setAuthToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem('MUSIC_DEN_AUTH_TOKEN', token);
        }
    }
    const getAuthToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem('MUSIC_DEN_AUTH_TOKEN');
            return token;
        }
    }
    const removeAuthToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem('MUSIC_DEN_AUTH_TOKEN');
        }
    }

    return {
        setAuthToken, 
        getAuthToken,
        removeAuthToken
    }

  }