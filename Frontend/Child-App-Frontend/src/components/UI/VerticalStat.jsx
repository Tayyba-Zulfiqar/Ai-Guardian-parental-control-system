import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

const VerticalStat = ({ icon: Icon, iconColor, iconBgColor, label, value }) => {
    return (
        <View style={styles.verticalStatRow}>
            <View style={[styles.statIconContainer, { backgroundColor: iconBgColor || Colors.purpleIconBg }]}>
                <Icon color={iconColor || Colors.purpleIcon} size={18} />
            </View>
            <Text style={styles.verticalStatLabel}>{label}</Text>
            <Text style={styles.verticalStatValue}>{value}</Text>
        </View>
    );
};

export default VerticalStat;

const styles = StyleSheet.create({
    verticalStatRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundLight,
        padding: 10,
        borderRadius: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#F1F5F9', // Very subtle border
    },
    statIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    verticalStatLabel: {
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
        flex: 1,
    },
    verticalStatValue: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
    },
});
