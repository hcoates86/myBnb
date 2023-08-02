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
    const [filled, setFilled] = useState('☆');
    
  const [buttonClass, setButtonClass] = useState('');

    const starDiv1 = document.querySelector('.one');
    const starDiv2 = document.querySelector('.two');
    const starDiv3 = document.querySelector('.three');
    const starDiv4 = document.querySelector('.four');
    const starDiv5 = document.querySelector('.five');


    useEffect(() => {
        disabled ? setButtonClass('') : setButtonClass('button-orange')
    }, [disabled])


    useEffect (() => {
        if(review.length >= 10 && stars) setDisabled(false);
        if(review.length < 10) setDisabled(true);
        if(!stars) setDisabled(true);
    }, [review, stars])
    

    useEffect (() => {

        if (stars >= 1 ) starDiv1.innerText = '★';
        if (stars >= 2 ) starDiv2.innerText = '★';
        if (stars >= 3 ) starDiv3.innerText = '★';
        if (stars >= 4 ) starDiv4.innerText = '★';
        if (stars === 5 ) starDiv5.innerText = '★';

        if (stars >=1) {
            if (stars < 2) starDiv2.innerText = '☆';
            if (stars < 3) starDiv3.innerText = '☆';
            if (stars < 4) starDiv4.innerText = '☆';
            if (stars < 5) starDiv5.innerText = '☆';
        }
        
    }, [stars])


    

    // useEffect(()=> {
    //     const errorObj = {};
    //     setErrors(errorObj)
    //     if (!Object.values(errorObj).length) {
    //         setDisabled(false);
    //         setButtonClass('button-orange')
    //         } if (Object.values(errorObj).length) {
    //             setDisabled(true);
    //             setButtonClass('');
    //         }
    // }, [])

//★☆
    const starChecker = (num) => {
        setStars(+num);
    }

    const postYourReview = async () => {
       const newReview = {review, stars, spotId}
    //    return (dispatch(postReview(newReview))).then(closeModal)
        const reviewSent = await dispatch(postReview(newReview));
        console.log('checkthis', await reviewSent)
        // console.log('stuff', review, stars, spotId)
        closeModal();
    };
  

    return (
        <div className="del-modal">
        <h1>How was your stay?</h1>
        <p className='errors'></p>
        {console.log('error-log!!!', errors)}

        <p>{errors.message}</p>
        <textarea 
            className='' 
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="8" cols="50"
            placeholder='Leave your review here...'
        />
        <div className='starSelect'>
            <div className='star-filled one' onClick={()=> {starChecker('1')}}>☆</div>
            <div className='star-filled two' onClick={()=> {starChecker('2')}}>☆</div>
            <div className='star-filled three' onClick={()=> {starChecker('3')}}>☆</div>
            <div className='star-filled four' onClick={()=> {starChecker('4')}}>☆</div>
            <div className='star-filled five' onClick={()=> {starChecker('5')}}>☆</div>
            <span id='starSpan'> Stars</span>
            </div>
        <button disabled={disabled} onClick={postYourReview} id='postRevButton' className={buttonClass}>Submit Your Review</button>
        </div>
    )
}

export default ReviewModal;