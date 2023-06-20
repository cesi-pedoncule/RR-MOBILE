import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    buttonContainer: {
        width: "100%", 
        paddingHorizontal: "20%",
        paddingVertical: 10
    },
    button: {
        textAlign: 'center',
		color: COLORS.LightBackgroundColor,
		height: 50,
		width: "100%",
		shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    itemsContainer : {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },  
});