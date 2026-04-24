import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../../../../constants/Fonts";
import { Colors } from "../../../../constants/Colors";

const ActivityHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Activity Log</Text>
        </View>
    );
};

export default ActivityHeader;

const styles = StyleSheet.create({
    header: {
        marginTop: 45,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
    },
});