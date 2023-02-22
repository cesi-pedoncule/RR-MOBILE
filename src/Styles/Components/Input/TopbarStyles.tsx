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
        backgroundColor: '#F0F0F0',
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
        backgroundColor: '#F0F0F0',
        borderRadius: 7,
    },
    disconnectContainer : {
        position: 'absolute',
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 7,
        transition: 0.2,
        right : 20,
    }
});