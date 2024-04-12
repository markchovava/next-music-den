import { baseURL } from "./baseURL";


export async function getUsers() {
    const response = await fetch(`${baseURL}user`, { cache: 'no-cache'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}