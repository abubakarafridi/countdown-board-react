import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import './Authentication.css';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/countdown-home'); // Navigate after successful login
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess('You have successfully created a user');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-body">
          {success && (
            <div className="alert alert-primary" role="alert">
              {success}
            </div>
          )}
          <h2 className="text-center mb-4">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="w-100" onSubmit={handleSubmit}>
            <div id="email" className="mb-3">
              <label>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-control"
              />
            </div>
            <div id="password" className="mb-3">
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-control"
              />
            </div>
            <button className="w-100 auth-btn" type="submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <div className="w-100 text-center mt-3">
            <button
              type="button"
              onClick={toggleMode}
              className="toggle-link btn-link"
            >
              {isLogin
                ? 'Create an account'
                : 'Already have an account? Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
