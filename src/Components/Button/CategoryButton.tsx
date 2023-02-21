import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import CategoryButtonStyles from '../../Styles/Components/Button/CategoryButtonStyles'

interface Props {
    categoryName: string;
}

export default function CategoryButton({categoryName}:Props) {
  
    const callBack = () => {
        alert('TODO: Category Reference Search Resource');
    }

    return (
        <View style={CategoryButtonStyles.btnBackground}>
            <TouchableHighlight onPress={callBack} underlayColor={"#F0F0F0"}>
                <Text style={CategoryButtonStyles.btnText}>{categoryName}</Text>
            </TouchableHighlight>
        </View>
  )
}