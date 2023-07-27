import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { postReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

function ReviewModal({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(null);
  const [buttonClass, setButtonClass] = useState('');


    useEffect(()=> {
        const errorObj = {};
        setErrors(errorObj)
        if (!Object.values(errorObj).length) {
            setDisabled(false);
            setButtonClass('button-orange')
            } if (Object.values(errorObj).length) {
                setDisabled(true);
                setButtonClass('');
            }
    }, [])


//★☆

    const postYourReview = () => {
       const newReview = {...review, ...stars, spotId}
       return (dispatch(postReview(newReview))).then(closeModal)
    };
  

    return (
        <div className="del-modal">
        <h1>How was your stay?</h1>
        <p className='errors'></p>
        {console.log('error-log!!!', errors)}
        <p>{errors.message}</p>
        <textarea 
            className='txtInput' 
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="8" cols="65"
            placeholder='Leave your review here...'
        />
        <p className='starSelect'><span className='star-indiv'>☆</span><span className='star-indiv'>☆</span></p>
        <button disabled={disabled} onClick={postYourReview} id='postRevButton' className={buttonClass}>Submit Your Review</button>
        </div>
    )
}

export default ReviewModal;