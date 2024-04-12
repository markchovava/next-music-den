import ApiKeys from "./apiKeys";
import lastFM from "./lastFm"


export async function getlastFMArtists1() {
    const { topArtistsURL1 } = lastFM();
    const response = await fetch(topArtistsURL1)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}


export async function getlastFMArtists2() {
    const { topArtistsURL2 } = lastFM();
    const response = await fetch(topArtistsURL2)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}


export async function getlastFMArtist(id) {
    const { lastFmApiKey } = ApiKeys();
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${id}&api_key=${lastFmApiKey}&format=json`)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}




