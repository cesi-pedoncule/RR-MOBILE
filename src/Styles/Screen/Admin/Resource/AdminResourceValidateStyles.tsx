import { StyleSheet } from "react-native";
import { COLORS } from "../../../Colors";

export default StyleSheet.create({
    scrollViewContainer: {
        display: 'flex',
        marginTop: 50,
        with: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80,
    },
    resourceContainer: {
        height: 'auto',
        aspectRatio: 1,
        width: '90%',
    },
    sendButton: {
        width: '47%',
        height: 45,
        justifyContent: 'center',
        backgroundColor: COLORS.AccentColor,
        marginTop: 30,
        borderRadius: 15,
        transition: 0.2,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        paddingHorizontal: '10%'
    }
});