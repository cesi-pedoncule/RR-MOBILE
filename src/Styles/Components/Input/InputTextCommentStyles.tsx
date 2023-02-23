import { StyleSheet } from "react-native";

export default StyleSheet.create({
    txtFieldBackground: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: 261,
        height: 55,
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 2,
        borderColor: '#000000',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 5,
    },
    txtFieldInput: {
        textAlign: 'left',
        color: '#000000',
        fontSize: 13,
        lineHeight: 23,
        outlineStyle: 'none',
        width: '80%',
        height: '100%',
    },
    sendButtonInput: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        height: '100%',
        padding: 5,
    },
})