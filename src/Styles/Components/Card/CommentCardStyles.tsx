import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    cardBackground: {
        width: "90%",
        height: "auto",
        backgroundColor: COLORS.componentBackground,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.borderColor,
        shadowOffset: {width: 0, height: 4},
        shadowColor: COLORS.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
        margin: 10,
    },
    cardUser:{
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 10,
    },
    cardComment:{
        height: "auto",
        color: COLORS.accentColor,
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