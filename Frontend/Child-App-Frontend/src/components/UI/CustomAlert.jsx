import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';
import { ShieldAlert } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const CustomAlert = ({ 
    visible, 
    title, 
    message, 
    onConfirm, 
    onCancel, 
    confirmText = "Confirm", 
    cancelText = "Cancel",
    Icon = ShieldAlert,
    iconColor = Colors.IconColor,
    iconBgColor = Colors.IconCircle
}) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            statusBarTranslucent={true}
        >
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
                        <Icon size={28} color={iconColor} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttonRow}>
                        {cancelText ? (
                            <TouchableOpacity style={styles.secondaryButton} onPress={onCancel}>
                                <Text style={styles.secondaryButtonText}>{cancelText}</Text>
                            </TouchableOpacity>
                        ) : null}

                        <TouchableOpacity 
                            style={[styles.primaryButton, { backgroundColor: iconColor }]} 
                            onPress={onConfirm}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.primaryButtonText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertBox: {
        width: width * 0.85,
        maxWidth: 340,
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 32,
        padding: 24,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: Colors.Titles,
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.Subtitles,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        fontSize: 15,
        fontFamily: Fonts.bold,
        color: Colors.BackgroundColor,
    },
    secondaryButton: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonText: {
        fontSize: 15,
        fontFamily: Fonts.bold,
        color: Colors.textGray,
    },
});

export default CustomAlert;
