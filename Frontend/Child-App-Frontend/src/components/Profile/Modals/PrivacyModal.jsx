import React from "react";
import { Modal, View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModalHeader } from "../ProfileComponents";
import { PRIVACY_SECTIONS } from "../../../../constants/faqData";
import { Colors } from "../../../../constants/Colors";
import { Fonts } from "../../../../constants/Fonts";

/**
 * PrivacyModal
 *
 * Displays the app's data collection and privacy policy in a structured
 * page-sheet modal with categorized sections.
 *
 * @param {boolean} visible - Whether the modal is shown
 * @param {function} onClose - Callback to dismiss the modal
 */
const PrivacyModal = ({ visible, onClose }) => (
    <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
        statusBarTranslucent={true}
    >
        <SafeAreaView style={styles.modalSafeArea} edges={["top", "bottom"]}>
            <ModalHeader title="Privacy & Data" onClose={onClose} />

            <ScrollView
                contentContainerStyle={styles.modalScroll}
                showsVerticalScrollIndicator={false}
            >
                {PRIVACY_SECTIONS.map(({ heading, body }) => (
                    <View key={heading} style={styles.privacySection}>
                        <Text style={styles.privacyHeading}>{heading}</Text>
                        <Text style={styles.privacyBody}>{body}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    </Modal>
);

export default PrivacyModal;

const styles = StyleSheet.create({
    modalSafeArea: { flex: 1, backgroundColor: Colors.BackgroundColor },
    modalScroll: { padding: 20, paddingBottom: 40 },
    privacySection: { marginBottom: 20 },
    privacyHeading: {
        fontSize: 15,
        fontFamily: Fonts.bold,
        color: Colors.Titles,
        marginBottom: 6,
    },
    privacyBody: {
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: Colors.Subtitles,
        lineHeight: 20,
    },
});
