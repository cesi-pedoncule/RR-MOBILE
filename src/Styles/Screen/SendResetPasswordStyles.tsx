import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    sendMailContainer: {
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        marginTop: '20%',
        backgroundColor: COLORS.LightBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButton: {
        textAlign: 'center',
        marginTop: '10%',
        marginBottom: '5%',
        width: 180,
    },
    text: {
        color: COLORS.Black,
    },
    container: {
        height: '100%',
    }
});