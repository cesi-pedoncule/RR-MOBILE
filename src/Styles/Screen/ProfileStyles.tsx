import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        padding: 10,
    },
    profileTitle: {
        fontSize: 32,
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
        color: COLORS.Black,
        fontSize: 12,
        width: '100%',
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
    },
});
