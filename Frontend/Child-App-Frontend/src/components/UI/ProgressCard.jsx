import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

const ProgressCard = ({
    icon: Icon,
    iconBgColor,
    iconColor,
    title,
    label,
    value,
    progress,
    progressColor,
    children
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: iconBgColor || Colors.purpleIconBg }]}>
                    <Icon color={iconColor || Colors.purpleIcon} size={22} />
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.statsRow}>
                <Text style={styles.statLabel}>{label}</Text>
                <Text style={[styles.statValueText, progressColor ? { color: progressColor } : { color: Colors.textMain }]}>{value}</Text>
            </View>

            {progress && (
                <View style={styles.progressBarTrack}>
                    <View style={[styles.progressBarFill, { width: progress, backgroundColor: progressColor || Colors.cardPurple }]} />
                </View>
            )}

            {children && (
                <View style={styles.extraContent}>
                    {children}
                </View>
            )}
        </View>
    );
};

export default ProgressCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        shadowColor: Colors.textMain,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    statLabel: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },
    statValueText: {
        fontSize: 14,
        fontFamily: Fonts.bold,
    },
    progressBarTrack: {
        height: 10,
        backgroundColor: '#F1F5F9',
        borderRadius: 5,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 5,
    },
    extraContent: {
        marginTop: 16,
    }
});
