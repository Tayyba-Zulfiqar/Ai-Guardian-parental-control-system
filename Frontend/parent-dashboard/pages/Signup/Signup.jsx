import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signupSchema } from '../../src/validations/auth/signupSchema';
import splashScreen from '../../src/assets/images/SplashScreen.png';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';
import { CheckCircle2 } from 'lucide-react';
import '../Login/Login.css';

const Signup = () => {
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setServerError('');

    const result = signup(data.name, data.email, data.password);

    if (result.success) {
      // Auto login so they can access protected routes like /connect-child
      login(data.email, data.password);
      setShowSuccessModal(true);
    } else {
      setServerError(result.error || 'Signup failed. Please try again.');
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
            <h2>Create an Account</h2>
            <p className="auth-subtitle">Join us to keep your child safe.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="Enter your name"
                    className={errors.name ? 'error-input' : ''}
                  />
                </div>
                {errors.name && <span className="error-text">{errors.name.message}</span>}
              </div>

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
                    placeholder="Create a password"
                    className={errors.password ? 'error-input' : ''}
                  />
                </div>
                {errors.password && <span className="error-text">{errors.password.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'error-input' : ''}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword.message}</span>
                )}
              </div>

              {serverError && (
                <div className="error-text server-error">{serverError}</div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Sign Up'}
              </button>

            </form>

            <p className="auth-redirect">
              Already have an account? <Link to="/login">Log in instead</Link>
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => navigate('/connect-child')}
        title="Account Created"
      >
        <div className="success-modal-content">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={48} className="success-icon" />
          </div>
          <p>Your account has been created successfully! You can now proceed to connect your child's device.</p>
          <Button 
            variant="primary" 
            size="large" 
            onClick={() => navigate('/connect-child')}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;