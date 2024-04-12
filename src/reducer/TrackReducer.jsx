"use client";



export const trackInit = (trackInitialState) => {
    const result = {
        ...trackInitialState, 
        item: {},
    }
    return result
}


export const trackInitialState = {
    item: {},
};


export const trackReducer = (state, action) => {
    switch(action.type){
        case 'ADD_ITEM':
            return {
                ...state,
                item: action.payload,
            } 
        case 'DELETE_ITEM':
            return {
                ...state,
                item: {id: action.payload.id},
            } 
        default:
           return state;

   }
}
