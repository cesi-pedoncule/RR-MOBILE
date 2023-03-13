import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    cardBackground: {
        width: "90%",
        height: "auto",
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 15,
        margin: 10,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    cardUser:{
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 10,
    },
    cardComment:{
        height: "auto",
        color: COLORS.ForegroundHolder,
        fontSize: 13,
        textAlign: 'justify',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        minHeight: "15%",
        overflow: "scroll",
    },
});