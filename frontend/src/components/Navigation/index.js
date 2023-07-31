import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/logo64.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
  <div className='navbar'>
    
    <ul>
      <li className='left-nav'>
        <NavLink exact to="/">
          <div className='navlogo-container'> 
        <img className='logo-nav' src={logo} alt="mybnb logo"></img> <span id='logobnb'>mybnb</span> 
        </div>
        </NavLink>
      </li>
     
      {isLoaded && (
        <>
        <li className='right-nav'>
        {sessionUser ? (<>
        <NavLink exact to="/spots/new" id='newSpotText'>Create a New Spot</NavLink>
        </>): <></>}
          <ProfileButton user={sessionUser} />
        </li>  
        </>   
      )}

    </ul>
  </div>
  );
}

export default Navigation;