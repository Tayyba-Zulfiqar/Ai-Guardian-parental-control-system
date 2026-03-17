import { View, Text, StyleSheet, Animated } from "react-native";

const ScreenTitle = ({
    title,
    subtitle,
    animated = false,
    fadeAnim,
    titleStyle = {},
    subtitleStyle = {},
    containerStyle = {},
}) => {
    const TitleText = animated ? Animated.Text : Text;

    return (
        <View style={[styles.container, containerStyle]}>
            <TitleText
                style={[styles.title, animated && { opacity: fadeAnim }, titleStyle]}
            >
                {title}
            </TitleText>

            <TitleText
                style={[styles.subtitle, animated && { opacity: fadeAnim }, subtitleStyle]}
            >
                {subtitle}
            </TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1A2138",
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: "#7B809A",
        textAlign: 'center',
        marginTop: 5,
    },
});

export default ScreenTitle;