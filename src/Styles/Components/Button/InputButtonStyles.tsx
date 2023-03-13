import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    btnBackground: {
        width: 126,
        height: 34,
        justifyContent: 'center',
        backgroundColor: COLORS.AccentColor,
        borderRadius: 15,
        transition: 0.2,
    },
    btnText: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginVertical: 8,
    },
});