import { getSpots } from '../../store/spots';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotsIndexItem from './SpotsIndexItem'
import './Spots.css';

const SpotsIndex = () => {
    const spots = Object.values(
        useSelector((state) => (state.spots.allSpots 
            ? state.spots.allSpots : []))
    )
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpots())
      }, [dispatch]);

    return (
        <div id='indexBox'>
            {spots.map((spot) => (
                <SpotsIndexItem spot={spot} key={spot.id}/>
            ))}
        </div>

    )
}

export default SpotsIndex;
