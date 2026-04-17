import { View, Text, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Activity, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeTab from './tabs/HomeTab';
import ActivityTab from './tabs/ActivityTab';
import ProfileTab from './tabs/ProfileTab';
import { Colors } from "../../constants/Colors";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    // compute dynamic bottom padding so the bar doesn't sit flush with system navigations
    const bottomPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 15 : 10);
    const tabBarHeight = 62 + bottomPadding;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    if (route.name === 'HomeTab') return <Home color={color} size={24} strokeWidth={1.8} />;
                    if (route.name === 'ActivityTab') return <Activity color={color} size={24} strokeWidth={1.8} />;
                    if (route.name === 'ProfileTab') return <User color={color} size={24} strokeWidth={1.8} />;
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
                tabBarActiveTintColor: Colors.buttonDarkPurple,
                tabBarInactiveTintColor: Colors.textSecondary,
                headerShown: false,
                tabBarStyle: {
                    height: tabBarHeight,
                    paddingTop: 8,
                    paddingBottom: bottomPadding,
                    backgroundColor: Colors.BackgroundColor,
                    borderTopWidth: 1,
                    borderTopColor: Colors.BorderColor,
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
    labelContainer: {
        alignItems: 'center',
        marginTop: 1,
    },
    labelText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 4,
    }
});
