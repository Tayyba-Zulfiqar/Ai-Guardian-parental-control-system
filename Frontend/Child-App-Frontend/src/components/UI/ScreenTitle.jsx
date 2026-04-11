import { View, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Fonts } from "../../../constants/Fonts";
import { Colors } from "../../../constants/Colors";

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
        fontSize: 24,
        fontFamily: Fonts.bold,
        color: Colors.Titles,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.Subtitles,
        textAlign: 'center',
        marginTop: 5,
    },
});

export default ScreenTitle;