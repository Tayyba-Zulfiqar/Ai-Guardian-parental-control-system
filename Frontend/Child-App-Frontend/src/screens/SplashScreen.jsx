import { useEffect } from "react";
import { StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import ScreenTitle from "../components/UI/ScreenTitle";
import { Colors } from "../../constants/Colors";
const SplashScreen = ({ navigation }) => {
    const scaleAnim = new Animated.Value(0);
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        // Animate mascot zoom in
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

        // Fade in text
        Animated.timing(fadeAnim, { toValue: 1, delay: 300, duration: 500, useNativeDriver: true }).start();

        // Navigate to Home after 4 seconds
        const timer = setTimeout(() => {
            navigation.replace("ParentConnection");
        }, 3000);

        return () => clearTimeout(timer); // cleanup
    }, []);

    return (
        <LinearGradient
            colors={[Colors.primaryPurple, Colors.secondaryPurple]} // Gradient colors
            start={{ x: 0, y: 0 }} // Top-left
            end={{ x: 1, y: 2 }}   // Bottom-right
            style={styles.container}
        >
            <Animated.Image
                source={require("../../assets/images/SplashScreen.png")}
                style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
            />
            <ScreenTitle
                title="AI Guardian"
                subtitle="Keeping you safe online"
                animated={true}
                fadeAnim={fadeAnim}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}
                containerStyle={{ marginBottom: 40 }}
            />
        </LinearGradient>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 160,
        height: 160,
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "900",
        color: "#1e1b4b"
    },
    subtitle: {
        fontSize: 16,
        color: "#1e1b4b",
        opacity: 0.7,
        marginTop: 6
    },
});