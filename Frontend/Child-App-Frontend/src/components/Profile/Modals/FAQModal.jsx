import React, { useState, useCallback } from "react";
import {
    Modal,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { ModalHeader } from "../ProfileComponents";
import { FAQ_ITEMS } from "../../../../constants/faqData";
import { Colors } from "../../../../constants/Colors";
import { Fonts } from "../../../../constants/Fonts";

/**
 * FAQModal
 *
 * An expandable accordion-style FAQ sheet. Each question can be tapped
 * to reveal or hide its answer. Includes a "Send Logs" button at the bottom.
 *
 * @param {boolean} visible - Whether the modal is shown
 * @param {function} onClose - Callback to dismiss the modal
 */
const FAQModal = ({ visible, onClose }) => {
    const [openIndex, setOpenIndex] = useState(null);

    // Stable toggle handler — avoids recreation on every render
    const handleToggle = useCallback((idx) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    }, []);

    const handleSendLogs = useCallback(() => {
        // TODO: integrate with backend logging service
        console.log("Send logs pressed");
    }, []);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <SafeAreaView style={styles.modalSafeArea} edges={["top", "bottom"]}>
                <ModalHeader title="Help & FAQ" onClose={onClose} />

                <ScrollView
                    contentContainerStyle={styles.modalScroll}
                    showsVerticalScrollIndicator={false}
                >
                    {FAQ_ITEMS.map((item, idx) => {
                        const open = openIndex === idx;
                        return (
                            <TouchableOpacity
                                key={idx}
                                style={styles.faqItem}
                                onPress={() => handleToggle(idx)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.faqRow}>
                                    <Text style={styles.faqQuestion}>{item.q}</Text>
                                    {open ? (
                                        <ChevronUp size={18} color={Colors.buttonDarkPurple} />
                                    ) : (
                                        <ChevronDown size={18} color={Colors.textGray} />
                                    )}
                                </View>
                                {open && <Text style={styles.faqAnswer}>{item.a}</Text>}
                            </TouchableOpacity>
                        );
                    })}

                    <TouchableOpacity
                        style={styles.sendLogsBtn}
                        onPress={handleSendLogs}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.sendLogsText}>Send Logs to Support</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

export default FAQModal;

const styles = StyleSheet.create({
    modalSafeArea: { flex: 1, backgroundColor: Colors.BackgroundColor },
    modalScroll: { padding: 20, paddingBottom: 40 },

    faqItem: {
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 14,
        padding: 16,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    faqRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    faqQuestion: {
        flex: 1,
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.Titles,
        marginRight: 8,
    },
    faqAnswer: {
        marginTop: 10,
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: Colors.Subtitles,
        lineHeight: 20,
    },
    sendLogsBtn: {
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: Colors.buttonDarkPurple,
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: "center",
    },
    sendLogsText: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.buttonDarkPurple,
    },
});
