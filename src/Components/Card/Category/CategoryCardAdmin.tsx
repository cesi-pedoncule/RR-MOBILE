import React from 'react'
import { Category, Resource } from 'rr-apilib';
import { Text, ToastAndroid, TouchableOpacity } from 'react-native'
import { NavigationParamList } from '../../../Types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CategoryCardStyles from '../../../Styles/Components/Card/Category/CategoryCardStyles';

interface Props {
    navigation: NativeStackNavigationProp<NavigationParamList>;
    category: Category;
    resources:  Resource[]
}

export default function CategoryCardAdmin({ navigation, category, resources }:Props) {
    
    const handleOnPress = () => {
        navigation.navigate('AdminCategory', {
            category: category,
            client: category.client, 
        })
    }
    
    return (
        <TouchableOpacity style={CategoryCardStyles.cardBackground} onPress={handleOnPress}>
            <Text style={CategoryCardStyles.cardTitle} numberOfLines={2}>{category.name}</Text>
            <Text style={CategoryCardStyles.cardText}>{resources.length.toString() + " Ressource(s)"}</Text>
        </TouchableOpacity>
    )
}