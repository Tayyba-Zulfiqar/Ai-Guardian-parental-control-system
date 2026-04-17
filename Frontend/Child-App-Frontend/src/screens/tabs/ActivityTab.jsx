import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";

const ActivityTab = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Hi this is activity tab</Text>
    </View>
);

export default ActivityTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.BackgroundColor,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
    },
});
