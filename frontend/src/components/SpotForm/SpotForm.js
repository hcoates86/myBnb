import { useState, useEffect } from 'react';
import { createSpot, postImage } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './SpotForm.css';
import noImgUrl from '../../images/NoImage.png';

const SpotForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.session.user
     })

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [aState, setAState] = useState('');
    const [country, setCountry] = useState('');
    // const [lat, setLat] = useState('');
    // const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [prevImg, setPrevImg] = useState('');
    const [imgurl1, setImgurl1] = useState('');
    const [imgurl2, setImgurl2] = useState('');
    const [imgurl3, setImgurl3] = useState('');
    const [imgurl4, setImgurl4] = useState('');

    const [errors, setErrors] = useState({});
    
    // let errorLog = {};

    useEffect(()=> {
        const errorObj = {};
        // const urlArray = [prevImg, imgurl1, imgurl2, imgurl3, imgurl4];
        const fileTypes = ['.jpeg', '.png', '.jpg'];

        if (!address) errorObj['address'] = 'Address is required' ;
        if (!city) errorObj['city'] = 'City is required';
        if (!aState) errorObj['state'] = 'State is required';
        if (!country) errorObj['country'] = 'Country is required';
        if (!name) errorObj['name'] = 'Name is required';
        if (name.length > 50) errorObj['name'] = "Name can't be more than 50 characters long";
        if (!description) errorObj['description'] = 'Description is required';
        if (!description > 30) errorObj['description'] = 'Description needs 30 or more characters';
        if (!price) errorObj['price'] = 'Price per night is required';       

        if (!(fileTypes.some(type => {
            return prevImg.endsWith(type)}))) {
            errorObj['prevImg'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!prevImg) errorObj['prevImg'] = 'Preview image is required';
        if (!(fileTypes.some(type => {return imgurl1.endsWith(type)})) && imgurl1.length) {
            errorObj['imgurl1'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!(fileTypes.some(type => {
            return imgurl2.endsWith(type)})) && imgurl2.length) {
            errorObj['imgurl2'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!(fileTypes.some(type => {
            return imgurl3.endsWith(type)})) && imgurl3.length) {
            errorObj['imgurl3'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!(fileTypes.some(type => {
            return imgurl4.endsWith(type)})) && imgurl4.length) {
            errorObj['imgurl4'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } 


        setErrors(errorObj);
    }, [address, city, aState, country, name, description, price, prevImg, imgurl1, imgurl2, imgurl3, imgurl4])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorClass = document.querySelectorAll('.errors');
        errorClass.forEach(one => one.removeAttribute("hidden"));

            let spot = {
                address, city, state: aState, country, lat: 1, lng: 1, name, description, price
            }

            const newSpot = await dispatch(createSpot(spot))
            if ('id' in  newSpot) {
                let newImgPrev = {url: prevImg, preview: true, spotId: newSpot.id};
                let newImg1 = {url: imgurl1 || noImgUrl, preview: false, spotId: newSpot.id};
                let newImg2 = {url: imgurl2 || noImgUrl, preview: false, spotId: newSpot.id};
                let newImg3 = {url: imgurl3 || noImgUrl, preview: false, spotId: newSpot.id}; 
                let newImg4 = {url: imgurl4 || noImgUrl, preview: false, spotId: newSpot.id};

                newSpot.Owner = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                }

                dispatch(postImage(newImgPrev));
                dispatch(postImage(newImg1));
                dispatch(postImage(newImg2));
                dispatch(postImage(newImg3));
                dispatch(postImage(newImg4));
   
                history.push(`/spots/${newSpot.id}`);
             }
    }



    return (
        <div className='outer'>
        <div className='inner'>
        <form id='display' onSubmit={handleSubmit}>
        <div className='borderBox'>
        <h1>Create a New Spot</h1>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <label>Country <span className='errors' hidden>{errors.country}</span>
        <div id='country'>
            <input type='text' className='txtInput' 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder='country' 
                />
        </div>
        </label>

        <label>Address <span className='errors' hidden>{errors.address}</span>
        <div id='address'>
            <input type='text' className='txtInput' 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='address' />
        </div>
        </label>

    <div className='city-state'>
        <div id='city'>
            <label>City <span className='errors' hidden>{errors.city}</span>
            
                <input type='text' className='txtInput' 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='city' />
            
            </label></div>
            <div id='state'>
            <label>State <span className='errors' hidden>{errors.state}</span>
            
                <input type='text' className='txtInput' 
                    value={aState}
                    onChange={(e) => setAState(e.target.value)}
                    placeholder='STATE' />
            
            </label></div>
    </div>


        {/* <label>Latitude
        <input type='text' className='txtInput' 
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder='latitude' />
        </label>     */}
            
        {/* <label>Longitude  
        <input type='text' className='txtInput' 
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder='longitude' />
        </label>       */}
        </div>

        <div className='borderBox'>
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

        <textarea 
            className='txtInput' 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="8" cols="65"
            placeholder='Please write at least 30 characters'
        />
        <p className='errors' hidden>{errors.description}</p>
        </div>

        <div className='borderBox'>
        <h2>Create a title for your spot</h2>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

        <input type='text' 
            className='txtInput' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name of your spot'
            />
        <p className='errors' hidden>{errors.name}</p>
        
        </div>

        <div className='borderBox'>
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div id='price'>
            <label><strong>$ </strong>
            <input type='number' 
                className='txtInput' 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Price per night (USD)' />
            </label>
        </div>
        <p className='errors' hidden>{errors.price}</p>
        </div>

        <div className='borderBox'>
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>


        <input type='url' className='txtInput'
            value={prevImg}
            onChange={(e) => setPrevImg(e.target.value)}
            placeholder='Preview Image URL' />
        <p className='errors' hidden>{errors.prevImg}</p>

            <input type='url' className='txtInput' 
                value={imgurl1}
                onChange={(e) => setImgurl1(e.target.value)}
                placeholder='Image URL' />
            <p className='errors' hidden>{errors.imgurl1}</p>
            <input type='url' className='txtInput' 
                value={imgurl2}
                onChange={(e) => setImgurl2(e.target.value)}
                placeholder='Image URL' />
            <p className='errors' hidden>{errors.imgurl2}</p>
            <input type='url' className='txtInput' 
                value={imgurl3}
                onChange={(e) => setImgurl3(e.target.value)}
                placeholder='Image URL' />
            <p className='errors' hidden>{errors.imgurl3}</p>
            <input type='url' className='txtInput' 
                value={imgurl4}
                onChange={(e) => setImgurl4(e.target.value)}
                placeholder='Image URL' />
            <p className='errors' hidden>{errors.imgurl4}</p>
            </div>

        <div>
        <input type='submit' id='createButton' value='Create Spot' />
        </div>
        </form>
        </div></div>

    )
}

export default SpotForm;