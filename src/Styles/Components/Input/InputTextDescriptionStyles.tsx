import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.componentBackground,
        overflow: 'scroll',
        height: 200,
        width: "90%",
        textAlignVertical: 'top',   
        borderRadius: 15,
        marginTop: 20,
        padding:15,
        shadowColor: COLORS.black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
});