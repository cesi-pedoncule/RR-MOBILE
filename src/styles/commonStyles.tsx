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
        // height: '30%',
        position: 'absolute',
        top: 0,
    },
    content : {
        backgroundColor: '#FFFFFF',
        width: '100%',
        position: 'absolute',
        top : 110,
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    btnHomeBackground: {
        position : 'absolute',
        left : 20,
        padding : 10,
        backgroundColor: '#F0F0F0',
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
        marginTop: '6%',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#000000',
        textAlign: 'center',
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
    link: {
        color: '#03989E',
        paddingHorizontal: 5,
    },
    loader: {
        position: 'absolute',
        top: '35%',
        left: '47%',
    },
    resourcesContainer: {
        marginTop: '5%',
        marginBottom: '30%',
    },
    categoriesContainer: {
        marginBottom: '30%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    scrollViewCategories: {
        marginTop: '5%',
    },
    scrollViewCenter: {
        alignItems: 'center',
    },
});