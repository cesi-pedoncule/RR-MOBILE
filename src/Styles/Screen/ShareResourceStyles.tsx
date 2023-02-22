import { StyleSheet } from "react-native";

export default StyleSheet.create({
	shareResourcesContainer : {
		marginTop : 20,
		alignItems : 'center',
	},
	resourcesContainer: {
        marginTop: '2%',
        marginBottom: '5%',
		maxHeight: '70%',
	},
	textSaves : {
		position: 'relative',
		textAlign : "center",
		fontSize : 16,
		top : 15,
		marginBottom : 15,
		textDecorationLine : 'underline',
	},
	addResourceBtn :{
		textAlign: 'center',
		color: '#FFFFFF',
		marginTop : 5,
		width : "40%"
	},
	buttonsContainer: {
		position : 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 90,
		width: "100%",
	}
});