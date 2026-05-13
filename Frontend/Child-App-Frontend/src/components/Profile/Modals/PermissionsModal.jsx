import React from "react";
import {
    Modal,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Linking,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertTriangle, CheckCircle, XCircle, ExternalLink } from "lucide-react-native";
import { ModalHeader } from "../ProfileComponents";
import { usePermissions } from "../../../hooks/usePermissions";
import { Colors } from "../../../../constants/Colors";
import { Fonts } from "../../../../constants/Fonts";

/**
 * PermissionsModal
 *
 * Displays each required system permission with its grant status,
 * the reason it's needed, and a link to open device Settings if missing.
 *
 * @param {boolean} visible - Whether the modal is shown
 * @param {function} onClose - Callback to dismiss the modal
 */
const PermissionsModal = ({ visible, onClose }) => {
    const { permissionList, permissionStatus, whyNeeded, anyMissing } = usePermissions();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <SafeAreaView style={styles.modalSafeArea} edges={["top", "bottom"]}>
                <ModalHeader title="Permissions" onClose={onClose} />

                <ScrollView
                    contentContainerStyle={styles.modalScroll}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Warning banner if any permission is missing */}
                    {anyMissing && (
                        <View style={styles.warningBanner}>
                            <AlertTriangle size={16} color="#B45309" />
                            <Text style={styles.warningText}>
                                Some permissions are missing. Protection may be incomplete.
                            </Text>
                        </View>
                    )}

                    {permissionList.map((perm) => {
                        const granted = permissionStatus[perm.title];
                        return (
                            <View key={perm.title} style={styles.permissionRow}>
                                <View style={styles.permRowTop}>
                                    {/* Icon circle — green if granted, red if not */}
                                    <View
                                        style={[
                                            styles.permIconCircle,
                                            {
                                                backgroundColor: granted
                                                    ? Colors.greenIconBg
                                                    : Colors.pinkIconBg,
                                            },
                                        ]}
                                    >
                                        <perm.icon
                                            size={18}
                                            color={granted ? Colors.greenIcon : Colors.pinkIcon}
                                        />
                                    </View>

                                    <View style={styles.permText}>
                                        <Text style={styles.permTitle}>{perm.title}</Text>
                                        <Text style={styles.permReason}>{whyNeeded[perm.title]}</Text>
                                    </View>

                                    {granted ? (
                                        <CheckCircle size={20} color={Colors.greenIcon} />
                                    ) : (
                                        <XCircle size={20} color={Colors.pinkIcon} />
                                    )}
                                </View>

                                {/* Open Settings button for missing permissions */}
                                {!granted && (
                                    <TouchableOpacity
                                        style={styles.openSettingsBtn}
                                        onPress={() => Linking.openSettings()}
                                    >
                                        <ExternalLink size={14} color={Colors.buttonDarkPurple} />
                                        <Text style={styles.openSettingsText}>Open Settings</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

export default PermissionsModal;

const styles = StyleSheet.create({
    modalSafeArea: { flex: 1, backgroundColor: Colors.BackgroundColor },
    modalScroll: { padding: 20, paddingBottom: 40 },

    warningBanner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEF3C7",
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        gap: 8,
    },
    warningText: {
        flex: 1,
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: "#92400E",
        lineHeight: 18,
    },

    permissionRow: {
        backgroundColor: Colors.BackgroundColor,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 1,
    },
    permRowTop: { flexDirection: "row", alignItems: "center", gap: 12 },
    permIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    permText: { flex: 1 },
    permTitle: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.Titles,
        marginBottom: 2,
    },
    permReason: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.Subtitles,
        lineHeight: 16,
    },
    openSettingsBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 10,
        alignSelf: "flex-end",
        backgroundColor: Colors.purpleIconBg,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    openSettingsText: {
        fontSize: 13,
        fontFamily: Fonts.bold,
        color: Colors.buttonDarkPurple,
    },
});
