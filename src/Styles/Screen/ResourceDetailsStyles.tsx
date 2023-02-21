import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#03989E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentWithTopBar: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        position: 'absolute',
        top : 110,
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingBottom: 50,
        marginBottom: 50,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    resourceAttachmentContainer: {
        width: '276px',
        height: '55px',
        backgroundColor: '#F0F0F0',
        borderBottomWidth: 2,
        borderBottomColor: '#EEEEEE',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
    },
    cardBackground: {
        width: "90%",
        height: "auto",
        backgroundColor: '#F0F0F0',
        borderBottomWidth: 2,
        borderBottomColor: '#EEEEEE',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        borderRadius: 15,
        marginBottom: 30,
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
        color: '#ACB3BF',
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
});