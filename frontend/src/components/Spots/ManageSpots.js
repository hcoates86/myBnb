import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSpots } from '../../store/spots';
// import { getUserReviews, getSpotReviews } from '../../store/reviews';
import SpotsIndexItem from './SpotsIndexItem';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';


const ManageSpots = () => {

    const dispatch = useDispatch();

    const spots = Object.values(
        useSelector((state) => (state.spots.allSpots 
            ? state.spots.allSpots : []))
    )

    const user = useSelector ((state) => state.session.user)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch]);

    // useEffect(() => {
        
    // }, [spots]);

    // if (!spots || !spots.length) return null;



    return (
        <div>
            <div className='manage-spots-div'>
            <h1>Manage Spots</h1>
            <Link to='/spots/new'><button className='button-grey'>Create a New Spot</button></Link>
            </div>
            <div className='indexBox'>
            {spots.filter(spot => spot.ownerId === user.id).map((spot) => (
                <div id='manageSpotDiv'>
                <SpotsIndexItem spot={spot} key={spot.id}/>
                <div>
                <Link to={`/user/spots/${spot.id}`} key={spot.id}><button id='updateButtonManage' className='button-grey butt-pad'>Update</button></Link>
                <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<ConfirmDeleteModal spotId={spot.id} />
            }
                />
                </div>
                </div>
            ))}
        </div>

        </div>
    )



}

export default ManageSpots;