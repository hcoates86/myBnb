import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserReviews } from '../../store/reviews';
import { getSpots } from '../../store/spots';
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
        dispatch(getSpots())
    }, [dispatch]);

    // useEffect(() => {
        
    // }, [spots]);

    const months = ['0', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function monthConverter(num) {
      if (+num < 10) num = num[1];
      return months[+num]
    }

    if (!spots) return null;

    function spotNameFinder(reviewId) {
            const spotName = spots.filter((spot) => spot.id === reviewId)[0]
            if(!spotName) return null;
            return spotName.name;
    }

    const refreshPage = () => window.location.reload();
    
    return (
        <div className='manage-reviews-box'>
            <h1>Manage Reviews</h1>

            <div className='indexBox'>
            {userReviews.map((review) => (
                <div id='review-box' key={review.id}>
                <p className='review-text'> {spotNameFinder(review.id)}</p>
                <p className='review-text grey'>{monthConverter(review.createdAt.split('-')[1])} {review.createdAt.split('-')[0]}</p>
                <p>{review.review}</p>
                <Link to={`/reviews/${review.id}`} key={review.id}><button className='button-grey butt-pad'>Update</button></Link>
                <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<ConfirmDeleteReviewModal reviewId={review.id} userReviews={userReviews} 
                />}
                />
                </div>
            ))}


        </div>

        </div>

    )
}

export default ManageReviews;