import { Image, TouchableHighlight, View } from 'react-native'
import NavBarStyles from '../styles/NavBarStyles'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type NavBarStackParamList = {
  Categories: undefined;
  Profil: undefined;
  ShareCreate: undefined;
  Ressources: undefined;
}

export default function NavBar() {
  const navigation = useNavigation<StackNavigationProp<NavBarStackParamList>>();

  const onClickCategoriesButton = () => {
      console.log('Categories')
      navigation.navigate('Categories');
  }

  const onClickProfilButton = () => {
      navigation.navigate('Profil');
  }

  const onClickShareCreateButton = () => {
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
      <TouchableHighlight onPress={onClickShareCreateButton}style={NavBarStyles.buttonNavBar} underlayColor={"#FFF"}>
        <Image source={require('../assets/Partage.png')} style={NavBarStyles.logo}  />
      </TouchableHighlight>
      <TouchableHighlight onPress={onClickProfilButton}style={NavBarStyles.buttonNavBar} underlayColor={"#FFF"}>
        <Image source={require('../assets/Profil.png')} style={NavBarStyles.logo}  />
      </TouchableHighlight>
    </View>
  )
}