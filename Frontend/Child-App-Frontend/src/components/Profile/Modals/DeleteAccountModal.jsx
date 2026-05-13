import React, { useState, useCallback } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    StyleSheet,
} from "react-native";
import OTPInput from "../../UI/OTPInput";
import CustomAlert from "../../UI/CustomAlert";
import { Trash2 } from "lucide-react-native";
import { Colors } from "../../../../constants/Colors";
import { Fonts } from "../../../../constants/Fonts";

const { width } = Dimensions.get("window");

// TODO: Fetch from secure backend/storage instead of hardcoding
const PARENT_PIN = "1234";
const EMPTY_PIN = ["", "", "", ""];

/**
 * DeleteAccountModal
 *
 * A centered card modal that prompts the user to enter the parent's
 * 4-digit security PIN before sending an account deletion request.
 * Uses the shared OTPInput component for a consistent segmented input UX.
 *
 * @param {boolean} visible - Whether the modal is shown
 * @param {function} onClose - Callback to dismiss the modal
 */
const DeleteAccountModal = ({ visible, onClose }) => {
    const [pin, setPin] = useState(EMPTY_PIN);
    const [error, setError] = useState("");
    const [successAlert, setSuccessAlert] = useState(false);
    const [failAlert, setFailAlert] = useState(false);

    const handlePinChange = useCallback((newCode) => {
        setPin(newCode);
        setError("");
    }, []);

    const handleConfirm = useCallback(() => {
        const pinString = pin.join("");
        if (pinString === PARENT_PIN) {
            setError("");
            setPin(EMPTY_PIN);
            setSuccessAlert(true);
        } else {
            setPin(EMPTY_PIN);
            setFailAlert(true);
        }
    }, [pin]);

    const handleClose = useCallback(() => {
        setPin(EMPTY_PIN);
        setError("");
        onClose();
    }, [onClose]);

    const handleSuccessConfirm = useCallback(() => {
        setSuccessAlert(false);
        handleClose();
    }, [handleClose]);

    const handleFailConfirm = useCallback(() => {
        setFailAlert(false);
    }, []);

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
                            {/* Icon */}
                            <View style={styles.deleteCardIconCircle}>
                                <Trash2 size={28} color={Colors.logoutText} />
                            </View>

                            {/* Title & subtitle */}
                            <Text style={styles.deleteTitle}>Security Verification</Text>
                            <Text style={styles.deleteSubtitle}>
                                Please enter your parent's 4-digit security PIN to confirm account deletion.
                            </Text>

                            {/* 4-digit OTP input */}
                            <View style={styles.otpWrapper}>
                                <OTPInput
                                    code={pin}
                                    setCode={handlePinChange}
                                    length={4}
                                />
                            </View>

                            {/* Inline error */}
                            {error ? <Text style={styles.pinError}>{error}</Text> : null}

                            {/* Action buttons */}
                            <View style={styles.deleteButtonRow}>
                                <TouchableOpacity style={styles.deleteCancelBtn} onPress={handleClose}>
                                    <Text style={styles.deleteCancelText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.deleteConfirmBtn}
                                    onPress={handleConfirm}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.deleteConfirmText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>

            {/* Success confirmation alert */}
            <CustomAlert
                visible={successAlert}
                title="Request Sent"
                message="Your deletion request has been sent to your parent for approval. The account will be deleted once they confirm."
                confirmText="OK"
                cancelText={null}
                onConfirm={handleSuccessConfirm}
                onCancel={handleSuccessConfirm}
            />

            {/* Failure alert */}
            <CustomAlert
                visible={failAlert}
                title="Incorrect PIN"
                message="The PIN you entered is incorrect. Account deletion has been cancelled. Please ask your parent for the correct PIN."
                confirmText="OK"
                cancelText={null}
                onConfirm={handleFailConfirm}
                onCancel={handleFailConfirm}
            />
        </>
    );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.65)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    keyboardView: {
        width: "100%",
        alignItems: "center",
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
    deleteTitle: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: Colors.Titles,
        textAlign: "center",
        marginBottom: 8,
    },
    deleteSubtitle: {
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: Colors.Subtitles,
        textAlign: "center",
        lineHeight: 18,
        marginBottom: 20,
    },
    otpWrapper: {
        width: "100%",
        marginBottom: 12,
        alignItems: "center",
    },
    pinError: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.pinkIcon,
        marginBottom: 8,
        textAlign: "center",
    },
    deleteButtonRow: {
        flexDirection: "row",
        width: "100%",
        gap: 12,
        marginTop: 12,
    },
    deleteConfirmBtn: {
        flex: 1,
        backgroundColor: Colors.logoutText,
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: "center",
    },
    deleteConfirmText: {
        fontSize: 15,
        fontFamily: Fonts.bold,
        color: Colors.BackgroundColor,
    },
    deleteCancelBtn: {
        flex: 1,
        paddingVertical: 14,
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: "#F3F4F6",
    },
    deleteCancelText: {
        fontSize: 15,
        fontFamily: Fonts.bold,
        color: Colors.textGray,
    },
});
