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
        <View style={CategoryButtonStyles.btnBackground}>
            <TouchableHighlight onPress={callBack} underlayColor={"#F0F0F0"}>
                <Text numberOfLines={1} style={CategoryButtonStyles.btnText}>{category.name}</Text>
            </TouchableHighlight>
        </View>
  )
}