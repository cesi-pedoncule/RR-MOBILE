import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export default StyleSheet.create({
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    resourceAttachmentContainer: {
        width: '276px',
        height: '55px',
        backgroundColor: COLORS.ComponentBackground,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.BorderColor,
        shadowOffset: {width: 0, height: 4},
        shadowColor: COLORS.Black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
    },
    cardBackground: {
        width: "90%",
        height: "auto",
        backgroundColor: COLORS.ComponentBackground,
        borderRadius: 15,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 4},
        elevation: 2,
    },
    cardUser:{
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
    },
    cardTitle:{
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        fontSize: 16,
        marginLeft: 20,
    },
    cardText:{
        color: COLORS.ForegroundHolder,
        fontSize: 13,
        textAlign: 'justify',
        marginTop: 5,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    lineLikeAndUser:{
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        display:'flex',
        flexDirection : "row",
    },
    likeBtn:{
        marginRight : 20,
    },
    commentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    listComment: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    commentTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        textDecorationLine: 'underline',
    },
    noComment: {
        position: 'absolute',
        left: '20',
    },
    categoriesContainer: {
        display : "flex",
        flexDirection : "row",
        overflow:'scroll',
        marginTop : 10,
        marginHorizontal:20,  
    },
    btnFile: {
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },
});