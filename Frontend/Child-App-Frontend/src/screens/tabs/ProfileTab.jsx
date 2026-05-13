import React, { useState, useCallback, useMemo } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogOut, Users, Trash2, CheckCircle } from "lucide-react-native";

// Constants
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import { profileSections } from "../../../constants/ProfileData";

// UI components
import InfoCard from "../../components/UI/InfoCard";
import CustomSwitch from "../../components/UI/CustomSwitch";
import CustomAlert from "../../components/UI/CustomAlert";

// Profile shared components
import { SectionHeader, Badge } from "../../components/Profile/ProfileComponents";

// Profile modals
import PermissionsModal from "../../components/Profile/Modals/PermissionsModal";
import PrivacyModal from "../../components/Profile/Modals/PrivacyModal";
import FAQModal from "../../components/Profile/Modals/FAQModal";
import DeleteAccountModal from "../../components/Profile/Modals/DeleteAccountModal";

// Custom hooks
import { useProfileModals } from "../../hooks/useProfileModals";

/**
 * ProfileTab
 *
 * Main orchestration component for the profile screen.
 * Delegates all modal logic to useProfileModals, all permission
 * logic to the individual modal components, and keeps this file
 * as a pure layout/coordination layer.
 */
const ProfileTab = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // All modal/alert state managed by the custom hook
    const {
        permissionsModal, openPermissions, closePermissions,
        privacyModal, openPrivacy, closePrivacy,
        faqModal, openFaq, closeFaq,
        deleteModal, openDelete, closeDelete,
        logoutAlert, openLogout, closeLogout,
        requestConfirmAlert, openRequestConfirm, closeRequestConfirm,
        requestSentAlert, openRequestSent, closeRequestSent,
    } = useProfileModals();

    // Map card IDs → modal openers (memoized to avoid recreation)
    const modalMap = useMemo(() => ({
        permissions: openPermissions,
        privacy: openPrivacy,
        help: openFaq,
    }), [openPermissions, openPrivacy, openFaq]);

    // Notification toggle (stable callback)
    const toggleNotifications = useCallback(() => {
        setNotificationsEnabled((prev) => !prev);
    }, []);

    // Render right-side element per card type
    const renderRightElement = useCallback((item) => {
        if (item.type === "switch") {
            return (
                <CustomSwitch
                    active={notificationsEnabled}
                    onToggle={toggleNotifications}
                    activeColor={Colors.switchGreen}
                />
            );
        }
        if (item.badge) return <Badge text={item.badge} />;
        return null;
    }, [notificationsEnabled, toggleNotifications]);

    // Handle card press for link-type cards
    const handleCardPress = useCallback((item) => {
        if (item.type === "link" && modalMap[item.id]) {
            modalMap[item.id]();
        }
    }, [modalMap]);

    // Memoized sections to guard against accidental undefined
    const sections = useMemo(() => profileSections || [], []);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.headerTitle}>Profile</Text>

                {/* ── Dynamic sections from ProfileData ── */}
                {sections.map((section, index) => (
                    <View key={index}>
                        {section.title !== "Profile" && (
                            <SectionHeader title={section.title} />
                        )}
                        <View style={styles.cardGroup}>
                            {section.data?.map((item) => (
                                <InfoCard
                                    key={item.id}
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                    iconBgColor={item.iconBgColor}
                                    iconColor={item.iconColor}
                                    rightElement={renderRightElement(item)}
                                    showChevron={item.type === "link"}
                                    onPress={
                                        item.type === "link"
                                            ? () => handleCardPress(item)
                                            : undefined
                                    }
                                />
                            ))}
                        </View>
                    </View>
                ))}

                {/* ── Parental Controls Section ── */}
                <SectionHeader title="PARENTAL CONTROLS" />
                <View style={styles.cardGroup}>
                    <InfoCard
                        icon={Users}
                        title="Request Permission"
                        description="Ask your parent to approve an action"
                        iconBgColor={Colors.purpleIconBg}
                        iconColor={Colors.purpleIcon}
                        showChevron={true}
                        onPress={openRequestConfirm}
                    />
                    <InfoCard
                        icon={Trash2}
                        title="Delete Account"
                        description="Requires parent PIN approval"
                        iconBgColor={Colors.logoutBg}
                        iconColor={Colors.logoutText}
                        showChevron={true}
                        onPress={openDelete}
                    />
                </View>

                {/* ── Logout Button ── */}
                <TouchableOpacity style={styles.logoutButton} onPress={openLogout}>
                    <LogOut size={20} color={Colors.BackgroundColor} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* ── Modals ── */}
            <PermissionsModal visible={permissionsModal} onClose={closePermissions} />
            <PrivacyModal visible={privacyModal} onClose={closePrivacy} />
            <FAQModal visible={faqModal} onClose={closeFaq} />
            <DeleteAccountModal visible={deleteModal} onClose={closeDelete} />

            {/* ── Logout confirmation alert ── */}
            <CustomAlert
                visible={logoutAlert}
                title="Log Out"
                message="Are you sure you want to log out? Your parent will need to reconnect the device."
                confirmText="Log Out"
                cancelText="Cancel"
                Icon={LogOut}
                iconColor={Colors.logoutText}
                iconBgColor={Colors.logoutBg}
                onConfirm={() => { closeLogout(); console.log("Logout"); }}
                onCancel={closeLogout}
            />

            {/* ── Request confirmation alert ── */}
            <CustomAlert
                visible={requestConfirmAlert}
                title="Send Request?"
                message="This will notify your parent that you are requesting a permission update. Continue?"
                confirmText="Yes, Send"
                cancelText="Cancel"
                Icon={Users}
                iconColor={Colors.buttonDarkPurple}
                iconBgColor={Colors.purpleIconBg}
                onConfirm={() => { closeRequestConfirm(); openRequestSent(); }}
                onCancel={closeRequestConfirm}
            />

            {/* ── Request sent confirmation alert ── */}
            <CustomAlert
                visible={requestSentAlert}
                title="Request Sent"
                message="Your request has been sent to your parent for approval."
                confirmText="OK"
                cancelText={null}
                Icon={CheckCircle}
                iconColor={Colors.greenIcon}
                iconBgColor={Colors.greenIconBg}
                onConfirm={closeRequestSent}
                onCancel={closeRequestSent}
            />
        </SafeAreaView>
    );
};

export default ProfileTab;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    headerTitle: {
        fontSize: 26,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
        marginTop: 15,
        marginBottom: 18,
    },
    cardGroup: {
        gap: 12,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.buttonLightPurple,
        borderRadius: 24,
        paddingVertical: 16,
        marginTop: 24,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: Colors.BackgroundColor,
    },
});