import React, { useState } from "react";
import {
    StyleSheet,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../../constants/Fonts";
import { Colors } from "../../../constants/Colors";

import { weeklyStats, monthlyStats } from "../../../constants/activityData";

// components
import ActivityHeader from "../../components/UI/ActivityTab/ActivityHeader";
import ScanHistoryCard from "../../components/UI/ActivityTab/ScanHistoryCard";
import ProtectionStats from "../../components/UI/ActivityTab/ProtectionStats";
import PeriodSelector from "../../components/UI/ActivityTab/PeriodSelector";
import TableHeader from "../../components/UI/ActivityTab/TableHeader";
import HistoryTableRow from "../../components/UI/ActivityTab/HistoryTableRow";

const ActivityTab = () => {
    const [period, setPeriod] = useState('Week');

    const stats = period === 'Week' ? weeklyStats : monthlyStats;

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar translucent={false} barStyle="dark-content" backgroundColor={Colors.backgroundLight} />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <ActivityHeader />

                <ScanHistoryCard lastScan="2 min ago" />

                <Text style={styles.sectionHeader}>PROTECTION HISTORY</Text>

                <ProtectionStats avg={stats.avg} peak={stats.peak} />

                <PeriodSelector period={period} onSelect={setPeriod} />

                <View style={styles.tableCard}>
                    <TableHeader period={period} />

                    <View style={styles.tableBody}>
                        {stats.dailyData.map((item, index) => (
                            <HistoryTableRow
                                key={index}
                                day={item.day}
                                date={item.date}
                                hours={item.hours}
                                isLast={index === stats.dailyData.length - 1}
                            />
                        ))}
                    </View>
                </View>

                <Text style={styles.infoText}>
                    These logs represent AI-Guardian monitoring activity.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ActivityTab;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    sectionHeader: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.textGray,
        marginBottom: 10,
    },
    tableCard: {
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 24,
        overflow: "hidden",
    },
    tableBody: {
        paddingHorizontal: 12,
    },
    infoText: {
        marginTop: 25,
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
        textAlign: "center",
    },
});
