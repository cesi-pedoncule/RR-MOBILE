import { Image, TouchableOpacity, View, Text } from 'react-native'
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
    resourcesIsFocused ?: boolean;
    categoriesIsFocused ?: boolean;
    shareResourceIsFocused ?: boolean;
    profileIsFocused ?: boolean;
}

export default function NavBar({client, resourcesIsFocused=false, categoriesIsFocused = false, shareResourceIsFocused = false, profileIsFocused = false}: Props) {
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
        if (client.auth.me === null) {
            navigation.navigate('Login');
        } else {
            navigation.navigate('ShareCreate');
        }
    }

    const onClickResourcesButton = () => {
        navigation.navigate('Resources');
    }

    return (
        <View style={NavBarStyles.container}>
            <TouchableOpacity onPress={onClickResourcesButton} style={NavBarStyles.button}>
                {
                    !resourcesIsFocused ? 
                    <View style={NavBarStyles.buttonContainer}>
                        <Image source={require('../assets/Ressources.png')} style={NavBarStyles.logo}/>
                        <Text style={NavBarStyles.text}>Ressources</Text>
                    </View> 
                    : 
                    <View style={NavBarStyles.buttonContainer}>
                        <Image source={require('../assets/RessourcesFocused.png')} style={NavBarStyles.logo}/>
                        <Text style={NavBarStyles.textFocused}>Ressources</Text>
                    </View> 
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickCategoriesButton} style={NavBarStyles.button}>
                {
                    !categoriesIsFocused ?
                    <View style={NavBarStyles.buttonContainer}>
                        <Image source={require('../assets/Catalogue.png')} style={NavBarStyles.logo}/>
                        <Text style={NavBarStyles.text}>Catégories</Text>
                    </View>
                    :
                    <View style={NavBarStyles.buttonContainer}>
                        <Image source={require('../assets/CatalogueFocused.png')} style={NavBarStyles.logo}/>
                        <Text style={NavBarStyles.textFocused}>Catégories</Text>
                    </View>
                }
                
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickShareResourceButton} style={NavBarStyles.button}>
                {
                    !shareResourceIsFocused ?
                    <View style={NavBarStyles.buttonContainer}>
                        <Image source={require('../assets/Partage.png')} style={NavBarStyles.logo}/>
                        <Text style={NavBarStyles.text}>Partager</Text>
                    </View>
                    :
                    <View style={NavBarStyles.buttonContainer}>
                        <Image source={require('../assets/PartageFocused.png')} style={NavBarStyles.logo}/>
                        <Text style={NavBarStyles.textFocused}>Partager</Text>
                    </View>
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickProfileButton} style={NavBarStyles.button}>
                {
                    !profileIsFocused ?
                    <View style={NavBarStyles.buttonContainer}>
                        <Image source={require('../assets/Profile.png')} style={NavBarStyles.logo}/>
                        <Text style={NavBarStyles.text}>Profile</Text>
                    </View>
                    :
                    <View style={NavBarStyles.buttonContainer}>
                        <Image source={require('../assets/ProfileFocused.png')} style={NavBarStyles.logo}/>
                        <Text style={NavBarStyles.textFocused}>Profile</Text>
                    </View>
                }
            </TouchableOpacity>
        </View>
    )
}