import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Fonts } from "../../../../constants/Fonts";
import { Colors } from "../../../../constants/Colors";

const PeriodSelector = ({ period, onSelect }) => {
    return (
        <View style={styles.selectorContainer}>
            <TouchableOpacity
                onPress={() => onSelect('Week')}
                style={[styles.selectorBtn, period === 'Week' && styles.selectorBtnActive]}
            >
                <Text style={[styles.selectorText, period === 'Week' && styles.selectorTextActive]}>
                    Last Week
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => onSelect('Month')}
                style={[styles.selectorBtn, period === 'Month' && styles.selectorBtnActive]}
            >
                <Text style={[styles.selectorText, period === 'Month' && styles.selectorTextActive]}>
                    Last Month
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PeriodSelector;

const styles = StyleSheet.create({
    selectorContainer: {
        flexDirection: "row",
        backgroundColor: "#F1F5F9",
        borderRadius: 100,
        padding: 4,
        marginBottom: 20,
    },
    selectorBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 100,
    },
    selectorBtnActive: {
        backgroundColor: Colors.secondaryPurple,
    },
    selectorText: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.textSecondary,
    },
    selectorTextActive: {
        color: Colors.textMain,
    },
});
