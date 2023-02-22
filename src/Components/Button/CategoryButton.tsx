import { View, Text, TouchableHighlight } from 'react-native'
import React, { useEffect } from 'react'
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
        <TouchableHighlight onPress={callBack} underlayColor={"#F0F0F0"}  style={CategoryButtonStyles.btnBackground}>
            <View>
                <Text numberOfLines={1} style={CategoryButtonStyles.btnText}>{category.name}</Text>
            </View>
        </TouchableHighlight>
  )
}