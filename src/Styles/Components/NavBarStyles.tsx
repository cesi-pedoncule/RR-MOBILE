import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        height:80,
        bottom :0,
        elevation: 0,
        borderTopWidth: 0,
        backgroundColor: COLORS.White,
        borderTopColor: COLORS.Transparent,
    },
    logo : {
        height: 60,
        width : 60,
    },
    text: {
        width:'100%',
    },
});