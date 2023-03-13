import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    topBarBackground: {
        position: 'absolute',
        top: 50,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 55,
        zIndex: 1,
    },
    btnHomeBackground: {
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: COLORS.componentBackground,
        borderRadius: 7,
        transition: 0.2,
        marginHorizontal: "6%",
    },
    searchBarBackground: {
        width: '70%',
    },
    searchBar: {
        width: "100%",
        padding: 14,
        backgroundColor: COLORS.componentBackground,
        borderRadius: 7,
    },
    disconnectContainer : {
        position: 'absolute',
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: COLORS.componentBackground,
        borderRadius: 7,
        transition: 0.2,
        right : 20,
        shadowColor: COLORS.black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    }
});