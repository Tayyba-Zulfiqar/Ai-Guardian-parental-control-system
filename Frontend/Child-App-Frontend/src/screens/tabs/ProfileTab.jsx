import { useState } from "react";
import {
    View, Text, ScrollView, TouchableOpacity,
    StatusBar, StyleSheet, Modal,
    Linking, TextInput, Dimensions, KeyboardAvoidingView, Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    LogOut, Fingerprint, ShieldCheck, HelpCircle,
    ChevronDown, ChevronUp, ExternalLink, AlertTriangle,
    CheckCircle, XCircle, Users, Trash2, Key,
} from "lucide-react-native";

import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import InfoCard from "../../components/UI/InfoCard";
import CustomSwitch from "../../components/UI/CustomSwitch";
import CustomAlert from "../../components/UI/CustomAlert";
// Fix: Ensure these imports exist or provide fallback data
import { profileSections } from "../../../constants/ProfileData";
import { permissions } from "../../../constants/Permissions";
import OTPInput from "../../components/UI/OTPInput";

const { width } = Dimensions.get("window");
const PARENT_PIN = "1234"; // TODO: fetch from backend/storage

// Fallback data if imports don't exist
const fallbackProfileSections = [
    {
        title: "Profile",
        data: [
            {
                id: "notifications",
                title: "Notifications",
                description: "Receive alerts and updates",
                type: "switch",
                icon: null,
                iconBgColor: Colors.purpleIconBg,
                iconColor: Colors.purpleIcon,
            }
        ]
    },
    {
        title: "SECURITY",
        data: [
            {
                id: "permissions",
                title: "Permissions",
                description: "Manage app permissions",
                type: "link",
                icon: ShieldCheck,
                iconBgColor: Colors.greenIconBg,
                iconColor: Colors.greenIcon,
            }
        ]
    }
];

const fallbackPermissions = [
    { title: "Accessibility Monitoring", icon: ShieldCheck },
    { title: "App Usage Access", icon: Key },
    { title: "Screen Monitoring", icon: Fingerprint },
    { title: "Notification Access", icon: HelpCircle },
];

// Use actual imports if they exist, otherwise use fallbacks
const actualProfileSections = profileSections || fallbackProfileSections;
const actualPermissions = permissions || fallbackPermissions;

// ─── Small reusable sub-components ─────────────────────────────────────────

const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{title}</Text>
    </View>
);

const Badge = ({ text, color = Colors.badgeGreenBg, textColor = Colors.badgeGreenText }) => (
    <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={[styles.badgeText, { color: textColor }]}>{text}</Text>
    </View>
);

const ModalHeader = ({ title, onClose }) => (
    <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{title}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <XCircle size={22} color={Colors.textGray} />
        </TouchableOpacity>
    </View>
);

// ─── Permissions Modal ───────────────────────────────────────────────────────

const PermissionsModal = ({ visible, onClose }) => {
    // Simulated permission states — in production, check actual system permissions
    const permissionStatus = {
        "Accessibility Monitoring": false,
        "App Usage Access": true,
        "Screen Monitoring": false,
        "Notification Access": true,
    };

    const whyNeeded = {
        "Accessibility Monitoring": "Detects harmful or unsafe on-screen content in real time.",
        "App Usage Access": "Monitors which apps are being used and for how long.",
        "Screen Monitoring": "Catches screenshots or recordings of inappropriate content.",
        "Notification Access": "Flags suspicious notifications from unknown sources.",
    };

    const anyMissing = Object.values(permissionStatus).some(v => !v);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <SafeAreaView style={styles.modalSafeArea} edges={['top', 'bottom']}>
                <ModalHeader title="Permissions" onClose={onClose} />
                <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
                    {anyMissing && (
                        <View style={styles.warningBanner}>
                            <AlertTriangle size={16} color="#B45309" />
                            <Text style={styles.warningText}>Some permissions are missing. Protection may be incomplete.</Text>
                        </View>
                    )}
                    {actualPermissions.map((perm) => {
                        const granted = permissionStatus[perm.title];
                        return (
                            <View key={perm.title} style={styles.permissionRow}>
                                <View style={styles.permRowTop}>
                                    <View style={[styles.permIconCircle, { backgroundColor: granted ? Colors.greenIconBg : Colors.pinkIconBg }]}>
                                        <perm.icon size={18} color={granted ? Colors.greenIcon : Colors.pinkIcon} />
                                    </View>
                                    <View style={styles.permText}>
                                        <Text style={styles.permTitle}>{perm.title}</Text>
                                        <Text style={styles.permReason}>{whyNeeded[perm.title]}</Text>
                                    </View>
                                    {granted
                                        ? <CheckCircle size={20} color={Colors.greenIcon} />
                                        : <XCircle size={20} color={Colors.pinkIcon} />}
                                </View>
                                {!granted && (
                                    <TouchableOpacity style={styles.openSettingsBtn} onPress={() => Linking.openSettings()}>
                                        <ExternalLink size={14} color={Colors.buttonDarkPurple} />
                                        <Text style={styles.openSettingsText}>Open Settings</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

// ─── Privacy Modal ───────────────────────────────────────────────────────────

const PrivacyModal = ({ visible, onClose }) => (
    <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
        statusBarTranslucent={true}
    >
        <SafeAreaView style={styles.modalSafeArea} edges={['top', 'bottom']}>
            <ModalHeader title="Privacy & Data" onClose={onClose} />
            <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
                {[
                    { heading: "What We Collect", body: "App usage statistics, screen activity flags, notification metadata, and device identifiers. No personal messages or media files are stored." },
                    { heading: "Why We Collect It", body: "To protect your child from harmful content and report activity summaries to the linked parent account." },
                    { heading: "Who Sees It", body: "Only the linked parent account. Data is never sold to third parties." },
                    { heading: "How It's Stored", body: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256) on our secure servers." },
                    { heading: "Your Rights", body: "You may request account deletion at any time. Upon deletion, all associated data is permanently removed within 30 days." },
                ].map(({ heading, body }) => (
                    <View key={heading} style={styles.privacySection}>
                        <Text style={styles.privacyHeading}>{heading}</Text>
                        <Text style={styles.privacyBody}>{body}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    </Modal>
);

// ─── FAQ Modal ───────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
    { q: "Why does AI Guardian need these permissions?", a: "Each permission serves a specific safety purpose — accessibility monitoring detects unsafe content, usage access shows app activity, screen monitoring flags screenshots of harmful content, and notification access catches suspicious alerts." },
    { q: "Is my data safe?", a: "Yes. All data is encrypted in transit and at rest. It is only shared with your linked parent account and never sold." },
    { q: "How do I disable monitoring temporarily?", a: "Contact your parent to temporarily pause monitoring from the Parent App. The child app does not allow self-disabling of protections." },
    { q: "What happens if I revoke permissions?", a: "Protection coverage becomes partial. Your parent will be notified, and the app will prompt you to re-enable the missing permissions." },
    { q: "How to contact support?", a: "Email us at support@aiguardian.app or use the 'Send Logs' button below to attach diagnostic information to your request." },
];

const FAQModal = ({ visible, onClose }) => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <SafeAreaView style={styles.modalSafeArea} edges={['top', 'bottom']}>
                <ModalHeader title="Help & FAQ" onClose={onClose} />
                <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
                    {FAQ_ITEMS.map((item, idx) => {
                        const open = openIndex === idx;
                        return (
                            <TouchableOpacity
                                key={idx}
                                style={styles.faqItem}
                                onPress={() => setOpenIndex(open ? null : idx)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.faqRow}>
                                    <Text style={styles.faqQuestion}>{item.q}</Text>
                                    {open
                                        ? <ChevronUp size={18} color={Colors.buttonDarkPurple} />
                                        : <ChevronDown size={18} color={Colors.textGray} />}
                                </View>
                                {open && <Text style={styles.faqAnswer}>{item.a}</Text>}
                            </TouchableOpacity>
                        );
                    })}

                    <TouchableOpacity
                        style={styles.sendLogsBtn}
                        onPress={() => console.log("Send logs pressed")}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.sendLogsText}>Send Logs to Support</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

// ─── Delete Account PIN Modal ────────────────────────────────────────────────

const DeleteAccountModal = ({ visible, onClose }) => {
    const [pin, setPin] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [successAlert, setSuccessAlert] = useState(false);
    const [failAlert, setFailAlert] = useState(false);

    const handleConfirm = () => {
        const pinString = pin.join("");
        if (pinString === PARENT_PIN) {
            setError("");
            setPin(["", "", "", ""]);
            setSuccessAlert(true);
        } else {
            setPin(["", "", "", ""]);
            setFailAlert(true);
        }
    };

    const handleClose = () => {
        setPin(["", "", "", ""]);
        setError("");
        onClose();
    };

    return (
        <>
            <Modal
                visible={visible}
                animationType="fade"
                transparent={true}
                statusBarTranslucent={true}
                onRequestClose={handleClose}
            >
                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.keyboardView}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
                    >
                        <View style={styles.deleteModalCard}>
                            <View style={styles.deleteCardIconCircle}>
                                <Trash2 size={28} color={Colors.logoutText} />
                            </View>

                            <Text style={styles.deleteTitle}>Security Verification</Text>
                            <Text style={styles.deleteSubtitle}>
                                Please enter your parent's 4-digit security PIN to confirm account deletion.
                            </Text>

                            <View style={styles.otpWrapper}>
                                <OTPInput
                                    code={pin}
                                    setCode={(newCode) => { setPin(newCode); setError(""); }}
                                    length={4}
                                />
                            </View>

                            {error ? <Text style={styles.pinError}>{error}</Text> : null}

                            <View style={styles.deleteButtonRow}>
                                <TouchableOpacity style={styles.deleteCancelBtn} onPress={handleClose}>
                                    <Text style={styles.deleteCancelText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.deleteConfirmBtn} onPress={handleConfirm} activeOpacity={0.8}>
                                    <Text style={styles.deleteConfirmText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>

            {/* Success */}
            <CustomAlert
                visible={successAlert}
                title="Request Sent"
                message="Your deletion request has been sent to your parent for approval. The account will be deleted once they confirm."
                confirmText="OK"
                cancelText={null}
                onConfirm={() => { setSuccessAlert(false); handleClose(); }}
                onCancel={() => { setSuccessAlert(false); handleClose(); }}
            />
            {/* Fail */}
            <CustomAlert
                visible={failAlert}
                title="Incorrect PIN"
                message="The PIN you entered is incorrect. Account deletion has been cancelled. Please ask your parent for the correct PIN."
                confirmText="OK"
                cancelText={null}
                onConfirm={() => setFailAlert(false)}
                onCancel={() => setFailAlert(false)}
            />
        </>
    );
};

// ─── Main ProfileTab ─────────────────────────────────────────────────────────

const ProfileTab = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // Modal visibility
    const [permissionsModal, setPermissionsModal] = useState(false);
    const [privacyModal, setPrivacyModal] = useState(false);
    const [faqModal, setFaqModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [logoutAlert, setLogoutAlert] = useState(false);
    const [requestSentAlert, setRequestSentAlert] = useState(false);

    const modalMap = {
        permissions: () => setPermissionsModal(true),
        privacy: () => setPrivacyModal(true),
        help: () => setFaqModal(true),
    };

    const renderRightElement = (item) => {
        if (item.type === "switch") {
            return (
                <CustomSwitch
                    active={notificationsEnabled}
                    onToggle={() => setNotificationsEnabled(prev => !prev)}
                    activeColor={Colors.switchGreen}
                />
            );
        }
        if (item.badge) return <Badge text={item.badge} />;
        return null;
    };

    const handleCardPress = (item) => {
        if (item.type === "link" && modalMap[item.id]) {
            modalMap[item.id]();
        }
    };

    // Safety check for profileSections
    const sections = actualProfileSections || [];

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.headerTitle}>Profile</Text>

                {/* ── Dynamic sections from ProfileData ── */}
                {sections.map((section, index) => (
                    <View key={index}>
                        {section.title !== "Profile" && <SectionHeader title={section.title} />}
                        <View style={styles.cardGroup}>
                            {section.data && section.data.map((item) => (
                                <InfoCard
                                    key={item.id}
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                    iconBgColor={item.iconBgColor}
                                    iconColor={item.iconColor}
                                    rightElement={renderRightElement(item)}
                                    showChevron={item.type === "link"}
                                    onPress={item.type === "link" ? () => handleCardPress(item) : undefined}
                                />
                            ))}
                        </View>
                    </View>
                ))}

                {/* ── Parental Controls Section ── */}
                <SectionHeader title="PARENTAL CONTROLS" />
                <View style={styles.cardGroup}>
                    {/* Request permission from parent */}
                    <InfoCard
                        icon={Users}
                        title="Request Permission"
                        description="Ask your parent to approve an action"
                        iconBgColor={Colors.purpleIconBg}
                        iconColor={Colors.purpleIcon}
                        showChevron={true}
                        onPress={() => setRequestSentAlert(true)}
                    />
                    {/* Delete Account */}
                    <InfoCard
                        icon={Trash2}
                        title="Delete Account"
                        description="Requires parent PIN approval"
                        iconBgColor={Colors.logoutBg}
                        iconColor={Colors.logoutText}
                        showChevron={true}
                        onPress={() => setDeleteModal(true)}
                    />
                </View>

                {/* ── Logout ── */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutAlert(true)}>
                    <LogOut size={20} color={Colors.BackgroundColor} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* ── Modals ── */}
            <PermissionsModal visible={permissionsModal} onClose={() => setPermissionsModal(false)} />
            <PrivacyModal visible={privacyModal} onClose={() => setPrivacyModal(false)} />
            <FAQModal visible={faqModal} onClose={() => setFaqModal(false)} />
            <DeleteAccountModal visible={deleteModal} onClose={() => setDeleteModal(false)} />

            {/* Logout Confirm */}
            <CustomAlert
                visible={logoutAlert}
                title="Log Out"
                message="Are you sure you want to log out? Your parent will need to reconnect the device."
                confirmText="Log Out"
                cancelText="Cancel"
                onConfirm={() => { setLogoutAlert(false); console.log("Logout"); }}
                onCancel={() => setLogoutAlert(false)}
            />

            {/* Request Sent */}
            <CustomAlert
                visible={requestSentAlert}
                title="Request Sent"
                message="Your request has been sent to your parent for approval."
                confirmText="OK"
                cancelText={null}
                onConfirm={() => setRequestSentAlert(false)}
                onCancel={() => setRequestSentAlert(false)}
            />
        </SafeAreaView>
    );
};

export default ProfileTab;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.backgroundLight },
    scrollContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
    headerTitle: { fontSize: 26, fontFamily: Fonts.bold, color: Colors.textMain, marginTop: 15, marginBottom: 18 },
    cardGroup: { gap: 12 },
    sectionHeaderContainer: { marginTop: 18, marginBottom: 12, marginLeft: 4 },
    sectionHeader: { fontSize: 14, fontFamily: Fonts.bold, color: Colors.textGray, letterSpacing: 1 },
    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, backgroundColor: Colors.badgeGreenBg },
    badgeText: { fontSize: 12, fontFamily: Fonts.bold, color: Colors.badgeGreenText },
    logoutButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.buttonLightPurple, borderRadius: 24, paddingVertical: 16, marginTop: 24, gap: 8 },
    logoutText: { fontSize: 16, fontFamily: Fonts.bold, color: Colors.BackgroundColor },
    keyboardView: { width: '100%', alignItems: 'center' },

    // ── Modal shared ──
    modalSafeArea: { flex: 1, backgroundColor: Colors.BackgroundColor },
    modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#F0F0F5" },
    modalTitle: { fontSize: 18, fontFamily: Fonts.bold, color: Colors.Titles },
    closeBtn: { padding: 4 },
    modalScroll: { padding: 20, paddingBottom: 40 },

    // ── Permissions Modal ──
    warningBanner: { flexDirection: "row", alignItems: "center", backgroundColor: "#FEF3C7", borderRadius: 12, padding: 12, marginBottom: 16, gap: 8 },
    warningText: { flex: 1, fontSize: 13, fontFamily: Fonts.regular, color: "#92400E", lineHeight: 18 },
    permissionRow: { backgroundColor: Colors.BackgroundColor, borderRadius: 16, padding: 14, marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
    permRowTop: { flexDirection: "row", alignItems: "center", gap: 12 },
    permIconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
    permText: { flex: 1 },
    permTitle: { fontSize: 14, fontFamily: Fonts.bold, color: Colors.Titles, marginBottom: 2 },
    permReason: { fontSize: 12, fontFamily: Fonts.regular, color: Colors.Subtitles, lineHeight: 16 },
    openSettingsBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10, alignSelf: "flex-end", backgroundColor: Colors.purpleIconBg, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    openSettingsText: { fontSize: 13, fontFamily: Fonts.bold, color: Colors.buttonDarkPurple },

    // ── Privacy Modal ──
    privacySection: { marginBottom: 20 },
    privacyHeading: { fontSize: 15, fontFamily: Fonts.bold, color: Colors.Titles, marginBottom: 6 },
    privacyBody: { fontSize: 13, fontFamily: Fonts.regular, color: Colors.Subtitles, lineHeight: 20 },

    // ── FAQ Modal ──
    faqItem: { backgroundColor: Colors.BackgroundColor, borderRadius: 14, padding: 16, marginBottom: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
    faqRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    faqQuestion: { flex: 1, fontSize: 14, fontFamily: Fonts.bold, color: Colors.Titles, marginRight: 8 },
    faqAnswer: { marginTop: 10, fontSize: 13, fontFamily: Fonts.regular, color: Colors.Subtitles, lineHeight: 20 },
    sendLogsBtn: { marginTop: 10, borderWidth: 1.5, borderColor: Colors.buttonDarkPurple, borderRadius: 14, paddingVertical: 14, alignItems: "center" },
    sendLogsText: { fontSize: 14, fontFamily: Fonts.bold, color: Colors.buttonDarkPurple },

    // ── Delete Modal ──
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.65)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    deleteModalCard: {
        width: width * 0.88,
        maxWidth: 400,
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 28,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    deleteCardIconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.logoutBg,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    deleteTitle: { fontSize: 20, fontFamily: Fonts.bold, color: Colors.Titles, textAlign: "center", marginBottom: 8 },
    deleteSubtitle: { fontSize: 13, fontFamily: Fonts.regular, color: Colors.Subtitles, textAlign: "center", lineHeight: 18, marginBottom: 20 },
    otpWrapper: { width: '100%', marginBottom: 12, alignItems: 'center' },
    pinError: { fontSize: 12, fontFamily: Fonts.regular, color: Colors.pinkIcon, marginBottom: 8, textAlign: "center" },
    deleteButtonRow: { flexDirection: 'row', width: '100%', gap: 12, marginTop: 12 },
    deleteConfirmBtn: { flex: 1, backgroundColor: Colors.logoutText, borderRadius: 16, paddingVertical: 14, alignItems: "center" },
    deleteConfirmText: { fontSize: 15, fontFamily: Fonts.bold, color: Colors.BackgroundColor },
    deleteCancelBtn: { flex: 1, paddingVertical: 14, alignItems: "center", borderRadius: 16, backgroundColor: '#F3F4F6' },
    deleteCancelText: { fontSize: 15, fontFamily: Fonts.bold, color: Colors.textGray },
});