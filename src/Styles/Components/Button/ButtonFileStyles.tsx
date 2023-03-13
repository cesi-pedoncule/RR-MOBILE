import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.componentBackground,
        width: "70%",
        display : "flex",
        flexDirection : "row",
        marginTop:30,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        padding: 15,
        shadowColor: COLORS.black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
});