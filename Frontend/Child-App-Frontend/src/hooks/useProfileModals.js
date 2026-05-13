import { useState, useCallback } from "react";

/**
 * useProfileModals
 *
 * Centralizes all modal/alert visibility state for the ProfileTab screen.
 * Returns boolean state values and stable open/close callbacks (useCallback)
 * to prevent unnecessary re-renders in child components.
 */
export const useProfileModals = () => {
    const [permissionsModal, setPermissionsModal] = useState(false);
    const [privacyModal, setPrivacyModal] = useState(false);
    const [faqModal, setFaqModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [logoutAlert, setLogoutAlert] = useState(false);
    const [requestSentAlert, setRequestSentAlert] = useState(false);

    const openPermissions = useCallback(() => setPermissionsModal(true), []);
    const closePermissions = useCallback(() => setPermissionsModal(false), []);

    const openPrivacy = useCallback(() => setPrivacyModal(true), []);
    const closePrivacy = useCallback(() => setPrivacyModal(false), []);

    const openFaq = useCallback(() => setFaqModal(true), []);
    const closeFaq = useCallback(() => setFaqModal(false), []);

    const openDelete = useCallback(() => setDeleteModal(true), []);
    const closeDelete = useCallback(() => setDeleteModal(false), []);

    const openLogout = useCallback(() => setLogoutAlert(true), []);
    const closeLogout = useCallback(() => setLogoutAlert(false), []);

    const openRequestSent = useCallback(() => setRequestSentAlert(true), []);
    const closeRequestSent = useCallback(() => setRequestSentAlert(false), []);

    return {
        // State
        permissionsModal,
        privacyModal,
        faqModal,
        deleteModal,
        logoutAlert,
        requestSentAlert,

        // Openers
        openPermissions,
        openPrivacy,
        openFaq,
        openDelete,
        openLogout,
        openRequestSent,

        // Closers
        closePermissions,
        closePrivacy,
        closeFaq,
        closeDelete,
        closeLogout,
        closeRequestSent,
    };
};
