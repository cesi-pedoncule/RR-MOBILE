import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    cardBackground: {
        width: "45%",
        height: 130,
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 15,
        margin: 5,
        alignSelf: 'flex-end',
        paddingRight:20,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    cardTitle:{
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 5,
    },
    cardText:{
        color: COLORS.ForegroundHolder,
        fontSize: 13,
        textAlign: 'justify',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
    },
});