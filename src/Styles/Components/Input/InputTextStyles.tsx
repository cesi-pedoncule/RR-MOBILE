import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    txtFieldBackground: {
        justifyContent: 'center',
        width: "70%",
        height: 55,
        margin: 10,
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 5,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    txtFieldBackgroundNotValid: {
        justifyContent: 'center',
        width: "70%",
        height: 55,
        margin: 10,
        backgroundColor: COLORS.ComponentBackground,
        borderBottomColor: COLORS.Red,
        borderBottomWidth: 2,
        borderRadius: 5,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    txtFieldText: {
        textAlign: 'left',
        color: COLORS.ForegroundHolder,
        width: '100%',
        height: '30%',
        paddingLeft: 8,
        paddingTop: 4,
        fontSize: 13,
        lineHeight: 16,
    },
    txtFieldInput: {
        textAlign: 'left',
        color: COLORS.Black,
        paddingLeft: 8,
        width: '100%',
        height: '70%',
        fontSize: 13,
        lineHeight: 16,
        outlineStyle: 'none',
    },
})