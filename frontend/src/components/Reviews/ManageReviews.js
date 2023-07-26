import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { removeSpot, getUserSpots } from '../../store/spots';
import { getUserReviews, getSpotReviews } from '../../store/reviews';
// import SpotsIndexItem from '../Spots/SpotsIndexItem';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ConfirmDeleteReviewModal from '../ConfirmDeleteReviewModal';

const ManageReviews = () => {

    const dispatch = useDispatch();

    const spots = Object.values(
        useSelector((state) => (state.spots.allSpots 
            ? state.spots.allSpots : []))
    )

    const userReviews = Object.values(
        useSelector((state) => (state.reviews.user
            ? state.reviews.user : []))
    )

    const user = useSelector ((state) => state.session.user)

    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch]);

    // useEffect(() => {
        
    // }, [spots]);


    return (
        <div>
            <h1>Manage Reviews</h1>

            <div className='indexBox'>
            {userReviews.map((review) => (
                <>
                <Link to={`/reviews/${review.id}`} key={review.id}><button>Update</button></Link>
                <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<ConfirmDeleteReviewModal reviewId={review.id} />}
                />
                </>
            ))}
        </div>

        </div>

    )
}

export default ManageReviews;