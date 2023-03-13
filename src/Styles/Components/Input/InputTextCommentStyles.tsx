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
        borderRadius: 15,
        shadowColor: COLORS.black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
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