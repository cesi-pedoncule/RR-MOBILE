import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    moreItemsButton: {
        paddingHorizontal: 15,
        height: 34,
        justifyContent: 'center',
        backgroundColor: COLORS.componentBackground,
        borderRadius: 10,
        transition: 0.2,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: COLORS.borderColor,
        shadowOffset: {width: 0, height: 4},
        shadowColor: COLORS.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});