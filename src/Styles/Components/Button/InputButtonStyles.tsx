import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    btnBackground: {
        width: 126,
        height: 50,
        justifyContent: 'center',
        backgroundColor: COLORS.AccentColor,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
        borderRadius: 15,
        transition: 0.2,
    },
    btnText: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginVertical: 8,
    },
});