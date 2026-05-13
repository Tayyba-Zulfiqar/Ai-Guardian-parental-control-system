import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';

const QRScanButton = ({ onPress, buttonStyle, helperTextStyle }) => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={[styles.button, buttonStyle]}
                activeOpacity={0.75}
                onPress={onPress}
            >
                <Ionicons
                    name="qr-code-outline"
                    size={22}
                    color={Colors.buttonDarkPurple}
                    style={styles.icon}
                />
                <Text style={styles.label}>Scan QR Code</Text>
            </TouchableOpacity>
            <Text style={[styles.helperText, helperTextStyle]}>
                Ask your parent to generate a QR code.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1.8,
        borderColor: Colors.buttonDarkPurple,
        backgroundColor: Colors.BackgroundColor,
    },
    icon: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        color: Colors.buttonDarkPurple,
        fontFamily: Fonts.bold,
    },
    helperText: {
        marginTop: 8,
        fontSize: 13,
        color: Colors.textSecondary,
        fontFamily: Fonts.regular,
        textAlign: 'center',
    },
});

export default QRScanButton;
