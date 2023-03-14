import { Category } from 'rr-apilib';
import { View, Text, TouchableOpacity } from 'react-native'
import CategoryButtonStyles from '../../Styles/Components/Button/CategoryButtonStyles'

interface Props {
    navigation: any;
    category: Category;
}

export default function CategoryButton({ navigation, category }:Props) {
  
    const callBack = () => {
        navigation.navigate('CategoryDetails', { category: category })
    }

    return (
        <TouchableOpacity onPress={callBack} style={CategoryButtonStyles.btnBackground}>
            <View>
                <Text numberOfLines={1} style={CategoryButtonStyles.btnText}>{category.name}</Text>
            </View>
        </TouchableOpacity>
  )
}