import { StyleSheet } from "react-native";

export default StyleSheet.create({
    txtFieldBackground: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        height: 55,
        padding: 10,
        backgroundColor: '#F0F0F0',
        borderBottomWidth: 2,
        borderColor: '#EEEEEE',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
    },
    txtFieldInput: {
        textAlign: 'left',
        textAlignVertical: 'center',
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
        padding: 5,
    },
})