import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        width: "100%",
        height: "100%",
        padding: 10,
        paddingBottom: 80,
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
    textHolder: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.ForegroundHolder,
        textAlign: 'left',
        marginBottom: 10,
    },
    itemsContainer: {
        width: "100%",
        marginTop: 10,
        paddingHorizontal: 5,
    },
    itemsScrollView: {
        flexDirection: 'row',
        width: "100%",
    },    
    itemContainer: {
        width:170,
        marginHorizontal: 5,
    },
    buttonAdmin: {
        textAlign: 'center',
		color: COLORS.LightBackgroundColor,
		marginTop: 20,
		height: 50,
		width: 150,
		shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
});
