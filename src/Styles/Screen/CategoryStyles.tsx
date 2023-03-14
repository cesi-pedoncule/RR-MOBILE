import { StyleSheet } from "react-native";

export default StyleSheet.create({
    showMoreItemsContainer : {
        position : 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width : "100%",
        bottom: 5,
    },
    categoriesContainer: {
        justifyContent: 'center',
        display: 'flex',
        height : "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 100,
    },
});