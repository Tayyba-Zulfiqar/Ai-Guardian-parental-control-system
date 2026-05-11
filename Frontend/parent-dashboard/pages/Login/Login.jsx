import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginSchema } from '../../src/validations/auth/loginSchema';
import splashScreen from '../../src/assets/images/SplashScreen.png';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setServerError('');

    const result = login(data.email, data.password);

    if (result.success) {

      navigate('/dashboard');
    } else {
      setServerError(result.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split-container">
        <div className="auth-left-pane">
          <div className="auth-image-container">
            <img src={splashScreen} alt="AI Guardian Logo" />
          </div>
          <div className="auth-brand">
            <h1>AI GUARDIAN</h1>
            <p>Empowering Parents in the Digital Age</p>
          </div>
        </div>

        <div className="auth-right-pane">
          <div className="auth-form-container">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Please enter your details to sign in.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="Enter your email"
                    className={errors.email ? 'error-input' : ''}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="Enter your password"
                    className={errors.password ? 'error-input' : ''}
                  />
                </div>
                {errors.password && <span className="error-text">{errors.password.message}</span>}
              </div>

              {serverError && (
                <div className="error-text server-error">{serverError}</div>
              )}

              <div className="form-options">
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="auth-redirect">
              Don't have an account? <Link to="/signup">Sign up instead</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;