import { StyleSheet } from "react-native";

export default StyleSheet.create({
    profileContainer: {
        padding: 10,
    },
    profileTitle: {
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
        marginVertical: 10,
    },
    profileSubTitle: {
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'center',
        marginVertical: 10,
    },
    profileDescription: {
        fontSize: 12,
        width: '100%',
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    statsContainer : {
        alignItems : 'center',
        justifyContent : 'space-around',
    },
    disconnectContainer : {
        marginTop : 10,
        alignItems : 'center',
    }
});
