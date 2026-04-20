import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";

const BaseCard = ({
    icon: Icon,
    iconColor = Colors.IconColor,
    iconBgColor = Colors.IconCircle,
    title,
    description,
    rightElement,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            {/* Icon */}
            <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
                {Icon && <Icon size={24} color={iconColor} />}
            </View>

            {/* Text */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {description && (
                    <Text style={styles.description}>{description}</Text>
                )}
            </View>

            {/* Right */}
            <View style={styles.rightContainer}>
                {rightElement}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 16,
        padding: 16,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 12,
        elevation: 1,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.Titles,
        marginBottom: 2,
    },
    description: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.Subtitles,
    },
    rightContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
});

export default BaseCard;