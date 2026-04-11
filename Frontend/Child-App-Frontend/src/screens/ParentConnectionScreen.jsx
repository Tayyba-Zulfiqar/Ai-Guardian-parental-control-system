import { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenTitle from '../components/UI/ScreenTitle';
import OTPInput from '../components/UI/OTPInput';
import PrimaryButton from '../components/UI/PrimaryButton';

const { width } = Dimensions.get('window');


const ParentConnectionScreen = ({ navigation }) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);


    const handleConnection = () => {
        console.log("Code entered:", code.join(''));
        navigation.navigate('Permissions');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                {/* Mascot / Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../assets/images/connect.png")}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Title + Subtitle + OTP Inputs */}
                <View style={styles.contentContainer}>
                    <ScreenTitle
                        title="Connect with your Parent"
                        subtitle="Ask your parent for the pairing code."
                    />

                    <OTPInput
                        code={code}
                        setCode={setCode}
                    />
                </View>

                <PrimaryButton
                    title="Connect"
                    onPress={handleConnection}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.06,
        paddingBottom: 40,
        paddingTop: 60,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.45,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 0.35,
        alignItems: 'center',
    },

});

export default ParentConnectionScreen;