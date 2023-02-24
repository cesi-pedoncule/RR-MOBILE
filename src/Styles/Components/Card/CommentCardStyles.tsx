import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cardBackground: {
        width: "90%",
        height: "auto",
        backgroundColor: '#F0F0F0',
        borderBottomWidth: 2,
        borderBottomColor: '#EEEEEE',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
        margin: 10,
        maxHeight: "50%",
    },
    cardUser:{
        height: "5%",
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 10,
    },
    cardComment:{
        height: "auto",
        color: '#ACB3BF',
        fontSize: 13,
        textAlign: 'justify',
        marginVertical: 10,
        marginLeft: 20,
        marginRight: 20,
        left: 0,
        bottom: 0,
        minHeight: "15%",
        overflow: "scroll",
    },
});