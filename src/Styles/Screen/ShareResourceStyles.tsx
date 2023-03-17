import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
	scrollView: {
        marginTop : 10,
        marginBottom : 50,
		maxHeight: '65%',
    },
	resourcesContainer: {
		alignItems: 'center',
        justifyContent: 'center',
        marginBottom : 150,
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
		bottom: 90,
		width: "100%",
	}
});