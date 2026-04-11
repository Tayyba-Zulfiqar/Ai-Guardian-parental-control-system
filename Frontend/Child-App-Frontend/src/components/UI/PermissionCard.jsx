import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import CustomSwitch from "./CustomSwitch";
import { Fonts } from "../../../constants/Fonts";
import { Colors } from "../../../constants/Colors";

const PermissionCard = ({ icon: Icon, title, description, enabled, onToggle, delay = 0 }) => {
    return (
        <Animated.View
            entering={FadeInDown.delay(delay * 1000).duration(350)}
            style={[styles.card, enabled && styles.cardEnabled]}
        >
            <View style={styles.iconCircle}>
                <Icon size={24} color={Colors.IconColor} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>

            <CustomSwitch
                active={enabled}
                onToggle={onToggle}
                activeColor={Colors.switchGreen}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
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
        elevation: 1
    },
    cardEnabled: {
        backgroundColor: Colors.BackgroundColor,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.IconCircle,
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
});

export default PermissionCard;