import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    likeBtn:{
        backgroundColor: 'none',
    },
    container:{
        alignItems: 'center',
        justifyContent: 'space-between',
        display:'flex',
        flexDirection : "row",
    },
    numberLike:{
        color: COLORS.Black,
        marginRight:5,
    },
});