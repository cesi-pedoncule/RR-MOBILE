import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom:0,
        left:0,
        alignItems : "center",
        justifyContent: 'space-between',
        paddingRight:5,
        paddingLeft:5,
        paddingTop:5,
        paddingBottom:15,
        display : "flex",
        flexDirection : "row",
        width : "100%",
        backgroundColor : "white",
    },
    buttonNavBar : {
        width : "20%",
    },
    logo : {
        height :  60,
        width : "80%",
    }
});