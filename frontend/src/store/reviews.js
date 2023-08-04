import {csrfFetch} from './csrf';

const SPOT_REVIEWS = 'reviews/getSpotReviews';
const USER_REVIEWS = 'reviews/userReviews';
const DELETE_REVIEW = 'reviews/deleteReview';
const POST_REVIEW = 'reviews/postReview';

const getReviews = (reviews) => {
    return {
        type: SPOT_REVIEWS,
        reviews
    }
}

const userReviews = (reviews) => {
    return {
        type: USER_REVIEWS,
        reviews
    }
}

const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

const postNewReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    }
}

export const postReview = (newReview) => async (dispatch) => {
    const { review, stars, spotId } = newReview;
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {

        method: 'POST',
        body: JSON.stringify({
            review, 
            stars
        })
    });
    if (res.ok) {
        const review = await res.json();

        const fullRev = await csrfFetch('/api/session/reviews');
        const fullRev2 = await fullRev.json();
        const finalRev = fullRev2.Reviews.filter(rev => review.id === rev.id)[0]
        dispatch(postNewReview(finalRev))
        return finalRev
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
        const reviews = await res.json()
        dispatch(getReviews(reviews))
    } else {
        const errors = await res.json();
        return errors;
    }

};

export const getUserReviews = () => async (dispatch) => {
    const res = await csrfFetch('/api/session/reviews');
    if (res.ok) {
        const reviews = await res.json()
        dispatch(userReviews(reviews))
    } else {
        const errors = await res.json();
        return errors;
    }
}

// export const deleteReview = (reviewId) => async (dispatch, getState) => {
export const deleteReview = (reviewId) => async (dispatch) => {

    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeReview(reviewId))
    } else {
        const errors = await res.json();
        return errors;
    }
}

//don't change reviews.spot on post?? or add addtl info from other state if possible...?

const initialState = {spot: {}, user: {} }

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SPOT_REVIEWS:
            newState = {spot:{...state.spot}};
            if (action.reviews.Reviews) {
            action.reviews.Reviews.forEach(review => {
                newState.spot[review.id] = review
            })} else newState.spot = null;
            return {...state, ...newState};
        case USER_REVIEWS:
            newState = {user:{...state.user}};
            if (action.reviews.Reviews) {
                action.reviews.Reviews.forEach(review => {
                newState.user[review.id] = review
            })} else newState.user = null;
            return {...state, ...newState};
        case DELETE_REVIEW:
            newState = {...state, spot: {...state.spot}, user: {...state.user} };
            delete newState.spot[action.reviewId];
            delete newState.user[action.reviewId];
            return newState;
        case POST_REVIEW:
            newState = {...state, spot: {...state.spot}, user: {...state.user}};
            newState.spot = {...newState.spot, [action.review.id]:{...action.review}};
            newState.user = {...newState.user, [action.review.id]:{...action.review}};
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;