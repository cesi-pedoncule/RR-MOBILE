import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export default StyleSheet.create({
    cardBackground: {
        width: 220,
        aspectRatio: 1.7,
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 20,
        marginBottom: 5,
        alignSelf: 'flex-end',
        paddingRight:20,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    cardTitle:{
        color: COLORS.Black,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 15,
    },
    cardText:{
        color: COLORS.ForegroundHolder,
        fontSize: 13,
        marginLeft: 20,
        marginRight: 20,
        width: "100%", 
    },
    lineAuthorLikeContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        width: "100%", 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    }
});