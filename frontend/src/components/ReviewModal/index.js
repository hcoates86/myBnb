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
    const [stars, setStars] = useState(0);
  const [buttonClass, setButtonClass] = useState('');

    const starDiv1 = document.querySelector('.one');

    useEffect (() => {
        if (stars >= 1 ) starDiv1.innerText = '★'
        
    }, [stars])

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
    const starChecker = (num) => {
        setStars(+num);
    }

    // if (stars === 1) return;

    const postYourReview = () => {
       const newReview = {review, stars, spotId}
       return (dispatch(postReview(newReview))).then(closeModal)
    };
  

    return (
        <div className="del-modal">
        <h1>How was your stay?</h1>
        <p className='errors'></p>
        {console.log('error-log!!!', errors[0])}
        <p>{errors.message}</p>
        <textarea 
            className='txtInput' 
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="8" cols="65"
            placeholder='Leave your review here...'
        />
        <div className='starSelect'>
            <div className='star-filled one' onClick={()=> {starChecker('1')}}>☆</div>
            {console.log(stars)}
            <div className='star-filled two' onClick={()=> {starChecker('2')}}>☆</div>
            <div className='star-filled three' onClick={()=> {starChecker('3')}}>☆</div>
            <div className='star-filled four' onClick={()=> {starChecker('4')}}>☆</div>
            <div className='star-filled five' onClick={()=> {starChecker('5')}}>☆</div>

            </div>
        <button disabled={disabled} onClick={postYourReview} id='postRevButton' className={buttonClass}>Submit Your Review</button>
        </div>
    )
}

export default ReviewModal;