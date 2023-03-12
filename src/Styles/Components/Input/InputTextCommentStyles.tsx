import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    txtFieldBackground: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        height: 55,
        padding: 10,
        backgroundColor: COLORS.componentBackground,
        borderBottomWidth: 2,
        borderColor: COLORS.borderColor,
        shadowOffset: {width: 0, height: 4},
        shadowColor: COLORS.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
    },
    txtFieldInput: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: COLORS.black,
        fontSize: 13,
        lineHeight: 23,
        outlineStyle: 'none',
        width: '80%',
        height: '100%',
    },
    sendButtonInput: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
})