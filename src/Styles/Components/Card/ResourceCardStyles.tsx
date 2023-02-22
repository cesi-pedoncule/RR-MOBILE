import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cardBackground: {
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
    lineLikeAndUser:{
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        display:'flex',
        flexDirection : "row",
    },
    likeBtn:{
        marginRight : 20,
    },
    categoriesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 10,  
    },
});