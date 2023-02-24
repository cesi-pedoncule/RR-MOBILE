import { StyleSheet } from "react-native";

export default StyleSheet.create({
	scrollView: {
        marginTop : 10,
        marginBottom : 50,
		maxHeight: '65%',
    },
	resourcesContainer: {
		alignItems: 'center',
        justifyContent: 'center',
        marginBottom : 50,
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
		marginTop: 5,
		width: 150,
	},
	buttonsContainer: {
		position : 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 90,
		width: "100%",
	}
});