import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow : 'hidden',
        borderRadius : 25,
        height : 300,
        width: 350,
        shadowColor: COLORS.black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
});