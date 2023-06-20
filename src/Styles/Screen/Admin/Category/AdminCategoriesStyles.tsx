import { StyleSheet } from "react-native";
import { COLORS } from "../../../Colors";

export default StyleSheet.create({
    categoriesContainer: {
		  paddingBottom: 10,
    },
    columnWrapperStyle: {
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    addCategorieButton :{
		textAlign: 'center',
		color: COLORS.LightBackgroundColor,
		marginTop: 5,
		height: 50,
		width: 150,
		shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
	},
	buttonContainer: {
		position : 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 50,
		width: "100%",
	},
});