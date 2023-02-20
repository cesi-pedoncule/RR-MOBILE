import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#03989E',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        width: '60%',
        height: '30vh',
        position: 'absolute',
        top: 0,
    },
    content : {
        backgroundColor: '#FFFFFF',
        width: '100%',
        position: 'absolute',
        top : 250,
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    contentWithTopBar : {
        backgroundColor: '#FFFFFF',
        width: '100%',
        position: 'absolute',
        top : 110,
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    btnHomeBackground: {
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        transition: 0.2,
    },
    header: {
        fontSize: 32,
        fontWeight: '800',
        color: '#000000',
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3vh',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#000000',
        textAlign: 'center',
        paddingHorizontal: '20%',
    },
    title1: {
        fontSize: 32,
    },
    title2: {
        fontSize: 24,
    },
    title3: {
        fontSize: 20,
    },
    btnBackground: {
        width: 126,
        height: 34,
        justifyContent: 'center',
        backgroundColor: '#03989E',
        borderRadius: 15,
        transition: 0.2,
    },
    btnText: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginVertical: 8,
    },
    link: {
        color: '#03989E',
        paddingHorizontal: 5,
    },
    loader: {
        position: 'absolute',
        top: '35%',
        left: '47%',
    },
    moreItemsButton: {
        width: 40,
        height: 34,
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        transition: 0.2,
        textAlign: 'center',
    },
    resourcesContainer: {
        marginTop: '2vh',
        marginBottom: '15vh',
    },
    categoriesContainer: {
        marginBottom: '15vh',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    returnBtn:{
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        transition: 0.2,
        marginHorizontal: "6%",
    },
    scrollViewCategories: {
        marginTop: '2vh',
    },
    scrollViewCenter: {
        alignItems: 'center',
    },
});