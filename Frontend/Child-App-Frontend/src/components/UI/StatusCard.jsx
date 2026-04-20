import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Shield } from 'lucide-react-native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

const StatusCard = ({ label, status }) => {
    return (
        <View style={styles.protectionCard}>
            <View style={styles.iconContainerGreen}>
                <Shield color={Colors.badgeGreenText} size={24} />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardLabelLight}>{label}</Text>
                <View style={styles.statusRow}>
                    <Text style={styles.cardValueLarge}>{status}</Text>
                </View>
            </View>
            <View style={styles.badgeContainer}>
                <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>Active</Text>
                </View>
            </View>
        </View>
    );
};

export default StatusCard;

const styles = StyleSheet.create({
    protectionCard: {
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        shadowColor: Colors.textMain,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
        elevation: 1,
    },
    iconContainerGreen: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.badgeGreenBg,
        marginRight: 16,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardLabelLight: {
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
        marginBottom: 2,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardValueLarge: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
    },
    badgeContainer: {
        justifyContent: 'center',
    },
    activeBadge: {
        backgroundColor: Colors.badgeGreenBg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    activeBadgeText: {
        fontSize: 12,
        fontFamily: Fonts.bold,
        color: Colors.badgeGreenText,
    }
});
