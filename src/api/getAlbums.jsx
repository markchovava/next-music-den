import ApiKeys from "./apiKeys";

const limit1 = 4;
const limit2 = 12;

export async function getlastFMAlbumsByArtist4(id) {
    const { lastFmApiKey } = ApiKeys();
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${id}&api_key=${lastFmApiKey}&format=json&limit=${limit1}`)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}

export async function getlastFMAlbumsByArtist12(artist) {
    const { lastFmApiKey } = ApiKeys();
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${lastFmApiKey}&format=json&limit=12`)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}


export async function getlastFMAlbum(id, slug) {
    const { lastFmApiKey } = ApiKeys();
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${lastFmApiKey}&artist=${id}&album=${slug}&format=json`)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}