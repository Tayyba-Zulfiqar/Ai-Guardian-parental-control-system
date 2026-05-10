import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
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
    const [profile, setProfile] = useState(parentProfileData);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type, id: Date.now() });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const handleUpdateProfile = useCallback((newData) => {
        setProfile(prev => ({ ...prev, ...newData }));
        const field = Object.keys(newData)[0];
        showToast(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`);
    }, [showToast]);

    const handleToggleNotifications = useCallback(() => {
        setProfile(prev => {
            const newState = !prev.notifications.enabled;
            showToast(`Notifications ${newState ? 'enabled' : 'disabled'}`);
            return {
                ...prev,
                notifications: {
                    ...prev.notifications,
                    enabled: newState
                }
            };
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
                    onDeleteAccount={() => setShowDeleteModal(true)}
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
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={() => {
                            setShowDeleteModal(false);
                            showToast("Account deletion request submitted", "error");
                        }}
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