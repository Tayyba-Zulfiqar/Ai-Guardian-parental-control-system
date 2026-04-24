import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../../../../constants/Fonts";
import { Colors } from "../../../../constants/Colors";

const ProtectionStats = ({ avg, peak }) => {
    return (
        <View style={styles.historyCard}>
            <View style={styles.bubblesRow}>
                <View style={[styles.statBubble, { backgroundColor: Colors.cardBluePastel }]}>
                    <Text style={styles.bubbleLabel}>DAILY AVG</Text>
                    <Text style={[styles.bubbleValue, { color: Colors.cardBlueIcon }]}>
                        {avg}
                    </Text>
                </View>

                <View style={[styles.statBubble, { backgroundColor: Colors.purpleIconBg }]}>
                    <Text style={styles.bubbleLabel}>PEAK DAY</Text>
                    <Text style={[styles.bubbleValue, { color: Colors.purpleIcon }]}>
                        {peak}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ProtectionStats;

const styles = StyleSheet.create({
    historyCard: {
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 30,
        padding: 20,
        marginBottom: 20,
    },
    bubblesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    statBubble: {
        flex: 1,
        borderRadius: 100,
        paddingVertical: 14,
        alignItems: "center",
    },
    bubbleLabel: {
        fontSize: 10,
        fontFamily: Fonts.bold,
        color: Colors.textSecondary,
    },
    bubbleValue: {
        fontSize: 17,
        fontFamily: Fonts.bold,
    },
});
