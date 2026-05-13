import { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Keyboard,
    Animated,
    Text,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenTitle from '../components/UI/ScreenTitle';
import OTPInput from '../components/UI/OTPInput';
import PrimaryButton from '../components/UI/PrimaryButton';
import QRScanButton from '../components/UI/QRScanButton';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

const { width, height } = Dimensions.get('window');
const ILLUSTRATION_HEIGHT = height * 0.35;

const ParentConnectionScreen = ({ navigation }) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const handleConnection = () => {
        console.log('Code entered:', code.join(''));
        navigation.navigate('Permissions');
    };

    const handleQRScan = () => {
        console.log('QR scan pressed');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar translucent={false} barStyle="dark-content" backgroundColor={Colors.BackgroundColor} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <View style={styles.contentWrapper}>
                    {/* ── Mascot illustration ── */}
                    <View style={[
                        styles.imageContainer,
                        keyboardVisible && styles.imageContainerSmall
                    ]}>
                        <Image
                            source={require('../../assets/images/connect.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>

                    {/* ── Title + Subtitle + OTP Inputs ── */}
                    <View style={styles.contentContainer}>
                        <ScreenTitle
                            title="Connect with your Parent"
                            subtitle="Ask your parent for the pairing code."
                        />
                        <View style={styles.otpWrapper}>
                            <OTPInput code={code} setCode={setCode} />
                        </View>
                    </View>

                    {/* ── "or" divider + QR section ── */}
                    {!keyboardVisible && (
                        <View style={styles.qrWrapper}>
                            <View style={styles.dividerRow}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>or</Text>
                                <View style={styles.dividerLine} />
                            </View>
                            <QRScanButton onPress={handleQRScan} />
                        </View>
                    )}

                    {/* ── Flexible space that pushes button down ── */}
                    <View style={styles.flexibleSpace} />

                    {/* ── Connect button ── */}
                    <View style={styles.buttonContainer}>
                        <PrimaryButton title="Connect" onPress={handleConnection} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BackgroundColor,
    },
    keyboardView: {
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: width * 0.06,
        paddingTop: 10,
        paddingBottom: 20,
    },
    imageContainer: {
        height: ILLUSTRATION_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    imageContainerSmall: {
        height: ILLUSTRATION_HEIGHT * 0.6, // Still visible, just smaller
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    otpWrapper: {
        width: '100%',
        marginTop: 20,
    },
    qrWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 8,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        alignSelf: 'center',
        marginBottom: 16,
        marginTop: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        marginHorizontal: 12,
        fontSize: 14,
        color: Colors.textSecondary,
        fontFamily: Fonts.regular,
    },
    flexibleSpace: {
        flex: 1, // This pushes everything down but shrinks when keyboard opens
        minHeight: 10,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
});

export default ParentConnectionScreen;