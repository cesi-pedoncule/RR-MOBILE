import { StyleSheet } from "react-native";

export default StyleSheet.create({
    topBarBackground: {
        position: 'absolute',
        top: 30,
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
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
    }
});