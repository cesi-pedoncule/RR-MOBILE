import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor : "white",
        position: 'absolute',
        alignItems : "center",
        justifyContent: 'space-between',
        display : "flex",
        flexDirection : "row",
        bottom:0,
        left:0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom:5,
        width : "100%",
    },
    logo : {
        height: 65,
        width : "66%",
    },
    text: {
        color: "#03989E",
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button : {
        width : "25%",
        height: "100%",
    }
});