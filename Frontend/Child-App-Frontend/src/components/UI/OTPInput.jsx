import { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OTPInput = ({
    code,
    setCode,
    length = 6,
    inputStyle,
    focusedStyle
}) => {
    const inputRefs = useRef([]);
    const [focusedIndex, setFocusedIndex] = useState(null);

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text.slice(-1);
        setCode(newCode);

        if (text && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };
    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (code[index]) {
                // Clear current field
                const newCode = [...code];
                newCode[index] = '';
                setCode(newCode);
            } else if (index > 0) {
                // Move focus immediately to previous field
                inputRefs.current[index - 1].focus();

                // Clear previous field after focusing
                const newCode = [...code];
                newCode[index - 1] = '';
                setCode(newCode);
            }
        }
    };

    return (
        <View style={styles.container}>
            {code.map((value, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={[
                        styles.input,
                        inputStyle,
                        focusedIndex === index && (focusedStyle || styles.focusedInput)
                    ]}
                    value={value}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    placeholder="-"
                    placeholderTextColor="#7B809A"
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    input: {
        width: 45,
        height: 55,
        borderWidth: 1.5,
        borderColor: '#EFEFEF',
        borderRadius: 12,
        fontSize: 24,
        textAlign: 'center',
        color: '#1A2138',
        backgroundColor: '#FFFFFF',
    },
    focusedInput: {
        borderColor: '#8b8de3',
        borderWidth: 2,
    },
});

export default OTPInput;