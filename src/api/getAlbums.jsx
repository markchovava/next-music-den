import ApiKeys from "./apiKeys";


/**
 * 
 * LAST.FM API for Artist Albums 
 * 
 **/

const limit1 = 4;
const limit2 = 12;

/**
 * 
 * Get the latest 4 Albums
 * 
 **/

export async function getlastFMAlbumsByArtist4(id) {
    const { lastFmApiKey } = ApiKeys();
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${id}&api_key=${lastFmApiKey}&format=json&limit=${limit1}`)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}

/**
 * 
 * Get the latest 12 Albums
 * 
 **/

export async function getlastFMAlbumsByArtist12(artist) {
    const { lastFmApiKey } = ApiKeys();
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${lastFmApiKey}&format=json&limit=12`)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}


/**
 * 
 * Gets the Album Info
 * 
 **/

export async function getlastFMAlbum(id, slug) {
    const { lastFmApiKey } = ApiKeys();
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${lastFmApiKey}&artist=${id}&album=${slug}&format=json`)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}