import { useState } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Text,
} from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import PermissionCard from "../components/UI/PermissionCard";
import PrimaryButton from "../components/UI/PrimaryButton";
import ScreenTitle from "../components/UI/ScreenTitle";
import CustomAlert from "../components/UI/CustomAlert";
import { permissions } from "../../constants/Permissions";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";

const PermissionsScreen = ({ navigation }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [learnMoreVisible, setLearnMoreVisible] = useState(false);
    const [permissionStates, setPermissionStates] = useState(
        permissions.reduce((acc, p) => ({ ...acc, [p.title]: false }), {})
    );

    const handleContinue = () => {
        setAlertVisible(true);
    };

    const handleConfirmAll = async () => {
        setAlertVisible(false);

        // Small delay ONLY for modal close animation
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }, 250);
    };

    return (
        <>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <ScreenTitle
                    title="Enable Protection Features"
                    subtitle="These permissions help AI-Guardian keep you safe."
                    titleStyle={styles.headerTitle}
                    subtitleStyle={styles.headerSubtitle}
                    containerStyle={styles.headerContainer}
                />

                <View style={styles.cardList}>
                    {permissions.map((p, i) => (
                        <PermissionCard
                            key={p.title}
                            {...p}
                            enabled={permissionStates[p.title]}
                            onToggle={() => { }}
                            delay={0.15 + i * 0.1}
                        />
                    ))}
                </View>

                <Animated.View
                    entering={FadeInDown.delay(600).duration(300)}
                    style={styles.buttonContainer}
                >
                    <PrimaryButton
                        title="Enable All & Continue"
                        onPress={handleContinue}
                    />
                    <TouchableOpacity onPress={() => setLearnMoreVisible(true)} style={styles.learnMoreContainer}>
                        <Text style={styles.learnMoreText}>Learn More</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>

        <CustomAlert
            visible={alertVisible}
            title="Enable All Protections?"
            message="This will activate all safety features to ensure your device is fully protected by AI Guardian."
            confirmText="Enable All"
            cancelText="Not Now"
            onConfirm={handleConfirmAll}
            onCancel={() => setAlertVisible(false)}
        />

        <CustomAlert
            visible={learnMoreVisible}
            title="Why Required?"
            message="AI Guardian needs these permissions to fully protect this device. Your data is never sold or misused—our only goal is your child's safety."
            confirmText="I Understand"
            cancelText=""
            onConfirm={() => setLearnMoreVisible(false)}
            onCancel={() => setLearnMoreVisible(false)}
        />
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.BackgroundColor
    },
    container: {
        flex: 1,
        marginTop: 30
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 40,
    },
    headerContainer: {
        alignItems: 'flex-start',
        marginBottom: 32,
    },
    headerTitle: {
        fontSize: 23,
        textAlign: 'center'
    },
    headerSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 6,
    },
    cardList: {
        gap: 12,
        marginBottom: 32,
    },
    buttonContainer: {
        marginTop: 6,
    },
    learnMoreContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    learnMoreText: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.Subtitles,
        textDecorationLine: 'underline',
    },
});

export default PermissionsScreen;