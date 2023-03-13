import { StyleSheet } from "react-native";
import { COLORS } from "./Colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.accentColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content : {
        backgroundColor: COLORS.white,
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
        backgroundColor: COLORS.componentBackground,
        borderRadius: 7,
        transition: 0.2,
    },
    header: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.black,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '6%',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.black,
        textAlign: 'center',
    },
    link: {
        textAlign: 'left',
        color: COLORS.accentColor,
        paddingHorizontal: 5,
    },
    loader: {
        position: 'absolute',
        top: '45%',
        left: '45%',
    },
    scrollViewWithNavBar : {
        marginTop : 10,
        marginBottom : 80,
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