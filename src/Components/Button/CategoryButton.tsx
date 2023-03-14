import { Category } from 'rr-apilib';
import { Text, TouchableOpacity } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CategoryButtonStyles from '../../Styles/Components/Button/CategoryButtonStyles'

import { NavigationParamList } from '../../Types/navigation';

interface Props {
    navigation: NativeStackNavigationProp<NavigationParamList>;
    category: Category;
}

export default function CategoryButton({ navigation, category }: Props) {
  
    const callBack = () => {
        navigation.navigate('CategoryDetails', { client: category.client, category: category });
    }

    return (
        <TouchableOpacity onPress={callBack} style={CategoryButtonStyles.btnBackground}>
            <Text numberOfLines={1} style={CategoryButtonStyles.btnText}>{category.name}</Text>
        </TouchableOpacity>
    )
}