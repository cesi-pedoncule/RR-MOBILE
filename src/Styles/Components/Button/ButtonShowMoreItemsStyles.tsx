import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    moreItemsButton: {
        width: 45,
        height: 40,
        justifyContent: 'center',
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 12,
        transition: 0.2,
        textAlign: 'center',
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    text: {
        position: 'absolute',
        bottom: 5,
        fontSize: 25,
        fontWeight: '800',
        width: "100%",
        textAlign: 'center',
        alignItems: 'center',
    }
});