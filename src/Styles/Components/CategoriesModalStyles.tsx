import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width : "100%",
    },
    modalContainer: {
        width : "90%",
        backgroundColor: COLORS.ComponentBackground,
        marginTop: "50%",
        padding: 20,
        borderRadius: 20,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    multiSelectContainer: {
        width: "100%",
        height: 300,
        marginVertical: 20,
        padding: 10,
        backgroundColor: COLORS.LightBackgroundColor,
        borderRadius: 20,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    button: {
        backgroundColor: COLORS.AccentColor,
        color: COLORS.LightBackgroundColor,
        borderRadius: 15,
        padding: 10,
        elevation: 2,
    },
    textButton: {
        color: COLORS.LightBackgroundColor,
        textAlign: 'center',
    },
    categorieList: {
        alignItem: 'center',
        display : "flex",
        flexDirection : "row",
        marginTop:20,
    },
    tagStyle: {
        backgroundColor: COLORS.TagColor,
        height: 32,
    }
});