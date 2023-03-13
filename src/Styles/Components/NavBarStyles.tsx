import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        height:80,
        bottom :0,
        elevation: 0,
        borderTopWidth: 0,
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.transparent,
    },
    logo : {
        height: 60,
        width : 60,
    },
    text: {
        width:'100%',
    },
});