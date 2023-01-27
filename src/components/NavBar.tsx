import { Image, TouchableHighlight, View } from 'react-native'
import NavBarStyles from '../styles/NavBarStyles'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Client } from 'rr-apilib';

type NavBarStackParamList = {
    Categories: undefined;
    Profil: undefined;
    ShareCreate: undefined;
    Ressources: undefined;
    Login: undefined;
}

interface Props {
    client: Client;
}

export default function NavBar({client}: Props) {
    const navigation = useNavigation<StackNavigationProp<NavBarStackParamList>>();

    const onClickCategoriesButton = () => {
        navigation.navigate('Categories');
    }

    const onClickProfilButton = () => {
        if (client.auth.me === null) {
            navigation.navigate('Login');
        } else {
            navigation.navigate('Profil');
        }
    }

    const onClickShareResourceButton = () => {
        navigation.navigate('ShareCreate');
    }

    const onClickRessourcesButton = () => {
        navigation.navigate('Ressources');
    }

    return (
        <View style={NavBarStyles.container}>
            <TouchableHighlight onPress={onClickRessourcesButton} style={NavBarStyles.buttonNavBar} underlayColor={"#FFF"}>
                <Image source={require('../assets/Ressources.png')} style={NavBarStyles.logo}  />
            </TouchableHighlight>
            <TouchableHighlight onPress={onClickCategoriesButton}style={NavBarStyles.buttonNavBar} underlayColor={"#FFF"}>
                <Image source={require('../assets/Catalogue.png')} style={NavBarStyles.logo} />
            </TouchableHighlight>
            <TouchableHighlight onPress={onClickShareResourceButton}style={NavBarStyles.buttonNavBar} underlayColor={"#FFF"}>
                <Image source={require('../assets/Partage.png')} style={NavBarStyles.logo}  />
            </TouchableHighlight>
            <TouchableHighlight onPress={onClickProfilButton}style={NavBarStyles.buttonNavBar} underlayColor={"#FFF"}>
                <Image source={require('../assets/Profil.png')} style={NavBarStyles.logo}  />
            </TouchableHighlight>
        </View>
    )
}