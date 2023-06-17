import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    topBarBackground: {
        position: 'absolute',
        top: 12,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 55,
        zIndex: 1,
    },
    buttonBackground: {
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: COLORS.ComponentBackground,
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
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 7,
    },
    disconnectContainer : {
        position: 'absolute',
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 7,
        transition: 0.2,
        right : "6%",
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    }
});