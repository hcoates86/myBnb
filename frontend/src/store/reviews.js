import {csrfFetch} from './csrf';
import { useParams } from 'react-router-dom';

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

export const postReview = (review) => async (dispatch) => {
    const { spotId } = useParams();
    const res = await csrfFetch(`api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    });
    if (res.ok) {
        const review = await res.json();
        dispatch(postNewReview(review))
        return review
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



const initialState = {spot: {}, user: {} }

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SPOT_REVIEWS:
            newState = {spot:{}};
            if (action.reviews.Reviews) {
            action.reviews.Reviews.forEach(review => {
                newState.spot[review.id] = review
            })} else newState.spot = null;
            return {...state, ...newState};
        case USER_REVIEWS:
            newState = {user:{}};
            if (action.reviews.Reviews) {
                action.reviews.Reviews.forEach(review => {
                newState.user[review.id] = review
            })} else newState.user = null;
            return {...state, ...newState};
        case DELETE_REVIEW:
            newState = {...state};
            delete newState.spot[action.reviewId];
            delete newState.user[action.reviewId];
            return newState;
        case POST_REVIEW:
            newState = {...state};
            newState.spot = {...newState.spot, ...action.review};
            newState.user = {...newState.user, ...action.review};
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;