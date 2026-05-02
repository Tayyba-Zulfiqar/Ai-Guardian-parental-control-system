import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ShieldCheck } from "lucide-react-native";
import { Fonts } from "../../../../constants/Fonts";
import { Colors } from "../../../../constants/Colors";

const ScanHistoryCard = ({ lastScan }) => {
    return (
        <View style={styles.protectionCard}>
            <View style={styles.iconCircle}>
                <ShieldCheck color={Colors.badgeGreenText} size={26} strokeWidth={2.2} />
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Scan History</Text>
                <Text style={styles.scanText}>Last scan: {lastScan}</Text>
            </View>
        </View>
    );
};

export default ScanHistoryCard;

const styles = StyleSheet.create({
    protectionCard: {
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 24,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
        gap: 16,
    },
    iconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: Colors.badgeGreenBg,
        justifyContent: "center",
        alignItems: "center",
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
    },
    scanText: {
        fontSize: 14.5,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },
});
