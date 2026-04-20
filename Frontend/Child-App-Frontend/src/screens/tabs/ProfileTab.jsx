import { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    StyleSheet,
} from "react-native";
import { LogOut } from "lucide-react-native";

import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import InfoCard from "../../components/UI/InfoCard";
import CustomSwitch from "../../components/UI/CustomSwitch";
import { profileSections } from "../../../constants/ProfileData";

const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{title}</Text>
    </View>
);

const Badge = ({ text }) => (
    <View style={styles.badge}>
        <Text style={styles.badgeText}>{text}</Text>
    </View>
);

const ProfileTab = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const renderRightElement = (item) => {
        if (item.type === "switch") {
            return (
                <CustomSwitch
                    active={notificationsEnabled}
                    onToggle={() =>
                        setNotificationsEnabled((prev) => !prev)
                    }
                    activeColor={Colors.switchGreen}
                />
            );
        }

        if (item.badge) {
            return <Badge text={item.badge} />;
        }

        return null;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.headerTitle}>Profile</Text>

                {profileSections.map((section, index) => (
                    <View key={index}>
                        {section.title !== "Profile" && (
                            <SectionHeader title={section.title} />
                        )}

                        {/* ✅ FIX: spacing applied here */}
                        <View style={styles.cardGroup}>
                            {section.data.map((item) => (
                                <InfoCard
                                    key={item.id}
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                    iconBgColor={item.iconBgColor}
                                    iconColor={item.iconColor}
                                    rightElement={renderRightElement(item)}
                                    showChevron={item.type === "link"}
                                    onPress={
                                        item.type === "link"
                                            ? () => console.log(item.title)
                                            : undefined
                                    }
                                />
                            ))}
                        </View>
                    </View>
                ))}

                {/* Logout */}
                <TouchableOpacity style={styles.logoutButton}>
                    <LogOut size={20} color={Colors.BackgroundColor} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileTab;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    headerTitle: {
        fontSize: 32,
        fontFamily: Fonts.bold,
        color: Colors.textMain,
        marginTop: 45,
        marginBottom: 16,
    },

    // ✅ FIXED SPACING GROUP
    cardGroup: {
        gap: 12,
    },

    sectionHeaderContainer: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 4,
    },
    sectionHeader: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.textGray,
        letterSpacing: 1,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor: Colors.badgeGreenBg,
    },
    badgeText: {
        fontSize: 12,
        fontFamily: Fonts.bold,
        color: Colors.badgeGreenText,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.buttonLightPurple,
        borderRadius: 24,
        paddingVertical: 16,
        marginTop: 24,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: Colors.BackgroundColor,
    },
});