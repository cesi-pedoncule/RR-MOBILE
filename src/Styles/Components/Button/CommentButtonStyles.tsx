import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    commentBtn:{
        backgroundColor: 'none',
    },
    container:{
        alignItems: 'center',
        justifyContent: 'space-between',
        display:'flex',
        flexDirection : "row",
    },
    numberComment:{
        color: COLORS.Black,
        marginRight:5,
    },
});