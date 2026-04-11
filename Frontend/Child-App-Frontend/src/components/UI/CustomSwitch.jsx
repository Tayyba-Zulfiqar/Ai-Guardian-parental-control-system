import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { Colors } from "../../../constants/Colors";

const CustomSwitch = ({ active, onToggle, activeColor = Colors.switchGreen, inactiveColor = "#d1d5db" }) => {
    const translateX = useSharedValue(active ? 20 : 0);

    const thumbStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(active ? 20 : 0, { stiffness: 500, damping: 30 }) }],
    }));

    return (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.8}
            style={[styles.toggle, { backgroundColor: active ? activeColor : inactiveColor }]}
        >
            <Animated.View style={[styles.thumb, thumbStyle]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    toggle: {
        width: 48,
        height: 28,
        borderRadius: 14,
        paddingHorizontal: 2,
        justifyContent: "center",
    },
    thumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.BackgroundColor,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
    },
});

export default CustomSwitch;
