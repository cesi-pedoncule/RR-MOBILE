import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width : "100%",
        paddingLeft : 10,
        paddingRight : 10,
    },
    addNameResource: {
        backgroundColor: "#F0F0F0",
        textAlign: 'center',
        height: 40,
        width : "90%",
        borderRadius : 10,
        borderBottomWidth: 2,
        borderBottomColor: '#EEEEEE',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    sendButton: {
        width: 140,
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#03989E',
        marginTop:30,
        borderRadius: 15,
        transition: 0.2,
    },
    categorieList: {
        alignItem: 'center',
        width: "90%",
        display : "flex",
        flexDirection : "row",
        overflow:'scroll',
        marginTop:30,
    },
    addCategorieContainer: {
        marginRight: 5,
    },
    addCategorieText: {
        backgroundColor: '#D9D9D9',
        color: '#000000',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 4,
        paddingTop: 2,    
        borderRadius : 15,
        textAlign : 'center',
    },
    switchContainer: {
        width: "60%",
        display : "flex",
        flexDirection : "row",
        overflow:'scroll',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:30,
    },
    switch: {
        height: 30,
        width: 30,
    },
});