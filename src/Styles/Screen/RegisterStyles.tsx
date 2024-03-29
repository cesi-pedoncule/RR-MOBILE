import { StyleSheet } from "react-native"
import { COLORS } from "../Colors";

export default StyleSheet.create({
    registerContainer: {
        marginTop: '3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        marginTop: '5%',
        backgroundColor: COLORS.LightBackgroundColor,
        alignItems: 'center',
    },
    registerButton: {
        marginTop: '5%',
        marginBottom: '5%',
    },
    rulesContainer: {
        width: "70%",
    },
    rulesText: {
        fontSize: 10,
        color: COLORS.ForegroundHolder,
        textAlign: 'left',
        alignItems: 'center',
        width: "100%",
    }
});