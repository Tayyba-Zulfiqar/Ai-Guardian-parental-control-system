
import { TouchableOpacity, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import BaseCard from "./BaseCard";
import { Colors } from "../../../constants/Colors";

const InfoCard = ({
    icon,
    iconColor,
    iconBgColor,
    title,
    description,
    rightElement,
    onPress,
    style,
    showChevron = false,
    delay = 0,
    animated = false,
}) => {
    const Wrapper = onPress ? TouchableOpacity : View;

    const content = (
        <Wrapper onPress={onPress} activeOpacity={0.7}>
            <BaseCard
                icon={icon}
                iconColor={iconColor}
                iconBgColor={iconBgColor}
                title={title}
                description={description}
                style={style}
                rightElement={
                    <>
                        {rightElement}
                        {showChevron && (
                            <ChevronRight size={20} color={Colors.textGray} />
                        )}
                    </>
                }
            />
        </Wrapper>
    );

    if (animated) {
        return (
            <Animated.View
                entering={FadeInDown.delay(delay * 1000).duration(350)}
            >
                {content}
            </Animated.View>
        );
    }

    return content;
};

export default InfoCard;