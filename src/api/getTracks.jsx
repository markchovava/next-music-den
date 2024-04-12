import ApiKeys from "./apiKeys";


const limit12 = 12;

/**
 *
 * GET 12 ARTISTS TRACKS
 * 
 * */
export async function getlastFMArtistTracks12(id) {
    const { lastFmApiKey } = ApiKeys();
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid=${id}&api_key=${lastFmApiKey}&format=json&limit=${limit12}`)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}

/**
 * 
 * GETS TRACK BY ARTIST NAME
 * 
 *      @id = artist name
 *      @slug = song name
 * 
 **/
export async function getlastFMArtistTrack(id, slug) {
    const { lastFmApiKey } = ApiKeys();
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lastFmApiKey}&artist=${id}&track=${slug}&format=json`)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}

/**
 * 
 * Get the latest 12 Tracks
 * 
 **/

export async function getlastFMTracks12() {
    const { lastFmApiKey } = ApiKeys();
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${lastFmApiKey}&format=json&limit=${limit12}`)
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}
