import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
	resourcesContainer: {
		paddingHorizontal: 20,
        justifyContent: 'center',
		paddingBottom: 130,
	},
	textSaves : {
		color: COLORS.Black,
		position: 'relative',
		textAlign : "center",
		fontSize : 16,
		top : 15,
		marginBottom : 15,
		textDecorationLine : 'underline',
	},
	addResourceBtn :{
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
	buttonsContainer: {
		position : 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 100,
		width: "100%",
	},
});