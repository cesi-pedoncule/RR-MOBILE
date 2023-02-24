import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: "90%",
        height: 190,
        backgroundColor: '#F0F0F0',
        borderBottomWidth: 2,
        borderBottomColor: '#EEEEEE',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
        marginBottom: 20,
    },
    cardUser:{
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
    },
    cardTitle:{
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 10,
    },
    cardText:{
        color: '#ACB3BF',
        fontSize: 13,
        textAlign: 'justify',
        marginTop: 3,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    lineButtonsAndUser:{
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        display:'flex',
        flexDirection : "row",
    },
    userAndButtonsContainer:{
        marginRight : 20,
    },
    buttonsContainer: {
        position:'absolute',
        display : "flex",
        flexDirection : "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        bottom: 30,
        paddingHorizontal: 60,
    },
    withoutUserContainer: {
        height: "100%",
        marginTop: 20,
    },
    categoriesContainer: {
        display : "flex",
        flexDirection : "row",
        overflow:'scroll',
        marginHorizontal:20,  
    },
});