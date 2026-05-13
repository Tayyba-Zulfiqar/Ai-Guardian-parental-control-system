import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import Toast from '../../components/common/Toast/Toast';
import {
    ProfileSection,
    NotificationPreferences,
    DangerZone,
    PasswordModal,
    DeleteAccountModal
} from '../../components/ui/Parent-Account';
import { parentProfileData } from '../../data/Parent-Account/parentProfileData';
import './ParentAccount.css';

const ParentAccount = () => {
    const { user, updateUser, deleteAccount } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(parentProfileData);

    // Sync with authenticated user data
    useEffect(() => {
        if (user) {
            setProfile(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email
            }));
        }
    }, [user]);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePasswordError, setDeletePasswordError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type, id: Date.now() });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const handleUpdateProfile = useCallback((newData) => {
        if (newData.name || newData.email) {
            const result = updateUser(newData);
            if (!result.success) {
                showToast(result.error || 'Update failed', 'error');
                return;
            }
        }

        setProfile(prev => ({ ...prev, ...newData }));

        const field = Object.keys(newData)[0];
        showToast(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`);
    }, [showToast, updateUser]);

    const handleToggleNotifications = useCallback(() => {
        setProfile(prev => {
            const newState = !prev.notifications.enabled;
            let updatedNotifications = { ...prev.notifications, enabled: newState };

            if (newState) {
                const hasActiveOption = prev.notifications.harmfulContentAlerts || prev.notifications.dailySummaryReports;
                if (!hasActiveOption) {
                    updatedNotifications.harmfulContentAlerts = true;
                    updatedNotifications.dailySummaryReports = true;
                }
            }

            showToast(`Notifications ${newState ? 'enabled' : 'disabled'}`);
            return { ...prev, notifications: updatedNotifications };
        });
    }, [showToast]);

    const handleToggleOption = useCallback((key) => {
        setProfile(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    }, []);

    // =============================================
    // DELETE ACCOUNT HANDLER
    // =============================================
    const handleDeleteAccount = useCallback((password) => {
        // Guard: must be authenticated
        if (!user) {
            setDeletePasswordError('You must be logged in to delete your account.');
            return;
        }

        setIsDeleting(true);
        setDeletePasswordError('');

        const result = deleteAccount(password);

        if (!result.success) {
            // Wrong password or other validation failure
            setIsDeleting(false);
            setDeletePasswordError(result.error || 'Failed to delete account. Please try again.');
            return;
        }

        // Success — context + localStorage have been cleared by deleteAccount()
        // Redirect to Sign Up page
        navigate('/signup', { replace: true });
    }, [user, deleteAccount, navigate]);

    const handleOpenDeleteModal = useCallback(() => {
        setDeletePasswordError('');
        setShowDeleteModal(true);
    }, []);

    const handleCloseDeleteModal = useCallback(() => {
        if (isDeleting) return; // prevent closing while deletion is in progress
        setDeletePasswordError('');
        setShowDeleteModal(false);
    }, [isDeleting]);

    return (
        <div className="parent-account-page">
            <PageHeader
                title="Parent Account"
                subtitle="Manage your profile and notification preferences"
            />

            <div className="account-content">
                <ProfileSection
                    profile={profile}
                    onUpdate={handleUpdateProfile}
                    onChangePassword={() => setShowPasswordModal(true)}
                />

                <NotificationPreferences
                    notifications={profile.notifications}
                    onToggleMaster={handleToggleNotifications}
                    onToggleOption={handleToggleOption}
                />

                <DangerZone
                    onDeleteAccount={handleOpenDeleteModal}
                />
            </div>

            <AnimatePresence mode="wait">
                {showPasswordModal && (
                    <PasswordModal
                        key="password-modal"
                        onClose={() => setShowPasswordModal(false)}
                        onSave={() => {
                            setShowPasswordModal(false);
                            showToast("Password changed successfully");
                        }}
                    />
                )}

                {showDeleteModal && (
                    <DeleteAccountModal
                        key="delete-modal"
                        onClose={handleCloseDeleteModal}
                        onConfirm={handleDeleteAccount}
                        passwordError={deletePasswordError}
                        isDeleting={isDeleting}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {toast && (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ParentAccount;