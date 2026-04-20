import Animated, { FadeInDown } from "react-native-reanimated";
import BaseCard from "./BaseCard";
import CustomSwitch from "./CustomSwitch";
import { Colors } from "../../../constants/Colors";

const PermissionCard = ({
    icon,
    title,
    description,
    enabled,
    onToggle,
    delay = 0,
}) => {
    return (
        <Animated.View
            entering={FadeInDown.delay(delay * 1000).duration(350)}
        >
            <BaseCard
                icon={icon}
                title={title}
                description={description}
                rightElement={
                    <CustomSwitch
                        active={enabled}
                        onToggle={onToggle}
                        activeColor={Colors.switchGreen}
                    />
                }
            />
        </Animated.View>
    );
};

export default PermissionCard;