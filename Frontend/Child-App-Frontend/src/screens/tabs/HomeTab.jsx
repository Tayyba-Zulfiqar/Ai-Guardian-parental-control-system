import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Fonts } from "../../../constants/Fonts";
import { Colors } from "../../../constants/Colors";

import ProgressCard from "../../components/UI/ProgressCard";
import StatusCard from "../../components/UI/StatusCard";
import VerticalStat from "../../components/UI/VerticalStat";

import {
    statusData,
    safetyScoreData,
    screenTimeData,
} from "../../../constants/homeData";

const HomeTab = () => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return { text: "Good morning", emoji: "☀️" };
        if (hour >= 12 && hour < 17) return { text: "Good afternoon", emoji: "🌤️" };
        if (hour >= 17 && hour < 21) return { text: "Good evening", emoji: "🌤️" };
        return { text: "Good night", emoji: "🌙" };
    };

    const greeting = getGreeting();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.greetingText}>
                    {greeting.text}, Alex {greeting.emoji}
                </Text>

                <Text style={styles.mainTitle}>Hey there, buddy!</Text>
            </View>

            {/* Status Card */}
            <StatusCard {...statusData} />

            {/* Section Title */}
            <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeader}>MY PROGRESS</Text>
            </View>

            {/* Safety Score */}
            <ProgressCard {...safetyScoreData}>
                {safetyScoreData.stats.map((item, index) => (
                    <VerticalStat key={index} {...item} />
                ))}
            </ProgressCard>

            {/* Screen Time */}
            <ProgressCard {...screenTimeData} />
        </ScrollView>
    );
};

export default HomeTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 24,
        marginTop: 10,
        marginLeft: 4,
    },
    greetingText: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.textGray,
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    mainTitle: {
        fontSize: 32,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
    },
    sectionHeaderContainer: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 4,
    },
    sectionHeader: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.textGray,
        letterSpacing: 1,
    },
});