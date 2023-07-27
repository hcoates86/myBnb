import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { postReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

function ReviewModal({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true)
    const [review, setReview] = useState('');

    useEffect(()=> {

        if (!Object.values(errorObj).length) {
            setDisabled(false);
            setButtonClass('button-orange')
            } if (Object.values(errorObj).length) {
                setDisabled(true);
                setButtonClass('');
            }
    }, [])




    const postYourReview = () => {
      return (dispatch(postReview(review))).then(closeModal)
    };
  

    return (
        <div className="del-modal">
        <h1>How was your stay?</h1>
        <p className='errors'></p>
        <textarea 
            className='txtInput' 
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="8" cols="65"
            placeholder='Leave your review here...'
        />
        <button disabled={disabled} onClick={postYourReview} className='button-orange'>Submit Your Review</button>
        </div>
    )
}

export default ReviewModal;