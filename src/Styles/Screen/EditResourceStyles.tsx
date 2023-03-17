import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width : "100%",
        paddingLeft : 10,
        paddingRight : 10,
        marginTop : 5,
    },
    addNameResource: {
        backgroundColor: COLORS.ComponentBackground,
        textAlign: 'center',
        height: 40,
        width : "90%",
        borderRadius : 10,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.BorderColor,
        shadowOffset: {width: 0, height: 4},
        shadowColor: COLORS.BorderColor,
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    sendButton: {
        width: 140,
        height: 45,
        justifyContent: 'center',
        backgroundColor: COLORS.AccentColor,
        marginTop:20,
        borderRadius: 15,
        transition: 0.2,
    },
    categorieList: {
        alignItem: 'center',
        width: "90%",
        display : "flex",
        flexDirection : "row",
        overflow:'scroll',
        marginTop:20,
    },
    addCategorieContainer: {
        marginRight: 5,
    },
    addCategorieText: {
        backgroundColor: COLORS.TagColor,
        color: COLORS.Black,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 4,
        paddingTop: 2,    
        borderRadius : 15,
        textAlign : 'center',
    },
    switchContainer: {
        display : "flex",
        flexDirection : "row",
        overflow:'scroll',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:20,
    },
});