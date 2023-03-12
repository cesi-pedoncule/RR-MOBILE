import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.componentBackground,
        overflow: 'scroll',
        height: 200,
        width: "90%",
        textAlignVertical: 'top',   
        borderBottomWidth: 2,
        borderBottomColor: COLORS.borderColor,
        shadowOffset: {width: 0, height: 4},
        shadowColor: COLORS.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
        marginTop: 20,
        padding:15,
    },
});