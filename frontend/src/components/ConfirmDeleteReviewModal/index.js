import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

function ConfirmDeleteReviewModal({reviewId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirmDelete = () => {
      return (dispatch(deleteReview(reviewId))).then(closeModal)
    };
  

    return (
        <div className="del-modal">
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this review?</h3>
        <button onClick={confirmDelete}>Yes (Delete Review)</button>
        <button onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
}

export default ConfirmDeleteReviewModal;