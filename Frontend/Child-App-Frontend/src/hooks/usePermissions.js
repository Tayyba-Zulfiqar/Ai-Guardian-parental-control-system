import { useMemo } from "react";
import { permissions } from "../../constants/Permissions";

/**
 * Simulated permission status — in production, query actual system APIs
 * (e.g., PermissionsAndroid or expo-permissions).
 */
const PERMISSION_STATUS = {
    "Accessibility Monitoring": false,
    "App Usage Access": true,
    "Screen Monitoring": false,
    "Notification Access": true,
};

const WHY_NEEDED = {
    "Accessibility Monitoring": "Detects harmful or unsafe on-screen content in real time.",
    "App Usage Access": "Monitors which apps are being used and for how long.",
    "Screen Monitoring": "Catches screenshots or recordings of inappropriate content.",
    "Notification Access": "Flags suspicious notifications from unknown sources.",
};

/**
 * usePermissions
 *
 * Encapsulates permission status, human-readable reasons, and derived state.
 * All values are memoized to avoid recalculation on unrelated re-renders.
 */
export const usePermissions = () => {
    const permissionList = useMemo(() => permissions || [], []);

    const permissionStatus = useMemo(() => PERMISSION_STATUS, []);

    const whyNeeded = useMemo(() => WHY_NEEDED, []);

    const anyMissing = useMemo(
        () => Object.values(permissionStatus).some((v) => !v),
        [permissionStatus]
    );

    return {
        permissionList,
        permissionStatus,
        whyNeeded,
        anyMissing,
    };
};
