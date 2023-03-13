import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom :3,
        elevation: 0,
        borderTopWidth: 0,
        backgroundColor: COLORS.transparent,
        borderTopColor: COLORS.transparent,
    },
    logo : {
        height: 60,
        width : 60,
        marginBottom : 25,
    },
    text: {
        width:'100%',
    },
});