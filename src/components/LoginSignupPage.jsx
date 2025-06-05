import React,{useState} from 'react'
import './AuthForm.css'
import { useNavigate } from "react-router-dom";
const URL=import.meta.env.VITE_backend;

export default function AuthForm() 
{ 
  const navig=useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
      ...(isLogin ? {} : { name: form.name.value})
    };

    if (!isLogin && !form.terms.value) {
      alert('You must accept the terms and conditions.');
      return;
    }


    fetch(`${URL}api/auth/${isLogin?'login':'createUser'}`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    }).then(response=>{
      localStorage.setItem('auth-token',response.headers.get('Auth-Token'));
    }).catch(error=>{
      console.log(error)
    })
    if (isLogin) {
      setTimeout(()=>{
          navig("/")
      },1000)
    }
    else{
      setTimeout(()=>{
        setIsLogin(true);
      },1000)
    }
        
    alert(`${isLogin ? 'Logging in' : 'Signing up'} with data:\n${JSON.stringify(data, null, 2)}`);
    // You can replace the alert with your API call logic here
  };

  return (
    <div className="container-form">

      <form className="form-box" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <div className="toggle-buttons">
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Signup</button>
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
      </div>

        {!isLogin && (
          <input type="text" name="name" placeholder="Full Name" required />
        )}

        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />

        {!isLogin && (
          <div className="checkbox">
            <input type="checkbox" id="terms" name="terms" required />
            <label htmlFor="terms">I accept the terms</label>
          </div>
        )}

        {isLogin && (
          <a href="#" className="forgot">Forgot password?</a>
        )}

        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
    </div>
  );
}
