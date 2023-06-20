import { StyleSheet } from "react-native";
import { COLORS } from "../../../Colors";

export default StyleSheet.create({
    cardBackground: {
        width: "100%",
        aspectRatio: 1.7,
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 20,
        marginBottom: 5,
        alignSelf: 'flex-end',
        paddingRight:20,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    cardTitle:{
        color: COLORS.Black,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 15,
    },
    cardText:{
        width:"100%",
        position: 'absolute',
        color: COLORS.ForegroundHolder,
        fontSize: 13,
        textAlign: 'justify',
        bottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
});