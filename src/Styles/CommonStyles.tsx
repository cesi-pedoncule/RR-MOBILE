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
        backgroundColor: COLORS.LightBackgroundColor,
        width: '100%',
        position: 'absolute',
        top : 95,
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
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.Black,
        textAlign: 'center',
    },
    loader: {
        top: '45%',
        alignItems: 'center',
    },
    itemsContainer : {
        marginVertical : 20,
    },  
    textEmptyResult: {
        color: COLORS.Black,
        textAlign: 'center',
        alignItems: 'center',
        width: "100%",
    },
    listHeaderComponent: {
        marginBottom: 20,
    },
    headerComponentWithReturn: {
        position: 'absolute', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: "100%", 
        top: 20
    },
    loadMoreContent: {
        alignItems: 'center',
    },
    returnBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.LightBackgroundColor,
        width: 40,
        height: 40,
        padding: 5,
        borderRadius: 7,
        transition: 0.2,
        marginHorizontal: 20,
        marginTop: 20,
    },
    returnBtnInFlatList:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.LightBackgroundColor,
        width: 40,
        height: 40,
        padding: 5,
        borderRadius: 7,
        transition: 0.2,
    },
    image: {
        resizeMode: "contain",
        width: "100%",
    },
    firstLoader: {
        position: 'absolute',
        bottom: "40%",
    },
});