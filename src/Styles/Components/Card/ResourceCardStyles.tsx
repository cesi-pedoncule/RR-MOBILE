import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    container: {
        width: "100%",
        height: 190,
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    cardUser:{
        color: COLORS.Black,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
    },
    cardTitle:{
        color: COLORS.Black,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 10,
    },
    cardText:{
        color: COLORS.ForegroundHolder,
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
        width: 130,
        bottom: 30,
        left: 20,
    },
    buttonsEditContainer: {
        position:'absolute',
        display : "flex",
        flexDirection : "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 165,
        bottom: 23,
        right: 0,
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