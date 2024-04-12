"use client"

/**
 * 
 *  ACCESS LEVEL TOKENS SENT FROM LARAVEL API 
 *  STORED IN LOCAL STORAGE 
 * 
 **/

export const tokenRole = () => {

    const setRoleToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem('MUSIC_DEN_ROLE_TOKEN', token);
        }
    }

    const getRoleToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem('MUSIC_DEN_ROLE_TOKEN');
            return token;
        }
    }

    const removeRoleToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem('MUSIC_DEN_ROLE_TOKEN');
        }
    }

    return {
        setRoleToken, 
        getRoleToken,
        removeRoleToken
    }

  }