"use client";


export const artistInit = (artistInitialState) => {
    const result = {
        ...artistInitialState, 
        item: {},
    }
    return result;
}


export const artistInitialState = {
    item: {},
};


export const artistReducer = (state, action) => {
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
