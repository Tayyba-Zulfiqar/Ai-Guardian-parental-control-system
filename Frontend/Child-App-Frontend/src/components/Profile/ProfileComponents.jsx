import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { XCircle } from "lucide-react-native";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";

/**
 * SectionHeader
 * Renders an uppercase section label between card groups.
 */
export const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{title}</Text>
    </View>
);

/**
 * Badge
 * A small colored pill label for status indicators (e.g., "Connected").
 */
export const Badge = ({
    text,
    color = Colors.badgeGreenBg,
    textColor = Colors.badgeGreenText,
}) => (
    <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={[styles.badgeText, { color: textColor }]}>{text}</Text>
    </View>
);

/**
 * ModalHeader
 * Consistent header bar used at the top of all page-sheet modals.
 * Includes a title and a close (X) button.
 */
export const ModalHeader = ({ title, onClose }) => (
    <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{title}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <XCircle size={22} color={Colors.textGray} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    // ── SectionHeader ──
    sectionHeaderContainer: {
        marginTop: 18,
        marginBottom: 12,
        marginLeft: 4,
    },
    sectionHeader: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.textGray,
        letterSpacing: 1,
    },

    // ── Badge ──
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor: Colors.badgeGreenBg,
    },
    badgeText: {
        fontSize: 12,
        fontFamily: Fonts.bold,
        color: Colors.badgeGreenText,
    },

    // ── ModalHeader ──
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F5",
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: Colors.Titles,
    },
    closeBtn: {
        padding: 4,
    },
});
