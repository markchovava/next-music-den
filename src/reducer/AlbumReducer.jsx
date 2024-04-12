"use client";



export const albumInit = (albumInitialState) => {
    const result = {
        ...albumInitialState, 
        item: {},
    }
    return result
}


export const albumInitialState = {
    item: {},
};


export const albumReducer = (state, action) => {
    switch(action.type){
        case 'ADD_ITEM':
            return {
                ...state,
                item: action.payload,
            } 
        case 'DELETE_ITEM':
            return {
                ...state,
                item: { id: action.payload.id },
            } 
        default:
           return state;

   }
}
