import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Shield, ShieldOff, Sparkles } from "lucide-react-native";
import { Fonts } from "../../../constants/Fonts";
import { Colors } from "../../../constants/Colors";
const ActivityTab = () => {
    // Simulated state - in a real app this would come from a service/context
    const [isActive, setIsActive] = useState(true);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.mainTitle}>Activity Log</Text>
            </View>

            {/* Centered Protection Status */}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setIsActive(!isActive)}
                style={styles.centerSection}
            >
                <View style={[styles.shieldContainer, !isActive && styles.shieldContainerInactive]}>
                    {isActive ? (
                        <Shield color={Colors.badgeGreenText} size={80} strokeWidth={1.5} />
                    ) : (
                        <ShieldOff color={Colors.logoutText} size={80} strokeWidth={1.5} />
                    )}

                    {isActive && (
                        <View style={styles.sparkleContainer}>
                            <Sparkles color="#BBF7D0" size={32} />
                        </View>
                    )}
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.statusPrimary}>
                        {isActive ? "Currently Active" : "Protection Paused"}
                    </Text>
                    <Text style={[styles.statusSecondary, !isActive && styles.statusSecondaryInactive]}>
                        {isActive ? "Safety Monitoring Active" : "Monitoring is currently off"}
                    </Text>
                </View>

                {/* Pulse ring decoration */}
                <View style={[styles.pulseRing, !isActive && styles.pulseRingInactive]} />
            </TouchableOpacity>

            <View style={styles.footerInfo}>
                <View style={styles.infoCard}>
                    <Text style={styles.footerText}>
                        {isActive
                            ? "AI-Guardian is working in the background to ensure a safe digital environment."
                            : "Manual restart required to resume real-time protection and monitoring."}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default ActivityTab;

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
        marginBottom: 40,
        marginTop: 10,
        marginLeft: 4,
    },
    mainTitle: {
        fontSize: 32,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
    },
    centerSection: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    shieldContainer: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: Colors.badgeGreenBg,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.badgeGreenText,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 2,
    },
    shieldContainerInactive: {
        backgroundColor: Colors.logoutBg,
        shadowColor: Colors.logoutText,
    },
    sparkleContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    pulseRing: {
        position: 'absolute',
        width: 240,
        height: 240,
        borderRadius: 120,
        borderWidth: 2,
        borderColor: 'rgba(52, 199, 89, 0.05)',
        zIndex: -1,
    },
    pulseRingInactive: {
        borderColor: 'rgba(191, 58, 103, 0.05)',
    },
    textContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    statusPrimary: {
        fontSize: 24,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
        marginBottom: 6,
    },
    statusSecondary: {
        fontSize: 15,
        fontFamily: Fonts.regular,
        color: Colors.badgeGreenText,
    },
    statusSecondaryInactive: {
        color: Colors.logoutText,
    },
    footerInfo: {
        marginTop: 60,
        paddingHorizontal: 10,
    },
    infoCard: {
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 20,
        padding: 20,
        shadowColor: Colors.textMain,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.01,
        shadowRadius: 10,
        elevation: 1,
    },
    footerText: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
});
