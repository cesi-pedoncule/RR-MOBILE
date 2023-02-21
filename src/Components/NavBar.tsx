import { Image, TouchableHighlight, View } from 'react-native'
import NavBarStyles from '../Styles/Components/NavBarStyles'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Client } from 'rr-apilib';

type NavBarStackParamList = {
    Categories: undefined;
    Profile: undefined;
    ShareCreate: undefined;
    Resources: undefined;
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

    const onClickProfileButton = () => {
        if (client.auth.me === null) {
            navigation.navigate('Login');
        } else {
            navigation.navigate('Profile');
        }
    }

    const onClickShareResourceButton = () => {
        navigation.navigate('ShareCreate');
    }

    const onClickResourcesButton = () => {
        navigation.navigate('Resources');
    }

    return (
        <View style={NavBarStyles.container}>
            <TouchableHighlight onPress={onClickResourcesButton} style={NavBarStyles.buttonNavBar} underlayColor={"#FFF"}>
                <Image source={require('../assets/Ressources.png')} style={NavBarStyles.logo}  />
            </TouchableHighlight>
            <TouchableHighlight onPress={onClickCategoriesButton}style={NavBarStyles.buttonNavBar} underlayColor={"#FFF"}>
                <Image source={require('../assets/Catalogue.png')} style={NavBarStyles.logo} />
            </TouchableHighlight>
            <TouchableHighlight onPress={onClickShareResourceButton}style={NavBarStyles.buttonNavBar} underlayColor={"#FFF"}>
                <Image source={require('../assets/Partage.png')} style={NavBarStyles.logo}  />
            </TouchableHighlight>
            <TouchableHighlight onPress={onClickProfileButton}style={NavBarStyles.buttonNavBar} underlayColor={"#FFF"}>
                <Image source={require('../assets/Profile.png')} style={NavBarStyles.logo}  />
            </TouchableHighlight>
        </View>
    )
}