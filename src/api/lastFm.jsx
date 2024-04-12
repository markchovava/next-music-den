import ApiKeys from './apiKeys';


export default function lastFM(){
    const lastFmUrl = `http://ws.audioscrobbler.com/2.0/?`;
    const { lastFmApiKey } = ApiKeys();
    const limit1 = 4;
    const limit2 = 12;
    /* ARTISTS */
    const topArtistsURL1 = `${lastFmUrl}method=chart.gettopartists&api_key=${lastFmApiKey}&format=json&limit=${limit1}`;
    const topArtistsURL2 = `${lastFmUrl}method=chart.gettopartists&api_key=${lastFmApiKey}&format=json&limit=${limit2}`;
    /* TRACKS */
    const topTracksURL1 = `${lastFmUrl}method=chart.gettoptracks&api_key=${lastFmApiKey}&format=json&limit=${limit1}`;
    const topTracksURL2 = `${lastFmUrl}method=chart.gettopartists&api_key=${lastFmApiKey}&format=json&limit=${limit2}`;


    return {
        lastFmUrl,
        topArtistsURL1,
        topArtistsURL2,
        topTracksURL1,
        topTracksURL2,
    }
}