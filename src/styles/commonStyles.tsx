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
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
    }
});