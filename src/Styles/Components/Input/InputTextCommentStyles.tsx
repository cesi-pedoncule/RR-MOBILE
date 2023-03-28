import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    txtFieldBackground: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        padding: 10,
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 15,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    txtFieldInput: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: COLORS.Black,
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