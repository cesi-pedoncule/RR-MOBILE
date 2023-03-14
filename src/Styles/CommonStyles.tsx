import { StyleSheet } from "react-native";
import { COLORS } from "./Colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.AccentColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content : {
        backgroundColor: COLORS.White,
        width: '100%',
        position: 'absolute',
        top : 130,
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    btnHomeBackground: {
        position : 'absolute',
        left : 20,
        padding : 10,
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 7,
        transition: 0.2,
    },
    header: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.Black,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4%',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.Black,
        textAlign: 'center',
    },
    link: {
        textAlign: 'left',
        color: COLORS.AccentColor,
        paddingHorizontal: 5,
    },
    loader: {
        position: 'absolute',
        top: '45%',
        left: '45%',
    },
    scrollView : {
        marginVertical : 10,
    },  
    textEmptyResult: {
        textAlign: 'center',
        alignItems: 'center',
        width: "100%",
    }
});