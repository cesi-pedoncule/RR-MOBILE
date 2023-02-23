import { View, Text, TouchableOpacity } from 'react-native'
import CategoryButtonStyles from '../../Styles/Components/Button/CategoryButtonStyles'
import { Category } from 'rr-apilib';

interface Props {
    category: Category;
}

export default function CategoryButton({category}:Props) {
  
    const callBack = () => {
        alert('TODO: Category Reference Search Resource');
    }

    return (
        <TouchableOpacity onPress={callBack} style={CategoryButtonStyles.btnBackground}>
            <View>
                <Text numberOfLines={1} style={CategoryButtonStyles.btnText}>{category.name}</Text>
            </View>
        </TouchableOpacity>
  )
}