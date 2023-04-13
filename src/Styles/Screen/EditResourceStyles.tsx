import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width : "100%",
        paddingLeft : 10,
        paddingRight : 10,
        marginVertical : 5,
    },
    addNameResource: {
        color: COLORS.Black,
        backgroundColor: COLORS.ComponentBackground,
        textAlign: 'center',
        height: 40,
        width : "90%",
        borderRadius : 10,
        paddingHorizontal: 10,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
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
        marginRight: 10,
        width: "70%",
        display : "flex",
        flexDirection : "row",
    },
    categorieContainer: {
        marginTop:20,
        alignItem: 'center',
        width: "90%",
        display : "flex",
        flexDirection : "row",
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