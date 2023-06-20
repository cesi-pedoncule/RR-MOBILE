import { StyleSheet } from "react-native";
import { COLORS } from "../../../Colors";

export default StyleSheet.create({
    scrollViewContainer: {
        display: 'flex',
        marginTop: 50,
        with: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80,
    },
    addNameCategory: {
        color: COLORS.Black,
        backgroundColor: COLORS.ComponentBackground,
        textAlign: 'center',
        height: 40,
        width : "90%",
        paddingHorizontal: 10,
        borderRadius : 10,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    switchContainer: {
        display : "flex",
        flexDirection : "row",
        overflow:'scroll',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    sendButton: {
        width: 140,
        height: 45,
        justifyContent: 'center',
        backgroundColor: COLORS.AccentColor,
        marginTop: 30,
        borderRadius: 15,
        transition: 0.2,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
});