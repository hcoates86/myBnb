import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(true);
  const [color, setColor] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log(data); //test
        if (data && data.errors) {
          setErrors(data.errors);
          const login = {login: "The provided credentials were invalid"}
          setErrors(login)
        }
      });
      
  };

  const loginDemo = () => {
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    .then(closeModal)
  }

  useEffect(()=> {
    const errorObj = {};
    if (credential.length < 4) errorObj["username"] = "Username must be between 4 and 30 characters";
    if (password.length < 6) errorObj['password'] = "Password must be at least 6 characters long";
    setErrors(errorObj)
    if (credential.length >= 4 && password.length >=6 ) setDisabled(false);
    if (credential.length < 4 || password.length < 6 ) setDisabled(true);
  }, [credential, password])

  useEffect(() => {
    if (!disabled) setColor('login-color');
    if (disabled) setColor('');
  }, [disabled])


  return (
    <div className="login-outer-box">
    <div className="login-box">
      <h1 id='login-h1'>Log In</h1>

      <p className="errors highlight">{errors.login}</p>
      <form onSubmit={handleSubmit}>
        <label >
          <input
            className="input"
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label >         
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        
        {/* {errors.credential && (
          <p>{errors.credential}</p>
        )} */}
        <button type="submit"
                id="login-button"
                className={color}
                disabled={disabled}
        >Log In</button>
      </form>
      <h2 id='demo' onClick={loginDemo}>Log in as Demo User</h2>
    </div>
    </div>
  );
}

export default LoginFormModal;