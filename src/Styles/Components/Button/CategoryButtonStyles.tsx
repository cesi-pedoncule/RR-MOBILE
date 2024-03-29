import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    btnBackground: {
        marginRight : 5,
    },
    btnText: {
        backgroundColor: COLORS.TagColor,
        color: COLORS.Black,
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 4,
        paddingTop: 2,    
        borderRadius : 15,
        textAlign : 'center',
    },
});