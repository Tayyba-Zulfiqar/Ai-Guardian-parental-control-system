import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const PrimaryButton = ({
    title,
    onPress,
    colors = ['#6E68E8', '#8C7BFF'],
    buttonStyle,
    gradientStyle,
    textStyle
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}  // default + override
            activeOpacity={0.8}
            onPress={onPress}
        >
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.gradientButton, gradientStyle]} // default + override
            >
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#6E68E8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    gradientButton: {
        width: '100%',
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PrimaryButton;