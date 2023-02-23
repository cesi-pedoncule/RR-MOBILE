import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cardBackground: {
        width: "45%",
        height: 130,
        backgroundColor: '#F0F0F0',
        borderBottomWidth: 2,
        borderBottomColor: '#EEEEEE',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
        margin: 5,
        alignSelf: 'flex-end',
        paddingRight:20,
    },
    cardTitle:{
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 5,
    },
    cardText:{
        color: '#ACB3BF',
        fontSize: 13,
        textAlign: 'justify',
        marginTop: 5,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
});