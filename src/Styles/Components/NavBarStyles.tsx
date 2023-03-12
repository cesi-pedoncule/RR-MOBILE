import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    container: {
        backgroundColor : COLORS.white,
        position: 'absolute',
        alignItems : "center",
        justifyContent: 'space-between',
        display : "flex",
        flexDirection : "row",
        bottom:0,
        left:0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom:5,
        width : "100%",
    },
    logo : {
        height: 50,
        width : 50,
    },
    text: {
        color: COLORS.accentColor,
        textAlign: 'center',
    },
    textFocused: {
        color: COLORS.accentColor,
        fontWeight : '700',
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button : {
        width : "25%",
        height: "100%",
    }
});