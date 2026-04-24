import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../../../../constants/Fonts";
import { Colors } from "../../../../constants/Colors";

const TableHeader = ({ period }) => {
    return (
        <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 1, marginLeft: 15 }]}>
                {period === "Week" ? "DAY" : "WEEK"}
            </Text>

            <Text style={[styles.headerCell, { flex: 2, textAlign: "center" }]}>
                DATE
            </Text>

            <Text style={[styles.headerCell, { flex: 1, textAlign: "center" }]}>
                HOURS
            </Text>
        </View>
    );
};

export default TableHeader;

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: "row",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    headerCell: {
        fontSize: 12,
        fontFamily: Fonts.bold,
        color: Colors.textGray,
    },
});
