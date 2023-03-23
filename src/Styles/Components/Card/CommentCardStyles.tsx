import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
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
    infoContainer: {
        width: "85%",
    },
    cardDate: {
        textAlign: 'right',
        position: 'absolute',
        width: "37%",
        top:15,
        right:25,
    },
    cardUser:{
        width: "55%",
        marginLeft: 20,
        marginTop: 10,
    },
    textCardUser:{
        color: COLORS.Black,
        fontWeight: 'bold',
        fontSize: 20,
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
        overflow: "scroll",
    },
    deleteCommentButton: {
        position: 'absolute',
        bottom: 2,
        right: 0,
    }
});