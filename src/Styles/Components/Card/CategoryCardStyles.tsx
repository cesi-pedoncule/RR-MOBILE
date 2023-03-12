import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    cardBackground: {
        width: "45%",
        height: 130,
        backgroundColor: COLORS.componentBackground,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.borderColor,
        shadowOffset: {width: 0, height: 4},
        shadowColor: COLORS.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
        margin: 5,
        alignSelf: 'flex-end',
        paddingRight:20,
    },
    cardTitle:{
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 5,
    },
    cardText:{
        color: COLORS.foregroundHolder,
        fontSize: 13,
        textAlign: 'justify',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
    },
});