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
        backgroundColor: COLORS.White,
        alignItems: 'center',
    },
    registerButton: {
        marginTop: '5%',
        marginBottom: '5%',
    },
    texContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
});