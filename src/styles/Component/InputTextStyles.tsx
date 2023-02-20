import { StyleSheet } from "react-native";

export default StyleSheet.create({
    txtFieldBackground: {
        justifyContent: 'center',
        width: 261,
        height: 55,
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 2,
        borderBottomColor: '#03989E',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 5,
    },
    txtFieldText: {
        textAlign: 'left',
        color: '#ACB3BF',
        width: '100%',
        height: '30%',
        paddingLeft: 8,
        paddingTop: 0,
        fontSize: 13,
        lineHeight: 16,
    },
    txtFieldInput: {
        textAlign: 'left',
        color: '#000000',
        paddingLeft: 8,
        width: '100%',
        height: '70%',
        fontSize: 13,
        lineHeight: 16,
    },
})