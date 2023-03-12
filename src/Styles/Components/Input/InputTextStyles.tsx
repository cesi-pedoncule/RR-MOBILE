import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    txtFieldBackground: {
        justifyContent: 'center',
        width: 261,
        height: 55,
        margin: 10,
        backgroundColor: COLORS.componentBackground,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.accentColor,
        shadowOffset: {width: 0, height: 4},
        shadowColor: COLORS.borderColor,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 5,
    },
    txtFieldText: {
        textAlign: 'left',
        color: COLORS.foregroundHolder,
        width: '100%',
        height: '30%',
        paddingLeft: 8,
        paddingTop: 4,
        fontSize: 13,
        lineHeight: 16,
    },
    txtFieldInput: {
        textAlign: 'left',
        color: COLORS.black,
        paddingLeft: 8,
        width: '100%',
        height: '70%',
        fontSize: 13,
        lineHeight: 16,
        outlineStyle: 'none',
    },
})