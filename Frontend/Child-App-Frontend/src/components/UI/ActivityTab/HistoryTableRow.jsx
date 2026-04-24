import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../../../../constants/Fonts";
import { Colors } from "../../../../constants/Colors";

const HistoryTableRow = ({ day, date, hours, isLast }) => {
    return (
        <View
            style={[
                styles.tableRow,
                isLast && { borderBottomWidth: 0 }
            ]}
        >
            <Text style={[styles.cellDay, { flex: 1.2 }]}>{day}</Text>

            <Text style={[styles.cellDate, { flex: 2, textAlign: "center" }]}>
                {date}
            </Text>

            <Text style={[styles.cellHours, { flex: 1, textAlign: "center" }]}>
                {hours}
            </Text>
        </View>
    );
};

export default HistoryTableRow;

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: "row",
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#F8FAFC",
    },
    cellDay: {
        fontSize: 13,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
    },
    cellDate: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },
    cellHours: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.buttonDarkPurple,
    },
});
