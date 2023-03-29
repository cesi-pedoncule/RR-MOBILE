import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.ComponentBackground,
        position: 'absolute',
        height:80,
        bottom :0,
        borderTopLeftRadius : 20,
        borderTopRightRadius: 20,
        borderTopWidth: 0,
        borderTopColor: COLORS.Black,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: -4},
        elevation: 2,
    },
    logo : {
        height: 60,
        width : 60,
    },
    text: {
        width:'100%',
    },
});