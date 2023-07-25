import {csrfFetch} from './csrf';

const GET_SPOTS = 'spots/getAllSpots';
const VIEW_SPOT = 'spots/getSingleSpot';
const MAKE_SPOT = 'spots/makeSpot';
const UPDATE_SPOT ='spots/updateSpot';
const DELETE_SPOT ='spots/deleteSpot';
const ADD_IMAGE = 'spots/addImage';
const USER_SPOTS = 'spots/userSpots';

const getAllSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

const getSingleSpot = (spot) => {
    return {
        type: VIEW_SPOT,
        spot
    }
}

const makeSpot = (spot) => {
    return {
        type: MAKE_SPOT,
        spot
    }
}

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image
    }
}

const userSpots = (spots) => {
    return {
        type: USER_SPOTS,
        spots
    }
}


export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
        const spots = await res.json()
        dispatch(getAllSpots(spots))
    }

};

export const fetchSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spot = await res.json()
        dispatch(getSingleSpot(spot))
    } else {
        const errors = await res.json();
        return errors;
      }
}

export const createSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots/new', {
        method: 'POST',
        body: JSON.stringify(spot)
    });

    if (res.ok) {
        const newSpot = await res.json();
        dispatch(makeSpot(newSpot))
        return newSpot;
    } else {
        const errors = await res.json();
        return errors;
    }
    
}

export const postImage = (image) => async (dispatch) => {
    const { url, preview, spotId } = image;
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify({
            url,
            preview
        })
    });

    if (res.ok) {
        const newImage = await res.json();
        dispatch(addImage([newImage]));
        return newImage;
    } else {
        const errors = await res.json();
        return errors;
    }
}


export const updatedSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    });
    if (res.ok) {
        const newSpot = await res.json();
        dispatch(updateSpot(newSpot));
        return newSpot;
    } else {
        const errors = await res.json();
        return errors;
      }
}

export const removeSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(deleteSpot(spotId))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const getUserSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/session/spots');
    if (res.ok) {
        const spots = await res.json()
        dispatch(userSpots(spots))
    } else {
        const errors = await res.json();
        return errors;
    }
}




const initialState = {allSpots:{}, singleSpot: { SpotImages: []}, user: {}}


const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            const spotsState = {allSpots:{}};
            action.spots.Spots.forEach(spot => {
                spotsState.allSpots[spot.id] = spot
            })
            return {...state, ...spotsState}
        case VIEW_SPOT:
            newState = {...state};
            newState.singleSpot = action.spot;
            return newState;
        case MAKE_SPOT:
            newState = {...state}
            newState.singleSpot = action.spot;
            return newState;
        case ADD_IMAGE:
            newState = {...state};
            // const old = newState.singleSpot.SpotImages;
            newState.singleSpot.SpotImages = [...action.image];
            return newState;
        case UPDATE_SPOT:
            newState = {...state}
            newState.allSpots[action.spot.id] = action.spot;
            let newState2 = {...state, ...newState}; //test this
            return newState2;
        case DELETE_SPOT:
            newState = {...state};
            delete newState.allSpots[action.spotId];
            return newState;
        // case USER_SPOTS:
        //     newState = {user:{}};
        //         action.spots.Spots.forEach(spot => {
        //             newState.user[spot.id] = spot;
        //     })
        //     return {...state, ...newState};
     default:
        return state;
      }
    }


export default spotReducer;