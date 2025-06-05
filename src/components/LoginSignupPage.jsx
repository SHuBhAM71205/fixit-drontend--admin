import React,{useState} from 'react'
import './AuthForm.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/Logincontextprovider';
const URL=import.meta.env.VITE_backend;

export default function AuthForm({ onLoginSuccess }) 
{ 
  const { login } = useAuth(); 
  const navig=useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [allow,setallow]=useState(false)
  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    email: form.email.value,
    password: form.password.value,
    ...(isLogin ? {} : { name: form.name.value })
  };

  if (!isLogin && !form.terms.checked) {
    alert('You must accept the terms and conditions.');
    return;
  }

  try {
    const res = await fetch(`${URL}/api/auth/${isLogin ? 'login' : 'createUser'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = await res.json();

    if (!res.ok) {
      // Handle failed login or signup
      alert(resData.message || "Wrong credentials");
      return;
    }

    // If successful login
    if (isLogin) {
      if (resData.user?.role?.name === 'admin') {
        localStorage.setItem('auth-token', res.headers.get('Auth-Token'));
        login(); // from context
        navig('/'); // Navigate after login
      } else {
        alert("Access denied: only admin can log in.");
      }
    } else {
      alert("Signup successful! Please log in.");
      setIsLogin(true); // Switch to login after signup
    }
  } catch (error) {
    console.error(error);
    alert("Server error. Please try again later.");
  }
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
