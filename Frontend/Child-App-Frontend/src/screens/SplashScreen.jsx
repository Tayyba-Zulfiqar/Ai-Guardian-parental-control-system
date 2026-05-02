import { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import ScreenTitle from "../components/UI/ScreenTitle";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";


const SplashScreen = ({ navigation }) => {
    // Shared values (React Native Animated)
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start animations
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 5,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace("ParentConnection");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {/* Animated Image */}
            <Animated.Image
                source={require("../../assets/images/SplashScreen.png")}
                style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
            />

            {/* Animated Text Section */}
            <Animated.View style={{ opacity: fadeAnim }}>
                <ScreenTitle
                    title="AI Guardian"
                    subtitle="Keeping you safe online"
                    titleStyle={styles.title}
                    subtitleStyle={styles.subtitle}
                    containerStyle={{ marginBottom: 40 }}
                />
            </Animated.View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primaryPurple,
    },
    image: {
        width: 160,
        height: 160,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.bold,
        color: "#ecececff"
    },
    subtitle: {
        fontSize: 18,
        opacity: 0.7,
        marginTop: 6,
        color: "#ecececff",
        fontFamily: Fonts.regular
    },
});