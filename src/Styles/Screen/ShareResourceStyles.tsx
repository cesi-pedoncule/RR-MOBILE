import { StyleSheet } from "react-native";

export default StyleSheet.create({
	shareResourcesContainer : {
		marginTop : 20,
		alignItems : 'center',
	},
	resourcesContainerWithLoadMoreItems: {
        marginTop: '2%',
        marginBottom: '5%',
		maxHeight: '60%',
	},
	resourcesContainerWithoutLoadMoreItems: {
        marginTop: '2%',
        marginBottom: '4.9%',
		maxHeight: '65%',
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
		paddingVertical: 25,
		width : "40%"
	},
	buttonsContainer: {
		position : 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: "15%",
		width: "100%",
	}
});