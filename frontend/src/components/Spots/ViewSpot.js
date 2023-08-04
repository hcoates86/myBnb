// import { Link } from 'react-router-dom';
import './Spots.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spots';
import { getUserReviews, getSpotReviews } from '../../store/reviews';
import { useEffect, useState } from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ConfirmDeleteReviewModal from '../ConfirmDeleteReviewModal';
import ReviewModal from '../ReviewModal';



const ViewSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    //check if user owns this spot
    const [thisUser, setThisUser] = useState(false);
    //check if user's already left a review here
    const [reviewExists, setReviewExists] = useState(false);
    //sets number of reviews -- 0 for 0, 1 for 1, 2 for more than 1
    const [reviewNumber, setReviewNumber] = useState(0);
    const [numReviewsS, setNumReviewsS] = useState('Reviews');
    const [avgStarS, setAvgStarS] = useState('New')

    const alertP = () => alert('Feature Coming Soon...');


    const spot = useSelector((state) => {
    return state.spots.singleSpot;
    })

    useEffect(() => {
      dispatch(fetchSpot(spotId));
      dispatch(getSpotReviews(spotId));
      dispatch(getUserReviews());
    }, [dispatch]);

    const user = useSelector((state) => {
      return state.session.user
    })

    const reviews = Object.values(
      useSelector((state) => (
        state.reviews.spot ? state.reviews.spot : []
        ))
    )

    const userReviews = Object.values(useSelector((state) => (
      state.reviews.user ? state.reviews.user : []
      ))
    )


    useEffect(() => {
      if (spot) {
        if (spot.numReviews === +1) setReviewNumber(1);
        if (spot.numReviews === +0) setReviewNumber(0);
        if (spot.numReviews > +1) setReviewNumber(2);
      }
      if (reviewNumber === 1) setNumReviewsS("Review");
      if (reviewNumber !== 1) setNumReviewsS("Reviews");
      if (!spot.avgStarRating) {
        setAvgStarS("New")
      } else setAvgStarS(spot.avgStarRating.toFixed(1))

    }, [reviewNumber, spot, avgStarS])

    useEffect(() => {
      if (user && userReviews.filter(review => review.userId === user.id && review.spotId === spot.id).length) setReviewExists(true);
      else setReviewExists(false);
      console.log(reviewExists)
    }, [userReviews, user])

  

    useEffect(()=> {
      if (user && spot && spot.ownerId === user.id) {
        setThisUser(true)
      } else setThisUser(false)
    }, [user, spot, thisUser])

    // useEffect(() => {
      
    // })

    if (!spot || !spot.SpotImages || !spot.Owner) return null;
    // if (!user) return null;
    if (!reviews) return null;

    const spotImages = spot.SpotImages;


    const months = ['0', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function monthConverter(num) {
      if (+num < 10) num = num[1];
      return months[+num]
    }
    
      return (
        <>
        <div id='outer-box'>
          <div id='bottom-separator'>
          <h1>{spot.name}</h1>
          <h3>{spot.city}, {spot.state}, {spot.country}</h3>
         
            <div className='grid-container'>

                    {spotImages?.map((image) => (
                        image.preview === true 
                        ? <img id='preview' src={image.url} alt={spot.name} key={image.id}></img>
                        : <img key={image.id} src={image.url} alt={spot.name}></img>
                    ))}

          </div>
          
           <div className='reserve'>
            <p className='price'><span>${spot.price}</span> night</p>
            <p className='res-reviews'><span id="star">★</span>{avgStarS} &#183; {spot.numReviews} {numReviewsS}</p>
            <button onClick={alertP} className='button-orange' id='reserveButton'>Reserve</button>
          </div>

            <div className='spotDesc'>
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p>{spot.description}</p>
            </div>
        
        </div>

        <div className=''>
          <h1><span id="star2">★</span> {avgStarS} 
          {avgStarS === 'New' ? (<></>) : (<>
          &nbsp; &#183; &nbsp;{spot.numReviews} {numReviewsS}
          </>)}
          </h1>
    
          {(user && (!thisUser && !reviewExists)) ? (
          // {(user && !thisUser) || (!reviewExists && user) ? (
          <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={<ReviewModal spotId={spotId}/>}
                />
            
            
          ) : <></>
        }

          {reviewNumber ? (<></>)
          : (
            <>
            <p>Be the first to post a review!</p>
            </>
          )}
          
          <div className='reviews-container'>
       
          {reviews.map(review => (
            <div id='review-box' key={review.id}>
            <p className='review-text'>{review.User.firstName}</p>
            <p className='review-text grey'>{monthConverter(review.createdAt.split('-')[1])} {review.createdAt.split('-')[0]}</p>
            <p>{review.review}</p>
            { review.userId === user?.id ? 
            (
            <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<ConfirmDeleteReviewModal reviewId={review.id} />}
                />
          ) :
          (<></>) 
          }
            </div>
          ))}
     </div>

        </div>
        </div>

        </>
      )
}

export default ViewSpot;