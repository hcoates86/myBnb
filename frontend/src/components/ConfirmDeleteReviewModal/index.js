import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from 'react';
import { getUserReviews } from '../../store/reviews';



function ConfirmDeleteReviewModal({reviewId, userReviews}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const [reviewRemoved, setReviewRemoved] = useState(null);

    useEffect(() => {
        dispatch(getUserReviews())

    }, [userReviews, dispatch])

    const confirmDelete = async () => {
      // return (dispatch(deleteReview(reviewId))).then(closeModal)
        await dispatch(deleteReview(reviewId));
        // setReviewRemoved(reviewId);
        closeModal();
    };
  

    return (
        <div className="del-modal">
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this review?</h3>
        <button onClick={confirmDelete} className='delbutt button-orange'>Yes (Delete Review)</button>
        <button onClick={closeModal} className='delbutt button-grey'>No (Keep Review)</button>
        </div> 
    )
}

export default ConfirmDeleteReviewModal;