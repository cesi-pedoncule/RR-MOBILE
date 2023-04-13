import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.ComponentBackground,
        width: "90%",
        display : "flex",
        flexDirection : "row",
        marginTop:30,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        padding: 15,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    buttonFileContainer: {
        backgroundColor: COLORS.ComponentBackground,
        width: "70%",
        display : "flex",
        flexDirection : "row",
        marginTop:30,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        padding: 15,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    buttonDeleteFile: {
        padding: 0,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: COLORS.Transparent,
    },
    text: {
        width : "85%",
    }
});