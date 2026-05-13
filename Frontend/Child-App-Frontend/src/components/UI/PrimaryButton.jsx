import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";

const PrimaryButton = ({
    title,
    onPress,
    disabled = false,
    colors = [Colors.buttonDarkPurple, Colors.buttonLightPurple],
    buttonStyle,
    gradientStyle,
    textStyle
}) => {
    const activeColors = disabled ? ['#C4C4D4', '#D0D0E0'] : colors;

    return (
        <TouchableOpacity
            style={[
                styles.button,
                disabled && styles.buttonDisabled,
                buttonStyle,
            ]}
            activeOpacity={disabled ? 1 : 0.8}
            onPress={disabled ? undefined : onPress}
        >
            <LinearGradient
                colors={activeColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.gradientButton, gradientStyle]}
            >
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: Colors.buttonDarkPurple,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        shadowOpacity: 0,
        elevation: 0,
    },
    gradientButton: {
        width: '100%',
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.BackgroundColor,
        fontSize: 16,
        fontFamily: Fonts.bold
    },
});

export default PrimaryButton;