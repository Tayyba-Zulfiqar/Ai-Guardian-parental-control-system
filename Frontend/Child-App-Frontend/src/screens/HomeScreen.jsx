import { View, Text, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Activity, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeTab from './tabs/HomeTab';
import ActivityTab from './tabs/ActivityTab';
import ProfileTab from './tabs/ProfileTab';
import { Colors } from "../../constants/Colors";

import { Fonts } from "../../constants/Fonts";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const bottomPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 12 : 10);
    const tabBarHeight = 65 + bottomPadding;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    const iconSize = 22;
                    const stroke = 2;
                    if (route.name === 'HomeTab') return <Home color={color} size={iconSize} strokeWidth={stroke} />;
                    if (route.name === 'ActivityTab') return <Activity color={color} size={iconSize} strokeWidth={stroke} />;
                    if (route.name === 'ProfileTab') return <User color={color} size={iconSize} strokeWidth={stroke} />;
                    return null;
                },
                tabBarLabel: ({ focused, color }) => {
                    let labelName = '';
                    if (route.name === 'HomeTab') labelName = 'Home';
                    else if (route.name === 'ActivityTab') labelName = 'Activity';
                    else if (route.name === 'ProfileTab') labelName = 'Profile';

                    return (
                        <View style={styles.labelContainer}>
                            <Text style={[styles.labelText, { color }]}>{labelName}</Text>
                            <View style={[styles.dot, { backgroundColor: focused ? color : 'transparent' }]} />
                        </View>
                    );
                },
                tabBarActiveTintColor: Colors.purpleIcon,
                tabBarInactiveTintColor: Colors.textGray,
                headerShown: false,
                tabBarStyle: {
                    height: tabBarHeight,
                    paddingTop: 10,
                    paddingBottom: bottomPadding,
                    backgroundColor: Colors.BackgroundColor,
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                }
            })}
        >
            <Tab.Screen name="HomeTab" component={HomeTab} />
            <Tab.Screen name="ActivityTab" component={ActivityTab} />
            <Tab.Screen name="ProfileTab" component={ProfileTab} />
        </Tab.Navigator>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    labelContainer: {
        alignItems: 'center',
        marginTop: 2,
    },
    labelText: {
        fontFamily: Fonts.bold,
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginTop: 4,
    }
});
