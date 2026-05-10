import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, ShieldAlert } from 'lucide-react';
import Button from '../components/common/Button/Button';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <motion.div 
                className="not-found-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="not-found-icon-wrapper">
                    <span className="not-found-error-code">404</span>
                    <motion.div
                        animate={{ 
                            rotate: [0, -10, 10, -10, 0],
                            scale: [1, 1.1, 1, 1.1, 1]
                        }}
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            ease: "easeInOut" 
                        }}
                    >
                        <ShieldAlert size={80} strokeWidth={1.5} />
                    </motion.div>
                </div>

                <h1 className="not-found-title">Page Not Found</h1>
                <p className="not-found-description">
                    The page you are looking for might have been removed, had its name changed, 
                    or is temporarily unavailable. Let's get you back on track.
                </p>

                <div className="not-found-actions">
                    <Button 
                        variant="outline" 
                        icon={ArrowLeft} 
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>
                    <Button 
                        variant="primary" 
                        icon={Home} 
                        onClick={() => navigate('/')}
                    >
                        Back to Dashboard
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;