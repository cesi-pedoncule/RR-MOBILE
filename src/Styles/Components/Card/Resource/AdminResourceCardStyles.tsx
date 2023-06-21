import { StyleSheet } from "react-native";
import { COLORS } from "../../../Colors";

export default StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 20,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
        paddingHorizontal: 20,
        paddingTop: 15,
    },    
    cardUser:{
        width: '70%',
        color: COLORS.Black,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        fontSize: 16,
        marginBottom: 5,
    },
    cardTitle:{
        width: '70%',
        color: COLORS.Black,
        fontWeight: 'bold',
        fontSize: 20,
    },
    cardText:{
        color: COLORS.ForegroundHolder,
        fontSize: 13,
        textAlign: 'justify',
        marginTop: 3,
        marginBottom: 10
    },
    buttonsContainer: {
        position: 'absolute',
        display : "flex",
        flexDirection : "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 5,
        right: 0,
        left: 0
    },
    categoriesContainer: {
        display : "flex",
        flexDirection : "row",
        overflow:'scroll',
        marginVertical: 5
    },
    buttonsEditionResource: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        padding: 5,
        borderRadius: 7,
        transition: 0.2,
    },
});